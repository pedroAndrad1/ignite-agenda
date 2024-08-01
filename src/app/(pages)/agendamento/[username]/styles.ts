import { Heading, styled, Text } from '@pedroandrad1/react'

export const AgendamentoContainer = styled('div', {
  maxWidth: 852,
  padding: '0 $4',
  margin: '$20 auto $4',
})

export const AgendamentoHeader = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$2',
  marginBottom: '$6',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2',
  },

  [`> ${Text}`]: {
    color: '$gray200',
  },
})
