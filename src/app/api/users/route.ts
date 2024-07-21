import { prisma } from '@/lib/prisma'
import { ERRORS } from '@/shared/constants/errors'
import { HttpStatusCode } from 'axios'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const json = await request.json()
  const { username, nomeCompleto } = json.data

  const userNameAlreadyTaken = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userNameAlreadyTaken) {
    return NextResponse.json(
      {},
      {
        status: HttpStatusCode.BadRequest,
        statusText: ERRORS.USUARIO_JA_EXISTE,
      },
    )
  }

  const user = await prisma.user.create({
    data: {
      username,
      name: nomeCompleto,
    },
  })

  cookies().set('@igniteAgenda:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias,
  })

  return NextResponse.json(user, {
    status: HttpStatusCode.Created,
  })
}
