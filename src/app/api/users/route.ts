import { prisma } from '@/lib/prisma'
import { ERRORS } from '@/shared/constants/errors'
import { buildAuthOptions } from '@/shared/utils/buildAuthOptions'
import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const json = await req.json()
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

const UpdateUserSchema = z.object({
  bio: z.string(),
})
export async function PUT(req: NextRequest) {
  const session = await getServerSession(buildAuthOptions())
  if (!session)
    return NextResponse.json({}, { status: HttpStatusCode.InternalServerError })

  const { bio } = UpdateUserSchema.parse(await req.json())

  const prismaRes = await prisma.user
    .update({
      where: {
        id: session.user.id,
      },
      data: {
        bio,
      },
    })
    .then(() => ({ error: false, errorMessage: '' }))
    .catch((err) => ({ error: true, errorMessage: err }))

  if (prismaRes.error) {
    return NextResponse.json(
      {},
      {
        status: HttpStatusCode.InternalServerError,
        statusText: prismaRes.errorMessage,
      },
    )
  }

  return NextResponse.json({}, { status: HttpStatusCode.Ok })
}
