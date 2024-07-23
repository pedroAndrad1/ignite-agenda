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

const DisponibilidadeFormSchema = z.object({
  intervalos: z
    .array(
      z.object({
        diaDaSemana: z.number().min(0).max(6),
        enabled: z.boolean(),
        inicio: z.string(),
        fim: z.string(),
      }),
    )
    .transform((intervalos) =>
      intervalos.filter((intervalo) => intervalo.enabled),
    )
    .refine((intervalos) => intervalos.length > 0, {
      message: 'É necessário selecionar pelo menos um dia.',
    })
    .transform((intervalos) =>
      intervalos.map((intervalo) => {
        return {
          diaDaSemana: intervalo.diaDaSemana,
          inicioEmMinutos: convertStringHoraToMinutoNumber(intervalo.inicio),
          fimEmMinutos: convertStringHoraToMinutoNumber(intervalo.fim),
        }
      }),
    ),
})
type DisponibilidadeFormDataInput = z.input<typeof DisponibilidadeFormSchema>
type DisponibilidadeFormDataOutput = z.output<typeof DisponibilidadeFormSchema>

export default function Disponibilidade() {
  const [toast, setToast] = useState(false)
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
      intervalos: [
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
    name: 'intervalos',
    control,
  })

  const diasDaSemana = getDiaDaSemana()
  const intervalos = watch('intervalos')

  const handleDisponibilidadeFormSubmit = (
    data: DisponibilidadeFormDataOutput,
  ) => {
    console.log(data)
  }

  useEffect(
    () => (errors.intervalos ? setToast(true) : setToast(false)),
    [errors],
  )

  return (
    <MainRegistro>
      <Toast
        title="Ops..."
        description={errors.intervalos?.root?.message ?? 'Erro de validação.'}
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
                    name={`intervalos.${index}.enabled`}
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
                    {...register(`intervalos.${index}.inicio`)}
                    disabled={!intervalos[index].enabled}
                  />
                  <TextInput
                    containerProps={{ size: 'sm' }}
                    type="time"
                    step={60}
                    {...register(`intervalos.${index}.fim`)}
                    disabled={!intervalos[index].enabled}
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
