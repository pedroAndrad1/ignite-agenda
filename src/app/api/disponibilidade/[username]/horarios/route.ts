import { prisma } from '@/lib/prisma'
import { HttpStatusCode } from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NextRequest, NextResponse } from 'next/server'
dayjs.extend(utc)

interface PrismaUser {
  id: string
  username: string
  name: string
  bio: string | null
  email: string | null
  avatar_url: string | null
  created_at: Date
}

const validateSelectedDia = (selectedDia: dayjs.Dayjs) => {
  const isDiaPassado = selectedDia.endOf('day').isBefore(new Date())
  if (isDiaPassado)
    return {
      error: true,
      reponse: NextResponse.json(
        {},
        {
          status: HttpStatusCode.BadRequest,
          statusText: 'A data é de um dia anterior ao atual.',
        },
      ),
    }
}
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

const mountHorariosDisponiveisResponse = async (
  user: PrismaUser | null,
  selectedDia: dayjs.Dayjs,
  inicio: number,
  fim: number,
  timezoneOffsetEmHoras: number,
): Promise<
  {
    horario: number
    disponivel: boolean
  }[]
> => {
  const horarios = Array.from({
    length: fim - inicio,
  }).map((_, i) => inicio + i)

  const horariosAgendados = await prisma.agendamento.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user?.id,
      date: {
        gte: selectedDia
          .set('hour', inicio)
          .add(timezoneOffsetEmHoras, 'hours')
          .toDate(),
        lte: selectedDia
          .set('hour', fim)
          .add(timezoneOffsetEmHoras, 'hours')
          .toDate(),
      },
    },
  })

  const selectedDiaTimeZoneOffsetEmHoras =
    selectedDia.toDate().getTimezoneOffset() / 60

  return horarios.map((horario) => ({
    horario,
    disponivel:
      !horariosAgendados.some(
        (horarioAgendado) =>
          horarioAgendado.date.getUTCHours() - timezoneOffsetEmHoras ===
          horario,
      ) &&
      !selectedDia
        .set('hour', horario)
        .subtract(selectedDiaTimeZoneOffsetEmHoras, 'hours')
        .isBefore(new Date()),
  }))
}

export async function GET(
  req: NextRequest,
  { params: { username } }: { params: { username: string } },
) {
  const date = req.nextUrl.searchParams.get('date')
  const timezoneOffset = req.nextUrl.searchParams.get('timezoneOffset')

  if (!date || !timezoneOffset)
    return NextResponse.json(
      {},
      {
        status: HttpStatusCode.BadRequest,
        statusText: 'date ou timezoneOffset não enviados.',
      },
    )

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  const validateUserResult = validateUser(user)
  if (validateUserResult?.error) return validateUserResult.response

  const selectedDia = dayjs(String(date))
  const validateSelectedDiaResult = validateSelectedDia(selectedDia)
  if (validateSelectedDiaResult?.error) return validateSelectedDiaResult.reponse

  const timezoneOffsetEmHoras =
    typeof timezoneOffset === 'string'
      ? Number(timezoneOffset) / 60
      : Number(timezoneOffset[0]) / 60

  const userDisponibilidade = await prisma.horario.findFirst({
    where: {
      user_id: user?.id,
      dia_da_semana: selectedDia.get('day'),
    },
  })
  if (!userDisponibilidade)
    return NextResponse.json({ horariosDisponiveis: [] })

  const inicio = userDisponibilidade.inicio_em_minutos / 60
  const fim = userDisponibilidade.fim_em_minutos / 60

  return NextResponse.json({
    horariosDisponiveis: await mountHorariosDisponiveisResponse(
      user,
      selectedDia,
      inicio,
      fim,
      timezoneOffsetEmHoras,
    ),
  })
}
