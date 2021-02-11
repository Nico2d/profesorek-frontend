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

  const [average, setAverage] = useState(0)

  const handleSummaryButton = () => {
    let sum = 0
    setActiveQuestion(activeQuestion + 1)

    for (let i = 1; i <= questionQuantity; i++) {
      sum += parseInt(watch(`answer_${i}`))
    }

    setAverage(sum / questionQuantity)
  }

  const handleBackButton = () => {
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
            <Button type="button" onClick={handleBackButton}>
              Wstecz
            </Button>
          )}
        </div>

        {activeQuestion < questionQuantity ? (
          <Button
            type="button"
            onClick={handleNextButton}
            disabled={buttonDisable}
          >
            Dalej
          </Button>
        ) : activeQuestion !== questionQuantity + 1 ? (
          <Button
            type="button"
            onClick={handleSummaryButton}
            disabled={buttonDisable}
          >
            Podsumowanie
          </Button>
        ) : (
          <Button as="input" type="submit" />
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
