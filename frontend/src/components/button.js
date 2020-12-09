import React from "react"
import styled from "styled-components"

export const StyledButton = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.whiteToBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 4rem;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:active,
  &:focus {
    border: none;
  }
`

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default Button
