import { styled } from '@pedroandrad1/react'

const StyledBlankText = styled('span', {
  opacity: 0,
})

export function BlankText() {
  return <StyledBlankText aria-hidden>BLANK</StyledBlankText>
}
