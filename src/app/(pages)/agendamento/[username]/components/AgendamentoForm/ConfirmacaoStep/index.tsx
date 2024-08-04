import { Button, Text, TextArea, TextInput } from '@pedroandrad1/react'
import {
  ConfirmacaoStepForm,
  ConfirmacaoStepFormActions,
  ConfirmacaoStepHeader,
} from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useToast } from '@/shared/contexts/ToastContext'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { ErrorMessage } from '@/shared/components/ErrorMessage'

const ConfirmacaoStepSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos três carecteres. ' }),
  email: z.string().email({ message: 'Por favor, digíte um email válido.' }),
  observation: z.string().nullable(),
})

type ConfirmacaoStepData = z.infer<typeof ConfirmacaoStepSchema>

export function ConfirmacaoStep() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmacaoStepData>({
    resolver: zodResolver(ConfirmacaoStepSchema),
  })

  const handleConfirmacaoStepSubmit = (data: ConfirmacaoStepData) => {}

  return (
    <ConfirmacaoStepForm
      as="form"
      onSubmit={handleSubmit(handleConfirmacaoStepSubmit)}
    >
      <ConfirmacaoStepHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </ConfirmacaoStepHeader>
      <label>
        <Text>Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </label>
      <label>
        <Text>Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="email@exemplo.com"
          {...register('email')}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </label>
      <label>
        <Text>Observações</Text>
        <TextArea {...register('observation')} />
      </label>
      <ConfirmacaoStepFormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </ConfirmacaoStepFormActions>
    </ConfirmacaoStepForm>
  )
}
