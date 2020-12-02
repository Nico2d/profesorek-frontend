import React, { useState } from "react"
import styled from "styled-components"
import { FaUserPlus } from "react-icons/fa"
import Popup from "../components/popup"
import FormInput from "../components/form-input"
import { gql, useMutation } from "@apollo/client"

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.yingYang};
  font-size: 3rem;
  cursor: pointer;
`

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

//TO DO: zrobić component button po którym bedzie tutaj dziedziczenie
const StyledButton = styled.input`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.yingYang};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 4rem;
  border: none;
  font-weight: bold;
  margin: 1rem auto;
  cursor: pointer;

  &:active,
  &:focus {
    border: none;
  }
`

const ADD_DATA = gql`
  mutation AddTeacher(
    $titles: String
    $name: String
    $surname: String
    $university: String
    $faculty: String
  ) {
    createLecturer(
      input: {
        data: {
          Titles: $titles
          Name: $name
          Surname: $surname
          UniversityName: $university
          UniversityFaculty: $faculty
        }
      }
    ) {
      lecturer {
        Titles
        Name
        Surname
        UniversityName
        UniversityFaculty
      }
    }
  }
`

const AddLecturer = ({ callback }) => {
  const [openPopup, isOpenPopup] = useState(false)
  const [addData] = useMutation(ADD_DATA)

  const [titles, setTitles] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [university, setUniversity] = useState("")
  const [universityFaculty, setUniversityFaculty] = useState("")

  const onSubmitHandler = e => {
    e.preventDefault()

    addData({
      variables: {
        titles: titles,
        name: name,
        surname: surname,
        university: university,
        faculty: universityFaculty,
      },
    })

    isOpenPopup(false)

    callback({
      node: {
        Titles: titles,
        Name: name,
        Surname: surname,
        UniversityFaculty: university,
        UniversityName: universityFaculty,
        opinions_categories: [],
      },
    })
  }

  return (
    <>
      <StyledContainer onClick={() => isOpenPopup(true)}>
        <FaUserPlus />
        &nbsp;Dodaj prowadzacego
      </StyledContainer>

      <Popup
        isOpen={openPopup}
        onClose={isOpenPopup}
        title="Dodaj prowadzącego"
      >
        <form style={{ marginTop: "3rem" }} onSubmit={onSubmitHandler}>
          <StyledWrapper>
            <FormInput
              value={titles}
              onInput={setTitles}
              title="Tytuły naukowe"
              width={200}
            />
            <FormInput
              value={name}
              onInput={setName}
              title="Imię"
              width={250}
            />
            <FormInput
              value={surname}
              onInput={setSurname}
              title="Naziwsko"
              width={250}
            />
          </StyledWrapper>

          <StyledWrapper>
            <FormInput
              value={university}
              onInput={setUniversity}
              title="Uczelnia"
              width={400}
            />
            <FormInput
              value={universityFaculty}
              onInput={setUniversityFaculty}
              title="Wydział"
              width={300}
            />
          </StyledWrapper>

          <StyledButton type="submit" value="Dodaj" />
        </form>
      </Popup>
    </>
  )
}

export default AddLecturer
