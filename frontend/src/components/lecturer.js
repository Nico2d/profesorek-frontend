import React, { useState } from "react"
import styled from "styled-components"
import AddOpinion from "./add-opinion"
import { RiPencilFill } from "react-icons/ri"
import Popup from "./popup"
import {isSignIn} from '../services/auth'

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
  const [openPopup, isOpenPopup] = useState(false)
  const fullName = `${data.data.Titles} ${data.data.Name} ${data.data.Surname}`

  return (
    <StyledContainer>
      <StyledWrapperLecturer>
        <Header>{fullName}</Header>
        <p>{`${data.data.UniversityName} - ${data.data.UniversityFaculty}`}</p>

        <StyledOpinionWrapper>
          {data.data.opinions_categories.map((category, index) => (
            <div key={index}>
              {`${category.category_name}: ${category.average_rating}`}
            </div>
          ))}
        </StyledOpinionWrapper>
      </StyledWrapperLecturer>

      {isSignIn() && (
        <>
          <StyledEditButton onClick={() => isOpenPopup(true)}>
            <RiPencilFill />
          </StyledEditButton>

          <Popup
            isOpen={openPopup}
            onClose={isOpenPopup}
            color={({ theme }) => theme.whiteToBlack}
          >
            <AddOpinion
              fullName={fullName}
              opinionCategories={data.data.opinions_categories}
            />
          </Popup>
        </>
      )}
    </StyledContainer>
  )
}

export default Lecturer

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
