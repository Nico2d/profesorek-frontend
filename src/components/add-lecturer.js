import React, { useState } from "react"
import styled from "styled-components"
import { FaUserPlus } from "react-icons/fa"
import Popup from "../components/popup"
import FormInput from "../components/form-input"
import axios from "axios"

const AddLecturer = ({ callback }) => {
  const [openPopup, isOpenPopup] = useState(false)

  const [titles, setTitles] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [university, setUniversity] = useState("")
  const [universityFaculty, setUniversityFaculty] = useState("")

  const onSubmitHandler = e => {
    e.preventDefault()

    axios
      .post("https://co-tam-profesorku-backend.herokuapp.com/lecturers", {
        Titles: titles,
        Name: name,
        Surname: surname,
        UniversityName: university,
        UniversityFaculty: universityFaculty,
      })
      .then(response => {
        console.log(response)
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

      <Popup isOpen={openPopup} onClose={isOpenPopup}>
        <StyledPopupConainter>
          <h2>Dodaj prowadzącego</h2>
          <form style={{ marginTop: "3rem" }} onSubmit={onSubmitHandler}>
            <StyledWrapper>
              <FormInput
                defaultValue={titles}
                onInput={e => setTitles(e.target.value)}
                title="Tytuły naukowe"
                width={200}
                name="title"
              />
              <FormInput
                defaultValue={name}
                onChange={e => setName(e.target.value)}
                title="Imię"
                width={250}
                name="name"
              />
              <FormInput
                defaultValue={surname}
                onChange={e => setSurname(e.target.value)}
                title="Naziwsko"
                width={250}
                name="surname"
              />
            </StyledWrapper>

            <StyledWrapper>
              <FormInput
                defaultValue={university}
                onChange={e => setUniversity(e.target.value)}
                title="Uczelnia"
                width={400}
                name="university"
              />
              <FormInput
                defaultValue={universityFaculty}
                onChange={e => setUniversityFaculty(e.target.value)}
                title="Wydział"
                width={300}
                name="faculty"
              />
            </StyledWrapper>

            <StyledButton type="submit" value="Dodaj" />
          </form>
        </StyledPopupConainter>
      </Popup>
    </>
  )
}

export default AddLecturer

const StyledPopupConainter = styled.div`
  padding: 1rem;
`

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.whiteToBlack};
  font-size: 3rem;
  cursor: pointer;
`

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`

const StyledButton = styled.input`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.whiteToBlack};
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
