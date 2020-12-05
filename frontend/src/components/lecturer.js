import React from "react"
import styled from "styled-components"
import { RiPencilFill } from "react-icons/ri"

const StyledWrapperLecturer = styled.div`
  background: ${({ theme }) => theme.primary};
  padding: 1rem;
  color: ${({ theme }) => theme.whiteToBlack};
  flex: 1;
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
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.whiteToBlack};
  font-size: 5rem;
  margin-left: 1rem;

  :hover {
    cursor: pointer;
  }
`
const StyledContainer = styled.div`
  display: flex;
  flex-flow: row;
  min-height: 150px;
  margin-bottom: 1rem;
`

const StyledOpinionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  div {
    white-space: "nowrap";
  }
`

const Lecturer = data => {
  const onClickHandler = () => {
    console.log("open questions")
  }

  return (
    <StyledContainer>
      <StyledWrapperLecturer>
        <Header>
          {`${data.data.Titles} ${data.data.Name} ${data.data.Surname}`}
        </Header>
        <p>{`${data.data.UniversityName} - ${data.data.UniversityFaculty}`}</p>

        <StyledOpinionWrapper>
          {data.data.opinions_categories.map((category, index) => (
            <div key={index}>
              {`${category.category_name}: ${category.average_rating}`}
            </div>
          ))}
        </StyledOpinionWrapper>
      </StyledWrapperLecturer>

      {localStorage.getItem("userName") != null && (
        <StyledEditButton onClick={onClickHandler}>
          <RiPencilFill />
        </StyledEditButton>
      )}
    </StyledContainer>
  )
}

export default Lecturer
