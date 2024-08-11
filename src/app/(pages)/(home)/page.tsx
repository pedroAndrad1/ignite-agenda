'use client'
import { Heading, Text } from '@pedroandrad1/react'
import { Hero, MainHome, Preview } from './styles'
import Image from 'next/image'
import previewImage from '../../../assets/home-preview.svg'
import { UserNameForm } from './components/UserNameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Agenda"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />
      <MainHome>
        <Hero>
          <Heading as={'h1'} size={'4xl'}>
            Agendamento descomplicado
          </Heading>
          <Text size={'xl'}>
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <UserNameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            alt="Calendário simbolizando aplicação em funcionamento"
            priority
            height={400}
            quality={100}
          ></Image>
        </Preview>
      </MainHome>
    </>
  )
}
