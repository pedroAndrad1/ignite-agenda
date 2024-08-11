'use client'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@pedroandrad1/react'
import { FormCadastroUsuario } from './styles'
import { GLOBAL_CONSTANTS } from '@/constants/global'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { useSearchParams, useRouter } from 'next/navigation'
import { api } from '@/lib/axios'
import { MainRegistro } from '../components/MainCadastroUsuario'
import { HeaderRegistro } from '../components/HeaderRegistro'
import { useToast } from '@/shared/contexts/ToastContext'
import { Suspense } from 'react'

const CadastroUsuarioFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos três caracteres.' })
    .regex(/^([a-z\\\\-]+)$/i, {
      message: 'O usuário precisa ter apenas letras.',
    }),
  nomeCompleto: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
})
type CadastroUsuarioFormData = z.infer<typeof CadastroUsuarioFormSchema>

export default function CadastroUsuario() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroUsuarioFormData>({
    resolver: zodResolver(CadastroUsuarioFormSchema),
    defaultValues: {
      username: searchParams.get('username') || '',
    },
  })

  const handleFormCadastroUsuario = async (data: CadastroUsuarioFormData) => {
    await api
      .post('users', {
        data,
      })
      .then(() => {
        router.push('/registro/conexao-google')
      })
      .catch((err) => {
        toast('Alguém já usa esse nome de usuário. Por favor, escolha outro.')
        return Promise.reject(err)
      })
  }

  return (
    <Suspense>
      <MainRegistro>
        <HeaderRegistro>
          <Heading as={'h1'}>Bem-vindo ao ignite call</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={4} currentStep={1} />
        </HeaderRegistro>
        <FormCadastroUsuario
          as="form"
          onSubmit={handleSubmit(handleFormCadastroUsuario)}
        >
          <label>
            <Text>Nome de usuário</Text>
            <TextInput
              prefix={GLOBAL_CONSTANTS.userNamePrefix}
              {...register('username')}
            />
            {errors.username ? (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
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
        </FormCadastroUsuario>
      </MainRegistro>
    </Suspense>
  )
}
