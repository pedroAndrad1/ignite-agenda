'use client'
import { Button, TextInput } from '@pedroandrad1/react'
import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'

export function UserNameForm() {
  return (
    <Form>
      <TextInput
        prefix="ignite-agenda"
        placeholder="seu-usuario"
        containerProps={{ size: 'sm' }}
      />
      <Button size={'sm'} type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  )
}
