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
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { usePathname } from 'next/navigation'

const ConfirmacaoStepSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos três carecteres. ' }),
  email: z.string().email({ message: 'Por favor, digíte um email válido.' }),
  observation: z.string().nullable(),
})

type ConfirmacaoStepData = z.infer<typeof ConfirmacaoStepSchema>
interface ConfirmacaoStepProps {
  agendamento: Date
  returnToCalendario: () => void
}
export function ConfirmacaoStep({
  agendamento,
  returnToCalendario,
}: ConfirmacaoStepProps) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmacaoStepData>({
    resolver: zodResolver(ConfirmacaoStepSchema),
  })
  const diaDetalhe = dayjs(agendamento).format('DD[ de ]MMMM[ de ]YYYY')
  const horaDetalhe = dayjs(agendamento).format('HH:mm[h]')
  const username = usePathname().split('/')[2]
  const handleConfirmacaoStepSubmit = async (data: ConfirmacaoStepData) => {
    const { name, email, observation } = data
    await api
      .post(`disponibilidade/${username}/agendamentos`, {
        name,
        email,
        observation,
        date: agendamento,
      })
      .then(() => toast('Agendamento realizado com sucesso.', 'Parabéns!'))
      .catch(() =>
        toast(
          'Ocorreu um erro ao realizar o agendamento. Por favor, tente novamente mais tarde.',
        ),
      )
      .finally(() => returnToCalendario())
  }

  return (
    <ConfirmacaoStepForm
      as="form"
      onSubmit={handleSubmit(handleConfirmacaoStepSubmit)}
    >
      <ConfirmacaoStepHeader>
        <Text>
          <CalendarBlank />
          {diaDetalhe}
        </Text>
        <Text>
          <Clock />
          {horaDetalhe}
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
        <Button
          type="button"
          variant="tertiary"
          onClick={() => returnToCalendario()}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </ConfirmacaoStepFormActions>
    </ConfirmacaoStepForm>
  )
}
