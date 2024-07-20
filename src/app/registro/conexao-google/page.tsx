'use client'

import { Button, Heading, MultiStep, Text, Toast } from '@pedroandrad1/react'
import { MainRegistro } from '../components/MainCadastroUsuario'
import { useState } from 'react'
import { HeaderRegistro } from '../components/HeaderRegistro'
import { ArrowRight } from 'phosphor-react'
import { ConnectBox, ConnectItem } from './styles'

export default function ConexaoGoogle() {
  const [toast, setToast] = useState(false)
  return (
    <MainRegistro>
      <Toast
        title="Ops..."
        description="Alguém já usa esse nome de usuário. Por favor, escolha outro."
        open={toast}
        onOpenChange={setToast}
      />
      <HeaderRegistro>
        <Heading as={'h1'}>Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </HeaderRegistro>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Agenda</Text>
          <Button variant={'secondary'}>
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </MainRegistro>
  )
}
