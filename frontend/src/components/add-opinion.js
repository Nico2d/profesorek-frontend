import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { getToken, getUser } from "../services/auth"

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
      {/* Lecturer Section */}
      <StyledHeaderSection>
        <StyleTitle>{fullName}</StyleTitle>
        <CategorySelector
          lecturerCategories={opinionCategories}
          getSelected={setCategoryName}
        />
      </StyledHeaderSection>

      {/* User Section */}

      <div>
        <OpinionAnswers
          opinions={getOpinions}
          selectedCategory={categoryName}
        />
      </div>
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

const CategorySelector = ({ lecturerCategories, getSelected }) => {
  return (
    <>
      <p>Rodzaj zajęć: </p>
      <select onChange={e => getSelected(e.target.value)}>
        {lecturerCategories.length > 0 ? (
          lecturerCategories.map((category, index) => (
            <option key={index} value={category.category_name}>
              {category.category_name}
            </option>
          ))
        ) : (
          <option>Brak</option>
        )}
      </select>
    </>
  )
}

const OpinionAnswers = ({ opinions, selectedCategory }) => {
  console.log("render OpinionAnswers");
  return (
    <div>
      {opinions.map(({ opinions_category, questions }) => {
        opinions_category.category_name === selectedCategory && (
          questions.map((answer, index) => <p key={index}>DUPA SRAKA</p>)


        )
        //   console.log(answer.value)

        //   return (
        //     <div key={index}>
        //       DUPA
        //       <p>Moja wartosć:</p>
        //     </div>
        //   )
        // })
      })}
    </div>
  )
}
