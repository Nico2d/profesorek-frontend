import React from "react"
import styled from "styled-components"

export const StyledButton = styled.button`
  background: ${props =>
    props.isActive
      ? ({ theme }) => theme.disableColor
      : ({ theme }) => theme.primary};
  color: ${({ theme }) => theme.whiteToBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 4rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  cursor: ${props => (props.isActive ? "default" : "pointer")};

  &:active,
  &:focus {
    border: none;
  }
`

const Button = ({ children, onClick, isDisabled = false }) => {
  return (
    <StyledButton onClick={onClick} disabled={isDisabled} isActive={isDisabled}>
      {children}
    </StyledButton>
  )
}

export default Button
