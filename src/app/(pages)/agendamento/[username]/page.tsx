'use client'

import { Avatar, Heading, Text } from '@pedroandrad1/react'
import { AgendamentoContainer, AgendamentoHeader } from './styles'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import { SpinnerGap } from 'phosphor-react'
import { useToast } from '@/shared/contexts/ToastContext'
import { AgendamentoForm } from './components/AgendamentoForm'
import { NextSeo } from 'next-seo'

interface UserResponse {
  name: string
  bio: string
  avatar_url: string
}

interface User {
  name: string
  bio: string
  avatarUrl: string
}

export default function Agendamento({
  params,
}: {
  params: { username: string }
}) {
  const [user, setUser] = useState<User>()
  const { toast } = useToast()

  useEffect(() => {
    const getUser = async () =>
      await api
        .get<UserResponse>(`users?username=${params.username}`)
        .then((res) =>
          setUser({
            name: res.data.name,
            bio: res.data.bio,
            avatarUrl: res.data.avatar_url,
          }),
        )
        .catch(() => {
          toast('Erro ao carregar perfil!')
          setUser({
            avatarUrl: '',
            bio: '',
            name: '',
          })
        })

    if (!user) {
      getUser()
    }
  }, [params, user, toast])

  return (
    <>
      <NextSeo title={`Agendar com ${user?.name} | Ignite Agenda`} />
      <AgendamentoContainer>
        <AgendamentoHeader>
          <Avatar src={user?.avatarUrl ?? ''} />
          {user ? (
            <>
              <Heading>{user.name}</Heading>
              <Text>{user.bio}</Text>
            </>
          ) : (
            <SpinnerGap size={32} color="#FFF" />
          )}
        </AgendamentoHeader>
        <main>
          <AgendamentoForm></AgendamentoForm>
        </main>
      </AgendamentoContainer>
    </>
  )
}
