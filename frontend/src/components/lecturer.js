import React from "react"
import styled from "styled-components"
import { RiPencilFill } from "react-icons/ri"

const StyledWrapperLecturer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
  color: white;
  width: 500px;
  margin-right: 1rem;
`
const Header = styled.h4`
  font-size: 1.5rem;
  margin: 0;
`
const StyledEditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  font-size: 5rem;

  :hover {
    cursor: pointer;
  }
`
const StyledContainer = styled.div`
  display: flex;
  flex-flow: row;
  height: 150px;
  margin-bottom: 1rem;
`

const Lecturer = (data) => {
  const onClickHandler = () => {
    console.log("open questions", data);
  }

  return (
    <StyledContainer>
      <StyledWrapperLecturer>
      <Header>{data.data.Titles} {data.data.Name} {data.data.Surname}</Header>
        <p> {data.data.UniversityName} - {data.data.UniversityFaculty}</p>
        {/* <table>
          <tr>
            <th>Wykład</th>
            <td>4.5</td>
          </tr>
          <tr>
            <th>Laborki</th>
            <td>4.9</td>
          </tr>
        </table> */}
      </StyledWrapperLecturer>

      <StyledEditButton onClick={onClickHandler}>
        <RiPencilFill />
      </StyledEditButton>
    </StyledContainer>
  )
}

export default Lecturer

