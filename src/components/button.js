import React from "react"
import styled from "styled-components"

export const StyledButton = styled.button`
  background: ${props =>
    props.disabled
      ? ({ theme }) => theme.disableColor
      : ({ theme }) => theme.primary};
  color: ${({ theme }) => theme.whiteToBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 4rem;
  border: none;
  font-weight: bold;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  font-size: ${({ theme }) => theme.fontSize}px;

  &:active,
  &:focus {
    border: none;
  }
`

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>
}

export default Button
