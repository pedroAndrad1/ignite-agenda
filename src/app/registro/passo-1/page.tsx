'use client'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
  Toast,
} from '@pedroandrad1/react'
import {
  FormRegistroPasso1,
  HeaderRegistroPasso1,
  MainRegistroPasso1,
} from './styles'
import { GLOBAL_CONSTANTS } from '@/constants/global'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { useSearchParams } from 'next/navigation'
import { api } from '@/lib/axios'
import { useState } from 'react'

const RegistroPasso1FormSchema = z.object({
  userName: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos três caracteres.' })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'O usuário precisa ter apenas letras.',
    }),
  nomeCompleto: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
})
type RegistroPasso1FormData = z.infer<typeof RegistroPasso1FormSchema>

export default function RegistroPasso1() {
  const searchParams = useSearchParams()
  const [toast, setToast] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroPasso1FormData>({
    resolver: zodResolver(RegistroPasso1FormSchema),
    defaultValues: {
      userName: searchParams.get('userName') || '',
    },
  })

  const handleFormRegistroPasso1 = async (data: RegistroPasso1FormData) => {
    await api
      .post('users', {
        data,
      })
      .catch((err) => {
        setToast(true)
        return Promise.reject(err)
      })
  }

  return (
    <MainRegistroPasso1>
      <Toast
        title="Ops..."
        description="Alguém já usa esse nome de usuário. Por favor, escolha outro."
        open={toast}
        onOpenChange={setToast}
      />
      <HeaderRegistroPasso1>
        <Heading as={'h1'}>Bem-vindo ao ignite call</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </HeaderRegistroPasso1>
      <FormRegistroPasso1
        as="form"
        onSubmit={handleSubmit(handleFormRegistroPasso1)}
      >
        <label>
          <Text>Nome de usuário</Text>
          <TextInput
            prefix={GLOBAL_CONSTANTS.userNamePrefix}
            {...register('userName')}
          />
          {errors.userName ? (
            <ErrorMessage>{errors.userName.message}</ErrorMessage>
          ) : null}
        </label>
        <label>
          <Text>Nome completo:</Text>
          <TextInput {...register('nomeCompleto')} />
          {errors.nomeCompleto ? (
            <ErrorMessage>{errors.nomeCompleto.message}</ErrorMessage>
          ) : null}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </FormRegistroPasso1>
    </MainRegistroPasso1>
  )
}
