'use client'

import { Button, Heading, MultiStep, Text, Toast } from '@pedroandrad1/react'
import { MainRegistro } from '../components/MainCadastroUsuario'
import { useEffect, useState } from 'react'
import { HeaderRegistro } from '../components/HeaderRegistro'
import { ArrowRight, Check } from 'phosphor-react'
import { ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function ConexaoGoogle() {
  const searchParams = useSearchParams()
  const [toast, setToast] = useState(false)
  const session = useSession()
  const error = searchParams.get('error')
  const isAuthenticated = session.status === 'authenticated'

  useEffect(() => (error ? setToast(true) : setToast(false)), [error, setToast])

  return (
    <MainRegistro>
      <Toast
        title="Ops..."
        description="É necessário que autorize o acesso ao google calendar."
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
          {isAuthenticated ? (
            <Button disabled size={'sm'}>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              size={'sm'}
              variant={'secondary'}
              onClick={() => signIn('google')}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        <Button type="submit" disabled={!isAuthenticated}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </MainRegistro>
  )
}
