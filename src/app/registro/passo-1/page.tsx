'use client'
import { Heading, MultiStep, Text, TextInput } from '@pedroandrad1/react'
import {
  FormRegistroPasso1,
  HeaderRegistroPasso1,
  MainRegistroPasso1,
} from './styles'
import { GLOBAL_CONSTANTS } from '@/constants/global'

export default function RegistroPasso1() {
  return (
    <MainRegistroPasso1>
      <HeaderRegistroPasso1>
        <Heading as={'h1'}>Bem-vindo ao ignite call</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </HeaderRegistroPasso1>
      <FormRegistroPasso1>
        <label>
          <Text>Nome de usuário</Text>
          <TextInput prefix={GLOBAL_CONSTANTS.userNamePrefix} />
        </label>
        <label>
          <Text>Nome completp</Text>
          <TextInput />
        </label>
      </FormRegistroPasso1>
    </MainRegistroPasso1>
  )
}
