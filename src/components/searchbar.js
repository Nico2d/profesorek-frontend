import styled from "styled-components"
import React from "react"
import { FiSearch } from "react-icons/fi"

const Searchbar = props => {
  const changeHanlder = e => {
    props.query(e.target.value.toLowerCase())
  }

  return (
    <StyledSearchbarWrapper>
      <StyledIcon as={FiSearch} />
      <StyledSearchbar
        type="text"
        placeholder="Szukaj"
        onChange={changeHanlder}
      />
    </StyledSearchbarWrapper>
  )
}
export default Searchbar

const StyledSearchbarWrapper = styled.div`
  margin-top: 7px;
  display: inline-flex;
  border: 1px solid ${({ theme }) => theme.blackToYellow};
  background: transparent;
  height: 35px;
`

const StyledSearchbar = styled.input`
  background: transparent;
  border: none;
  height: 35px;
  color: ${({ theme }) => theme.blackToYellow};
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    opacity: 1;
  }
`

const StyledIcon = styled.i`
  margin: auto 10px auto 0.5rem;
  color: ${({ theme }) => theme.blackToYellow};
`
