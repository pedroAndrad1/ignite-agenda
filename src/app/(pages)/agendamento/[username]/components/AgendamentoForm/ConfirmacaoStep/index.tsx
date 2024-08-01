import { Button, Text, TextArea, TextInput } from '@pedroandrad1/react'
import {
  ConfirmacaoStepForm,
  ConfirmacaoStepFormActions,
  ConfirmacaoStepHeader,
} from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'

export function ConfirmacaoStep() {
  return (
    <ConfirmacaoStepForm as="form">
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
        <TextInput placeholder="Seu nome" />
      </label>
      <label>
        <Text>Endereço de e-mail</Text>
        <TextInput type="email" placeholder="email@exemplo.com" />
      </label>
      <label>
        <Text>Observações</Text>
        <TextArea />
      </label>
      <ConfirmacaoStepFormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Confirmar</Button>
      </ConfirmacaoStepFormActions>
    </ConfirmacaoStepForm>
  )
}
