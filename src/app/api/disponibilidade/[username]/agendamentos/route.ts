import { getGoogleOAuthToken } from '@/lib/google'
import { prisma } from '@/lib/prisma'
import { PrismaUser } from '@/shared/interfaces/PrismaUser'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const validateUser = (user: PrismaUser | null) => {
  if (!user)
    return {
      error: true,
      response: NextResponse.json(
        {},
        {
          status: HttpStatusCode.NotFound,
          statusText: 'Usuário não encontrado.',
        },
      ),
    }
}
const createAgendamentoBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observation: z.string(),
  date: z.string().datetime(),
})
export async function POST(
  req: NextRequest,
  { params: { username } }: { params: { username: string } },
) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  const validateUserResult = validateUser(user)
  if (validateUserResult?.error) return validateUserResult.response

  const { date, email, name, observation } = createAgendamentoBodySchema.parse(
    await req.json(),
  )

  const agendamento = dayjs(date).startOf('hour')

  const agendamentoNoMesmoHorario = await prisma.agendamento.findFirst({
    where: {
      user_id: user?.id,
      date: agendamento.toDate(),
    },
  })
  if (agendamentoNoMesmoHorario)
    return NextResponse.json(
      {},
      {
        status: HttpStatusCode.BadRequest,
        statusText: 'Já existe um agendamento nesta data e horário',
      },
    )

  const newAgendamento = await prisma.agendamento.create({
    data: {
      date: agendamento.toISOString(),
      name,
      email,
      observation,
      user_id: user?.id as string,
    },
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user?.id as string),
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ignite Agenda: ${name}`,
      description: observation,
      start: {
        dateTime: agendamento.format(),
      },
      end: {
        dateTime: agendamento.add(1, 'hour').format(),
      },
      attendees: [{ email, displayName: name }],
      conferenceData: {
        createRequest: {
          requestId: newAgendamento.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  return NextResponse.json({}, { status: HttpStatusCode.Ok })
}
