import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'
interface PrismaUser {
  id: string
  username: string
  name: string
  bio: string | null
  email: string | null
  avatar_url: string | null
  created_at: Date
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

const getDiasDoMesComAgendaCheia = async (
  user: User | null,
  ano: string | null,
  mes: string | null,
) => {
  const diasComAgendaCheiaRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM A.DATE) AS date,
      COUNT(A.date) AS amount,
      ((H.fim_em_minutos - H.inicio_em_minutos) / 60) AS size
    FROM agendamentos A
    LEFT JOIN horarios H
      ON H.dia_da_semana = WEEKDAY(DATE_ADD(A.date, INTERVAL 1 DAY))
    WHERE A.user_id = ${user?.id}
      AND DATE_FORMAT(A.date, "%Y-%m") = ${`${ano}-${mes}`}
    GROUP BY EXTRACT(DAY FROM A.DATE),
      ((H.fim_em_minutos - H.inicio_em_minutos) / 60)
    HAVING amount >= size
  `

  return diasComAgendaCheiaRaw.map((item) => item.date)
}

export async function GET(
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

  const ano = req.nextUrl.searchParams.get('ano')
  const mes = req.nextUrl.searchParams.get('mes')
  if (!ano || !mes)
    return NextResponse.json(
      {},
      {
        status: HttpStatusCode.BadRequest,
        statusText: 'Ano ou Mês não enviados.',
      },
    )

  const diasDaSemanaComMarcacao = await prisma.horario.findMany({
    select: {
      dia_da_semana: true,
    },
    where: {
      user_id: user?.id,
    },
  })

  const diasDoMesComAgendaCheia = await getDiasDoMesComAgendaCheia(
    user,
    ano,
    mes,
  )

  const diasDaSemanaSemMarcacao = [0, 1, 2, 3, 4, 5, 6].filter(
    (dia) =>
      !diasDaSemanaComMarcacao.some(
        (diaDisponivel) => diaDisponivel.dia_da_semana === dia,
      ) || diasDoMesComAgendaCheia.some((diaCheio) => diaCheio === dia),
  )

  return NextResponse.json({ diasDaSemanaSemMarcacao, diasDoMesComAgendaCheia })
}
