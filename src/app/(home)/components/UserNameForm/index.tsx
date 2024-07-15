'use client'
import { Button, TextInput } from '@pedroandrad1/react'
import { Form, FormErrors } from './styles'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GLOBAL_CONSTANTS } from '@/constants/global'
import { BlankText } from '@/shared/components/BlankText'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { useRouter } from 'next/navigation'

const UserNameFormSchema = z.object({
  userName: z
    .string()
    .min(3, { message: 'Mínimo de três caracteres.' })
    .regex(/^([a-z\\\\-]+)$/i, { message: 'Apenas letras.' }),
})
type UserNameFormData = z.infer<typeof UserNameFormSchema>

export function UserNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserNameFormData>({
    resolver: zodResolver(UserNameFormSchema),
  })
  const router = useRouter()

  const handleUserNameForm = async (data: UserNameFormData) => {
    await router.push(`registro/passo-1?userName=${data.userName}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleUserNameForm)}>
        <TextInput
          prefix={GLOBAL_CONSTANTS.userNamePrefix}
          placeholder="seu-usuario"
          containerProps={{ size: 'sm' }}
          {...register('userName')}
        />
        <Button size={'sm'} type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormErrors>
        {errors.userName ? (
          <ErrorMessage>{errors.userName.message}</ErrorMessage>
        ) : (
          <BlankText aria-hidden />
        )}
      </FormErrors>
    </>
  )
}
