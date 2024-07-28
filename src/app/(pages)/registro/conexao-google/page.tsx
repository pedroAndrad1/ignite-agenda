'use client'

import { Button, Heading, MultiStep, Text } from '@pedroandrad1/react'
import { MainRegistro } from '../components/MainCadastroUsuario'
import { useEffect } from 'react'
import { HeaderRegistro } from '../components/HeaderRegistro'
import { ArrowRight, Check } from 'phosphor-react'
import { ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useToast } from '@/shared/contexts/ToastContext'

export default function ConexaoGoogle() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const session = useSession()
  const error = searchParams.get('error')
  const isAuthenticated = session.status === 'authenticated'

  useEffect(() => {
    if (error) toast('É necessário que autorize o acesso ao google calendar.')
  }, [error, toast])

  return (
    <MainRegistro>
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
