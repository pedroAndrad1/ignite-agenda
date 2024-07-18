import { Box, styled, Text } from '@pedroandrad1/react'

export const FormCadastroUsuario = styled(Box, {
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
