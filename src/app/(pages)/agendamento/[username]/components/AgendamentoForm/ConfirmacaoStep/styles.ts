import { Box, styled, Text } from '@pedroandrad1/react'

export const ConfirmacaoStepForm = styled(Box, {
  maxWidth: 540,
  margin: '$6 auto 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const ConfirmacaoStepHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  paddingBottom: '$6',
  marginBottom: '$2',
  borderBottom: '1px solid $gray600',

  [`${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray200',
      width: '$5',
      height: '$5',
    },
  },

  '@media(max-width:600px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
})

export const ConfirmacaoStepFormActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '$2',

  '@media(max-width:600px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
})
