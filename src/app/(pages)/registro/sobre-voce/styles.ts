import { Box, styled, Text } from '@pedroandrad1/react'

export const SobreVoceBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  marginTop: '$6',

  img: {
    borderRadius: '9999px',
  },

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },

  textarea: {
    minHeight: 120,
  },
})
export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
