'use client'

import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
  Toast,
} from '@pedroandrad1/react'
import { MainRegistro } from '../components/MainCadastroUsuario'
import { useEffect, useState } from 'react'
import { HeaderRegistro } from '../components/HeaderRegistro'
import { ArrowRight } from 'phosphor-react'
import {
  DayInputContainer,
  DisponibilidadeBox,
  DisponibilidadeForm,
  DisponibilidadeFormItem,
  HoursInputContainer,
} from './styles'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getDiaDaSemana } from '@/shared/utils/getDiaDaSemana'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertStringHoraToMinutoNumber } from '@/shared/utils/convertStringHoraToMinutoNumber'
import { api } from '@/lib/axios'

const DisponibilidadeFormSchema = z.object({
  horarios: z
    .array(
      z.object({
        diaDaSemana: z.number().min(0).max(6),
        enabled: z.boolean(),
        inicio: z.string(),
        fim: z.string(),
      }),
    )
    .transform((horarios) => horarios.filter((intervalo) => intervalo.enabled))
    .refine((horarios) => horarios.length > 0, {
      message: 'É necessário selecionar pelo menos um dia.',
    })
    .transform((horarios) =>
      horarios.map((intervalo) => {
        return {
          diaDaSemana: intervalo.diaDaSemana,
          inicioEmMinutos: convertStringHoraToMinutoNumber(intervalo.inicio),
          fimEmMinutos: convertStringHoraToMinutoNumber(intervalo.fim),
        }
      }),
    )
    .refine(
      (horarios) =>
        horarios.every(
          (horario) => horario.fimEmMinutos >= horario.inicioEmMinutos + 60,
        ),
      {
        message:
          'É necessário haver pelo menos uma diferença de 1 hora entre o início e o fim de um horário',
      },
    ),
})
type DisponibilidadeFormDataInput = z.input<typeof DisponibilidadeFormSchema>
type DisponibilidadeFormDataOutput = z.output<typeof DisponibilidadeFormSchema>

export default function Disponibilidade() {
  const [toast, setToast] = useState(false)
  const [toastDescription, setToastDescription] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<
    DisponibilidadeFormDataInput,
    unknown,
    DisponibilidadeFormDataOutput
  >({
    resolver: zodResolver(DisponibilidadeFormSchema),
    defaultValues: {
      horarios: [
        { diaDaSemana: 0, enabled: false, inicio: '08:00', fim: '18:00' },
        { diaDaSemana: 1, enabled: true, inicio: '08:00', fim: '18:00' },
        { diaDaSemana: 2, enabled: true, inicio: '08:00', fim: '18:00' },
        { diaDaSemana: 3, enabled: true, inicio: '08:00', fim: '18:00' },
        { diaDaSemana: 4, enabled: true, inicio: '08:00', fim: '18:00' },
        { diaDaSemana: 5, enabled: true, inicio: '08:00', fim: '18:00' },
        { diaDaSemana: 6, enabled: false, inicio: '08:00', fim: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    name: 'horarios',
    control,
  })

  const diasDaSemana = getDiaDaSemana()
  const horarios = watch('horarios')

  const handleDisponibilidadeFormSubmit = async (
    data: DisponibilidadeFormDataOutput,
  ) => {
    await api
      .post('horarios', data.horarios)
      .then(() => {
        setToastDescription('Horários salvos com sucesso.')
        setToast(true)
      })
      .catch(() => {
        setToastDescription(
          'Ocorreu um problema ao salvar os horários. Tente novamente mais tarde.',
        )
        setToast(true)
      })
  }

  useEffect(() => {
    if (errors.horarios) {
      setToastDescription(
        errors.horarios?.root?.message ?? 'Erro de validação.',
      )
      setToast(true)
    } else {
      setToast(false)
    }
  }, [errors])

  return (
    <MainRegistro>
      <Toast
        title="Ops..."
        description={toastDescription}
        open={toast}
        onOpenChange={setToast}
      />
      <HeaderRegistro>
        <Heading as={'h1'}>Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </HeaderRegistro>
      <DisponibilidadeBox>
        <DisponibilidadeForm
          as="form"
          onSubmit={handleSubmit(handleDisponibilidadeFormSubmit)}
        >
          {fields.map((field, index) => {
            return (
              <DisponibilidadeFormItem key={field.id}>
                <DayInputContainer>
                  <Controller
                    name={`horarios.${index}.enabled`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                        checked={field.value}
                      />
                    )}
                  />
                  <Text>{diasDaSemana[field.diaDaSemana]}</Text>
                </DayInputContainer>
                <HoursInputContainer>
                  <TextInput
                    containerProps={{ size: 'sm' }}
                    type="time"
                    step={60}
                    {...register(`horarios.${index}.inicio`)}
                    disabled={!horarios[index].enabled}
                  />
                  <TextInput
                    containerProps={{ size: 'sm' }}
                    type="time"
                    step={60}
                    {...register(`horarios.${index}.fim`)}
                    disabled={!horarios[index].enabled}
                  />
                </HoursInputContainer>
              </DisponibilidadeFormItem>
            )
          })}
          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </DisponibilidadeForm>
      </DisponibilidadeBox>
    </MainRegistro>
  )
}
