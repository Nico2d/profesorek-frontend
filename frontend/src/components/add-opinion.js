import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import axios from "axios"
import { getToken, getUser } from "../services/auth"
import OpinionCategory from "./opinion-category"
import Button from "../components/button"
import Question from "../components/question"

const AddOpinion = ({ fullName, opinionCategories, lecturerID }) => {
  const [activeQuestion, setActiveQuestion] = useState(1)
  const [isSummary, setIsSummary] = useState(false)
  const { register, watch } = useForm()
  const [average, setAverage] = useState(0)
  const [userOpinionList, setUserOpinionList] = useState([])
  const [opinionsData, setOpinionsData] = useState([])

  let buttonDisable = watch(`answer[${activeQuestion}]`) ? false : true

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
        let userIssuedOpinionsList = []
        data
          .filter(({ users_permissions_user: student }) => {
            return student.id === getUser().id
          })
          .filter(({ opinions_category }) => {
            return opinions_category.lecturer == lecturerID
          })
          .map(({ opinions_category }) => {
            userIssuedOpinionsList.push(opinions_category.category_name)
          })

        setUserOpinionList(userIssuedOpinionsList)
        setOpinionsData(data)
      })
  }, [])

  const handleSummaryButton = () => {
    let sum = 0
    setActiveQuestion(activeQuestion + 1)
    setIsSummary(true)

    for (let i = 1; i <= questionQuantity; i++) {
      sum += parseInt(watch(`answer[${i}]`))
    }

    setAverage(sum / questionQuantity)
  }

  const handleBackButton = () => {
    if (activeQuestion - 1 == questionQuantity) {
      setIsSummary(false)
    }

    setActiveQuestion(activeQuestion - 1)
  }

  const handleNextButton = () => {
    setActiveQuestion(activeQuestion + 1)
  }

  return (
    <div>
      <StyledHeaderSection>
        <StyleTitle>{fullName}</StyleTitle>
        <OpinionCategory
          lecturerCategories={opinionCategories}
          userRatedCategories={userOpinionList}
        />
      </StyledHeaderSection>

      <div style={{ padding: "2rem" }}>
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

        <StyledSummary isActive={isSummary}>
          <p>Średnia ocena nauczyciela w śród społeczności: </p>
          <p>Twoja średnia: {average}</p>
        </StyledSummary>

        <StyledNav>
          <div>
            {activeQuestion !== 1 && (
              <Button onClick={handleBackButton}>Wstecz</Button>
            )}
          </div>

          {activeQuestion < 5 ? (
            <Button onClick={handleNextButton} isDisabled={buttonDisable}>
              Dalej
            </Button>
          ) : activeQuestion !== 6 ? (
            <Button onClick={handleSummaryButton} isDisabled={buttonDisable}>
              Podsumowanie
            </Button>
          ) : (
            <Button>Dodaj</Button>
          )}
        </StyledNav>
      </div>
    </div>
  )
}

export default AddOpinion

const StyledSummary = styled.div`
  display: ${props => (props.isActive ? "inherit" : "none")};
`

const StyledQuestionSection = styled.div`
  display: ${props => (props.isActive ? "inherit" : "none")};
`

const StyledNav = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-top: 4rem;
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
