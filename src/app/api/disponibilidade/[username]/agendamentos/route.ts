import { prisma } from '@/lib/prisma'
import { PrismaUser } from '@/shared/interfaces/PrismaUser'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
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

  await prisma.agendamento.create({
    data: {
      date: agendamento.toISOString(),
      name,
      email,
      observation,
      user_id: user?.id as string,
    },
  })

  return NextResponse.json({}, { status: HttpStatusCode.Ok })
}
