import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { getToken, getUser } from "../services/auth"
import Question from "../components/question"
import { useForm } from "react-hook-form"

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
          userOpinions={getOpinions}
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

const OpinionAnswers = ({ userOpinions, selectedCategory }) => {
  //sprawdzic ile jest pytan - moge wziac liczbe pytan z questionList.lenght
  const questionList = [
    "Prowadzący miał dobry stosunek do studentów",
    "Prowadzący w jasny sposób przekazywał treść materiału",
    "Prowadzący okazywał zainteresowanie przedmiotem",
    "Prowadzący trzymał się przedstawionych zasad zaliczenia przedmiotu",
    "Prowadzący chętny do pomocy studenom",
  ]

  const { register, setValue, reset } = useForm()

  useEffect(() => {
    userOpinions.map(({ opinions_category, questions }) => {
      console.log(questions)
      if (opinions_category.category_name === selectedCategory) {
        questions.map(({ question_id, value }) => {
          setValue(`${question_id}`, `${value}`, { shouldDirty: true })
        })
      } else {
        reset({
          answer_1: "",
          answer_2: "",
          answer_3: "",
          answer_4: "",
          answer_5: "",
        })
      }
    })
  }, [userOpinions, selectedCategory])

  return (
    <div>
      {questionList.map((question, index) => (
        <StyledQuestionSection key={index} isActive={true}>
          <Question
            label={`${index + 1}. ${question}`}
            inputRef={register}
            questionNumber={index}
          />
        </StyledQuestionSection>
      ))}
    </div>
  )
}

const StyledQuestionSection = styled.div`
  display: ${props => (props.isActive ? "inherit" : "none")};
`
