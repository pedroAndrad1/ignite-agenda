'use client'
import { Button, TextInput } from '@pedroandrad1/react'
import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

const UserNameFormSchema = z.object({
  userName: z.string(),
})
type UserNameFormData = z.infer<typeof UserNameFormSchema>

export function UserNameForm() {
  const { register, handleSubmit } = useForm<UserNameFormData>()

  const handleUserNameForm = (data: UserNameFormData) => {
    console.log(data)
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleUserNameForm)}>
      <TextInput
        prefix="ignite.agenda/"
        placeholder="seu-usuario"
        containerProps={{ size: 'sm' }}
        {...register('userName')}
      />
      <Button size={'sm'} type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
