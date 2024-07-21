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

export default function Disponibilidade() {
  const [toast, setToast] = useState(false)

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
          <DisponibilidadeFormItem>
            <DayInputContainer>
              <Checkbox />
              <Text>Segunda-Feira</Text>
            </DayInputContainer>
            <HoursInputContainer>
              <TextInput
                containerProps={{ size: 'sm' }}
                type="time"
                step={60}
              />
              <TextInput
                containerProps={{ size: 'sm' }}
                type="time"
                step={60}
              />
            </HoursInputContainer>
          </DisponibilidadeFormItem>
          <DisponibilidadeFormItem>
            <DayInputContainer>
              <Checkbox />
              <Text>Terça-Feira</Text>
            </DayInputContainer>
            <HoursInputContainer>
              <TextInput
                containerProps={{ size: 'sm' }}
                type="time"
                step={60}
              />
              <TextInput
                containerProps={{ size: 'sm' }}
                type="time"
                step={60}
              />
            </HoursInputContainer>
          </DisponibilidadeFormItem>
        </DisponibilidadeForm>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </DisponibilidadeBox>
    </MainRegistro>
  )
}
