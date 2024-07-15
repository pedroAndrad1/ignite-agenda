import { Box, Heading, styled, Text } from '@pedroandrad1/react'

export const MainRegistroPasso1 = styled('main', {
  maxWidth: 572,
  padding: '0 $4',
  margin: '$20 auto $4',
})

export const HeaderRegistroPasso1 = styled('header', {
  padding: '$0 $6',

  [`>${Heading}`]: {
    lineHeight: '$base',
  },

  [`>${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const FormRegistroPasso1 = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  padding: '$6',
  marginTop: '$6',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormError = styled(Text, {
  color: '$error',
})
