import styled from "styled-components"
import React from "react"
import { FiSearch } from "react-icons/fi"

const primary = ({ theme }) => theme.colors.black;

const StyledSearchbarWrapper = styled.div`
  margin-top: 7px;
  display: inline-flex;
  border: 1px solid ${primary};
  background: transparent;
`

const StyledSearchbar = styled.input`
  background: transparent;
  border: none;
  height: 35px;
  color: ${primary};
  font-size: 16px;
  :focus {
    outline: none;
  }
  ::placeholder {
    opacity: 1;
  }
`

const StyledIcon = styled.i`
  margin-left: .5rem;
  margin-right: 10px;
  transform: translateY(50%);
  color: ${primary};
`

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