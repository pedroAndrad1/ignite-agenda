'use client'

import { Button, Heading, MultiStep, Text, TextArea } from '@pedroandrad1/react'
import { MainRegistro } from '../components/MainCadastroUsuario'
import { HeaderRegistro } from '../components/HeaderRegistro'
import { ArrowRight, Spinner } from 'phosphor-react'
import { FormAnnotation, SobreVoceBox } from './styles'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/shared/contexts/ToastContext'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const SobreVoceFormSchema = z.object({})
type SobreVoceFormDataInput = z.input<typeof SobreVoceFormSchema>
type SobreVoceFormDataOutput = z.output<typeof SobreVoceFormSchema>

export default function SobreVoce() {
  const { data, status } = useSession()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<SobreVoceFormDataInput, unknown, SobreVoceFormDataOutput>({
    resolver: zodResolver(SobreVoceFormSchema),
  })

  const handleSobreVoceFormSubmit = async (data: SobreVoceFormDataOutput) => {}

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
        {status === 'loading' ? (
          <div>
            <Spinner size={32} color="#FFF" />
          </div>
        ) : (
          <Image
            src={data?.user.avatar_url ?? ''}
            alt="Foto de perfil"
            height={64}
            width={64}
          />
        )}
        <label>
          <Text>Sobre você</Text>
          <TextArea />
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
