import { Heading, styled, Text } from '@pedroandrad1/react'

export const HeaderRegistro = styled('header', {
  padding: '$0 $6',

  [`>${Heading}`]: {
    lineHeight: '$base',
  },

  [`>${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})
