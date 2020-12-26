import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { getToken, getUser } from "../services/auth"
import Question from "../components/question"
import { useForm } from "react-hook-form"
import OpinionNavigation from "./opinion-navigation"

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
        <CategorySelector
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

const OpinionAnswers = ({ userOpinions, selectedCategory, lecturerID }) => {
  const questionList = [
    "Prowadzący miał dobry stosunek do studentów",
    "Prowadzący w jasny sposób przekazywał treść materiału",
    "Prowadzący okazywał zainteresowanie przedmiotem",
    "Prowadzący trzymał się przedstawionych zasad zaliczenia przedmiotu",
    "Prowadzący chętny do pomocy studenom",
  ]

  const { register, reset, watch, handleSubmit } = useForm()
  const [currentQuestion, setCurrentQuestion] = useState(1)

  useEffect(() => {
    userOpinions.map(({ opinions_category, questions }) => {
      let obj = {}

      if (opinions_category.category_name === selectedCategory) {
        questions.map(({ question_id, value }) => {
          obj[`${question_id}`] = `${value}`
        })
      } else {
        setCurrentQuestion(1)
        questions.map(({ question_id }) => {
          obj[`${question_id}`] = ``
        })
      }

      reset(obj)
    })
  }, [userOpinions, selectedCategory])

  const onSubmit = data => {
    let questions = []

    Object.keys(data).map(answer => {
      questions.push({
        question_id: answer,
        value: data[answer],
      })
    })

    axios
      .post("http://localhost:1337/opinions", {
        opinions_category: [lecturerID],
        users_permissions_user: [getUser().id],
        questions: questions,
      })
      .then(response => {
        console.log(response)
      })
  }

  return (
    <form style={{ padding: "2rem" }} onSubmit={handleSubmit(onSubmit)}>
      {questionList.map((question, index) => (
        <StyledQuestionSection
          key={index}
          isActive={index + 1 === currentQuestion}
        >
          <Question
            label={`${index + 1}. ${question}`}
            inputRef={register}
            questionNumber={index}
          />
        </StyledQuestionSection>
      ))}

      <OpinionNavigation
        activeQuestion={currentQuestion}
        setActiveQuestion={setCurrentQuestion}
        questionQuantity={questionList.length}
        watch={watch}
      />
    </form>
  )
}

const StyledQuestionSection = styled.div`
  display: ${props => (props.isActive ? "inherit" : "none")};
`
