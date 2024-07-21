import { Box, styled } from '@pedroandrad1/react'

export const DisponibilidadeBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  marginTop: '$6',
  border: '1px solid $gray600',
})

export const DisponibilidadeForm = styled(Box, {
  border: '1px solid $gray600',
  borderRadius: '$md',
  padding: '0 !important',
})

export const DisponibilidadeFormItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',

  '& + &': {
    borderTop: '1px solid $gray600',
  },

  '@media(max-width: 400px)': {
    flexDirection: 'column',
    gap: '$2',
  },
})

export const DayInputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
})

export const HoursInputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',

  input: {
    position: 'relative',
  },

  'input::-webkit-calendar-picker-indicator': {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: 'pointer',
  },
})
