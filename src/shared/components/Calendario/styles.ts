import { styled, Text } from '@pedroandrad1/react'

export const CalendarioContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',
})
export const CalendarioHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})
export const CalendarioTitle = styled(Text, {
  fontWeight: '$bold',
  textTransform: 'capitalize',
  span: {
    color: '$gray200',
  },
})
export const CalendarioActions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  button: {
    all: 'unset',
    lineHeight: 0,
    cursor: 'pointer',

    svg: {
      width: '$5',
      height: '$5',
    },

    '&:hover': {
      color: '$gray100',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },
  },
})
export const CalendarioBody = styled('table', {
  width: '100%',
  fontFamily: '$default',
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',

  'thead th': {
    color: '$gray200',
    fontWeight: '$bold',
    fontSize: '$sm',
  },

  'tbody:before': {
    lineHeight: '0.75rem',
    content: '.',
    display: 'block',
    color: 'transparent',
  },

  'tbody td': {
    boxSizing: 'border-box',
  },
})
export const CalendarioDay = styled('button', {
  all: 'unset',
  width: '100%',
  aspectRatio: '1 / 1',
  background: '$gray600',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
