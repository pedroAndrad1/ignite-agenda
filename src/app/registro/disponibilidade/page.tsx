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
import { useState } from 'react'
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

const DisponibilidadeFormSchema = z.object({})
type DisponibilidadeFormData = z.infer<typeof DisponibilidadeFormSchema>

export default function Disponibilidade() {
  const [toast, setToast] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm({
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

  return (
    <MainRegistro>
      <Toast
        title="Ops..."
        description="É necessário que autorize o acesso ao google calendar."
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
        <DisponibilidadeForm as="form">
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
        </DisponibilidadeForm>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </DisponibilidadeBox>
    </MainRegistro>
  )
}
