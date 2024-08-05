import { prisma } from '@/lib/prisma'
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

  const diasDisponiveis = await prisma.horario.findMany({
    select: {
      dia_da_semana: true,
    },
    where: {
      user_id: user?.id,
    },
  })

  const diasIndisponiveis = [0, 1, 2, 3, 4, 5, 6].filter(
    (dia) =>
      !diasDisponiveis.some(
        (diaDisponivei) => diaDisponivei.dia_da_semana === dia,
      ),
  )

  return NextResponse.json({ diasIndisponiveis })
}
