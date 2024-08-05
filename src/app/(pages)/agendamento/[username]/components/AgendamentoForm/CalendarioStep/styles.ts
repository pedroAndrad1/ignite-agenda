import { Box, styled, Text } from '@pedroandrad1/react'

export const CalendarioStepContainer = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  position: 'relative',

  variants: {
    isHorariosPickerOpened: {
      true: {
        width: '100%',
        gridTemplateColumns: '1fr 280px',

        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const HorariosPickerContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  width: '280px',

  position: 'absolute',
  top: '0',
  right: '0',
  bottom: '0',

  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'auto',
})

export const HorariosPickerHeader = styled(Text, {
  fontWeight: '$bold',

  span: {
    color: '$gray200',
  },
})

export const HorariosPickerList = styled('ol', {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  li: {
    '&:last-child': {
      marginBottom: '$6',
    },
  },
})

export const HorariosPickerListLoader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
})

export const HorarioPickerItem = styled('button', {
  border: 0,
  backgroundColor: '$gray600',
  padding: '$2 0',
  cursor: 'pointer',
  color: '$gray100',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',
  textAlign: 'center',
  width: '100%',

  '&:disabled': {
    background: 'none',
    cursor: 'not-allowed',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
