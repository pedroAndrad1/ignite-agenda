import { Box, styled } from '@pedroandrad1/react'

export const ConnectBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  padding: '$6',
  marginTop: '$6',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$4 $6',
  border: '1px solid $gray600',
  borderRadius: '$md',
})
