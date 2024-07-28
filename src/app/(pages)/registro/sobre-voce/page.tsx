'use client'

import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@pedroandrad1/react'
import { MainRegistro } from '../components/MainCadastroUsuario'
import { HeaderRegistro } from '../components/HeaderRegistro'
import { ArrowRight } from 'phosphor-react'
import { FormAnnotation, SobreVoceBox } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/shared/contexts/ToastContext'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'

const SobreVoceFormSchema = z.object({
  bio: z.string(),
})
type SobreVoceFormData = z.input<typeof SobreVoceFormSchema>

export default function SobreVoce() {
  const { data } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SobreVoceFormData>({
    resolver: zodResolver(SobreVoceFormSchema),
  })

  const handleSobreVoceFormSubmit = async (formData: SobreVoceFormData) => {
    await api
      .put('users', formData)
      .then(() => router.push(`agenda/${data?.user.username}`))
      .catch(() =>
        toast('Ocorreu um erro ao salvar sua bio. Por favor, tente novamente.'),
      )
  }

  return (
    <MainRegistro>
      <HeaderRegistro>
        <Heading as={'h1'}>Sobre você</Heading>
        <Text>Por último, uma breve descrição.</Text>
        <MultiStep size={4} currentStep={4} />
      </HeaderRegistro>
      <SobreVoceBox
        as="form"
        onSubmit={handleSubmit(handleSobreVoceFormSubmit)}
      >
        <Text>Foto de perfil</Text>
        <Avatar src={data?.user.avatar_url} alt="Foto de perfil" />
        <label>
          <Text>Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation>
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </SobreVoceBox>
    </MainRegistro>
  )
}
