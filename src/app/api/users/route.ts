import { prisma } from '@/lib/prisma'
import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const json = await request.json()
  const { userName, nomeCompleto } = json.data

  const user = await prisma.user.create({
    data: {
      userName,
      name: nomeCompleto,
    },
  })

  return NextResponse.json({
    data: user,
    status: HttpStatusCode.Created,
  })
}
