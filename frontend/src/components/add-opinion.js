import React, { useState } from "react"
import styled from "styled-components"
import Button from "../components/button"
import Question from "../components/question"
import { useForm } from "react-hook-form"

const AddOpinion = ({ fullName, opinionCategories }) => {
  const [activeQuestion, setActiveQuestion] = useState(1)
  const [isSummary, setIsSummary] = useState(false)
  const { register, watch } = useForm()
  const [average, setAverage] = useState(0)

  const questionQuantity = 5
  const questionList = [
    "Prowadzący miał dobry stosunek do studentów",
    "Prowadzący w jasny sposób przekazywał treść materiału",
    "Prowadzący okazywał zainteresowanie przedmiotem",
    "Prowadzący trzymał się przedstawionych zasad zaliczenia przedmiotu",
    "Prowadzący chętny do pomocy studenom",
  ]

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

        <StyledSelectWrapper>
          <p>Rodzaj zajęć: </p>
          <StyledSelect>
            {opinionCategories.length > 1 ? (
              opinionCategories.map((category, index) => (
                <option key={index} value={category.category_name}>
                  {category.category_name}
                </option>
              ))
            ) : (
              <option>Brak</option>
            )}
          </StyledSelect>
        </StyledSelectWrapper>

        <StyleDesc>
          Ten rodzaj zajęć zoztał już przez Ciebie oceniony. Możesz dokonać
          zmiany poprzez modyfikację
        </StyleDesc>
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
            <Button onClick={handleNextButton}>Dalej</Button>
          ) : activeQuestion !== 6 ? (
            <Button onClick={handleSummaryButton}>Podsumowanie</Button>
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

const StyledSelectWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;

  P {
    margin: 0;
  }
`

const StyleDesc = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizeSmall}px;
`

const StyledSelect = styled.select`
  background: transparent;
  border: none;
  margin: 0;
  margin-left: 2rem;
  color: ${({ theme }) => theme.whiteToBlack};
  font-size: ${({ theme }) => theme.fontSize}px;

  option {
    color: black;
  }
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

// const GET_LECTURER = gql`
//   query Lecturer($id: ID!) {
//     lecturer(id: $id) {
//       id
//       Name
//       opinions_categories{
//         category_name
//       }
//     }
//   }
// `
