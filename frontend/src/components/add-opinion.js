import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import axios from "axios"
import { getToken, getUser } from "../services/auth"
import OpinionCategory from "./opinion-category"
import Question from "../components/question"
import OpinionNavigation from "./opinion-navigation"

const AddOpinion = ({ fullName, opinionCategories, lecturerID }) => {
  console.log("refresh component AddOpinion")
  const [activeQuestion, setActiveQuestion] = useState(1)
  const { register, watch } = useForm()
  const [opinionsData, setOpinionsData] = useState([])

  const questionQuantity = 5
  const questionList = [
    "Prowadzący miał dobry stosunek do studentów",
    "Prowadzący w jasny sposób przekazywał treść materiału",
    "Prowadzący okazywał zainteresowanie przedmiotem",
    "Prowadzący trzymał się przedstawionych zasad zaliczenia przedmiotu",
    "Prowadzący chętny do pomocy studenom",
  ]

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

        setOpinionsData(userData)
      })
  }, [])

  //początkowo to powinna byc pierwsza categoria
  const getUserAnswers = loadUserRatedCategory => {
    //chce dostac pytania dla kategori
    if (loadUserRatedCategory !== null) {
      opinionsData.map(category => {
        console.log(loadUserRatedCategory)
        console.log(category.opinions_category.category_name)
        if (
          category.opinions_category.category_name === loadUserRatedCategory
        ) {
          console.log("my questions:", category.questions)
        }
      })
    }
  }

  const getUserRatedCategory = () => {
    let userIssuedOpinionsList = []

    opinionsData.map(({ opinions_category }) => {
      userIssuedOpinionsList.push(opinions_category.category_name)
    })

    return userIssuedOpinionsList
  }

  return (
    <div>
      <StyledHeaderSection>
        <StyleTitle>{fullName}</StyleTitle>
        <OpinionCategory
          lecturerCategories={opinionCategories}
          userRatedCategories={getUserRatedCategory()}
          getSelectedCategoryNameOfUserAnswers={value => getUserAnswers(value)}
        />
      </StyledHeaderSection>

      <div style={{ padding: "2rem" }}>
        {getUserAnswers()}
        {questionList.map((question, index) => (
          <StyledQuestionSection
            key={index}
            isActive={index + 1 === activeQuestion}
          >
            <Question
              label={`${index + 1}. ${question}`}
              inputRef={register()}
              questionNumber={index}
            />
          </StyledQuestionSection>
        ))}

        <OpinionNavigation
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          questionQuantity={questionQuantity}
          watch={watch}
        />
      </div>
    </div>
  )
}

export default AddOpinion

const StyledQuestionSection = styled.div`
  display: ${props => (props.isActive ? "inherit" : "none")};
`

const StyleTitle = styled.h2`
  margin: 0;
  margin-bottom: 1rem;
`

const StyledHeaderSection = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.whiteToBlack};
  padding: 1.5rem;
`
