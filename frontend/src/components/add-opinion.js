import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { getToken, getUser } from "../services/auth"
import OpinionAnswers from "../components/opinion-answers"
import OpinionCategory from "./opinion-category"

const AddOpinion = ({ fullName, opinionCategories, lecturerID }) => {
  const [getOpinions, setOpinions] = useState([])
  const [categoryName, setCategoryName] = useState(
    opinionCategories.length > 0
      ? opinionCategories[0].category_name
      : opinionCategories
  )

  useEffect(() => {
    axios
      .get("http://localhost:1337/opinions", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(({ data }) => {
        let userData = data
          .filter(({ users_permissions_user: student }) => {
            return student.id === getUser().id
          })
          .filter(({ opinions_category }) => {
            return opinions_category.lecturer == lecturerID
          })

        setOpinions(userData)
      })
  }, [])

  return (
    <div>
      <StyledHeaderSection>
        <StyleTitle>{fullName}</StyleTitle>
        <OpinionCategory
          lecturerCategories={opinionCategories}
          getSelected={setCategoryName}
        />
      </StyledHeaderSection>

      <OpinionAnswers
        userOpinions={getOpinions}
        selectedCategory={categoryName}
        lecturerID={lecturerID}
      />
    </div>
  )
}

export default AddOpinion

const StyleTitle = styled.h2`
  margin: 0;
  margin-bottom: 1rem;
`

const StyledHeaderSection = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.whiteToBlack};
  padding: 1.5rem;
`
