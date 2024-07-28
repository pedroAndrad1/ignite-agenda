import { prisma } from '@/lib/prisma'
import { buildAuthOptions } from '@/shared/utils/buildAuthOptions'
import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const HorariosSchema = z.object({
  horarios: z
    .array(
      z.object({
        diaDaSemana: z.number().min(0).max(6),
        inicioEmMinutos: z.number(),
        fimEmMinutos: z.number(),
      }),
    )
    .refine(
      (horarios) =>
        horarios.every(
          (horario) => horario.fimEmMinutos >= horario.inicioEmMinutos + 60,
        ),
      {
        message:
          'Um ou mais horários tem uma diferença de menos de uma hora entre o início e o fim!',
      },
    ),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(buildAuthOptions())
  if (!session)
    return NextResponse.json({}, { status: HttpStatusCode.InternalServerError })

  const { horarios } = HorariosSchema.parse({
    horarios: await req.json(),
  })

  const prismaRes = await prisma.horarios
    .createMany({
      data: horarios.map((horarioRaw) => ({
        dia_da_semana: horarioRaw.diaDaSemana,
        inicio_em_minutos: horarioRaw.inicioEmMinutos,
        fim_em_minutos: horarioRaw.fimEmMinutos,
        user_id: session.user?.id,
      })),
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

  return NextResponse.json({}, { status: HttpStatusCode.Created })
}
