import React, { useState } from "react"
import styled from "styled-components"
import { FaUserPlus } from "react-icons/fa"
import Popup from "../components/popup"
import FormInput from "../components/form-input"

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 3rem;
  cursor: pointer;
`

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

//TO DO: zrobić component button po którym bedzie tutaj dziedziczenie
const StyledButton = styled.input`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 4rem;
  border: none;
  font-weight: bold;
  margin: 1rem auto;

  &:active, &:focus{
    border: none;
  }
`

const AddLecturer = () => {
  const [isPopup, setIsPopup] = useState(false)

  return (
    <>
      <StyledContainer onClick={() => setIsPopup(true)}>
        <FaUserPlus />
        &nbsp;Dodaj prowadzacego
      </StyledContainer>

      <Popup isOpen={isPopup} onClose={setIsPopup} title="Dodaj prowadzącego">
        <form style={{ marginTop: "3rem" }}>
          <StyledWrapper>
            <FormInput title="Tytuły naukowe" width={200} />
            <FormInput title="Imię" width={250} />
            <FormInput title="Naziwsko" width={250} />
          </StyledWrapper>

          <StyledWrapper>
            <FormInput title="Uczelnia" width={400} />
            <FormInput title="Wydział" width={300} />
          </StyledWrapper>

          <StyledButton type="submit" value="Dodaj" />
        </form>
      </Popup>
    </>
  )
}

export default AddLecturer
