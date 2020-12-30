import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const LinkButton = ({ text, path }) => {
  return <StyledButton as={Link} to={path}>{text}</StyledButton>
}
export default LinkButton

const StyledButton = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.whiteToBlack};
  font-size: ${({ theme }) => theme.fontSize}px;
  padding: 1rem 4rem;
  border: none;
  font-weight: bold;
  margin: 1rem auto;
  cursor: pointer;
  float: left;
  text-decoration: none;

  &:active,
  &:focus {
    border: none;
  }
`
