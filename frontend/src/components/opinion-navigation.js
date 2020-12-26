import React, { useState } from "react"
import styled from "styled-components"
import Button from "../components/button"

const OpinionNavigation = ({
  activeQuestion,
  setActiveQuestion,
  questionQuantity,
  watch,
}) => {
  let buttonDisable = watch(`answer_${activeQuestion}`) ? false : true

  const [isSummary, setIsSummary] = useState(false)
  const [average, setAverage] = useState(0)

  const handleSummaryButton = () => {
    let sum = 0
    setActiveQuestion(activeQuestion + 1)
    setIsSummary(true)

    for (let i = 1; i <= questionQuantity; i++) {
      sum += parseInt(watch(`answer_${i}`))
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
    <>
      <StyledSummary isActive={activeQuestion === questionQuantity + 1}>
        <p>Średnia ocena nauczyciela w śród społeczności: </p>
        <p>Twoja średnia: {average}</p>
      </StyledSummary>

      <StyledNav>
        <div>
          {activeQuestion !== 1 && (
            <Button onClick={handleBackButton}>Wstecz</Button>
          )}
        </div>

        {activeQuestion < questionQuantity ? (
          <Button onClick={handleNextButton} isDisabled={buttonDisable}>
            Dalej
          </Button>
        ) : activeQuestion !== questionQuantity + 1 ? (
          <Button onClick={handleSummaryButton} isDisabled={buttonDisable}>
            Podsumowanie
          </Button>
        ) : (
          <Button>Dodaj</Button>
        )}
      </StyledNav>
    </>
  )
}

export default OpinionNavigation

const StyledNav = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  margin-top: 4rem;
`

const StyledSummary = styled.div`
  display: ${props => (props.isActive ? "inherit" : "none")};
`
