import { Box, styled } from '@pedroandrad1/react'

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
