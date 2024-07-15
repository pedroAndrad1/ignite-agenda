import { Box, styled, Text } from '@pedroandrad1/react'

export const Form = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  marginTop: '$4',
  padding: '$4',

  '@media(max-width: 600px)': {
    flexDirection: 'column',
  },
})

export const FormErrors = styled('div', {
  marginTop: '$2',
  [`>${Text}`]: {
    color: 'gray400',
  },
})

export const BlankText = styled('span', {
  opacity: 0,
})
