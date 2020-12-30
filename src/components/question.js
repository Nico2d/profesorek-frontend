import React from "react"
import styled from "styled-components"

const Question = ({ label, inputRef, questionNumber, ...res }) => {
  const questionValueString = [
    "zdecyfowanie nie",
    "raczej nie",
    "trudno powiedzieć",
    "raczej tak",
    "zdecydowanie tak",
  ]

  return (
    <>
      <StyleQuestion>{label}</StyleQuestion>
      <StyledAnswerWrapper>
        {questionValueString.map((valueString, index) => (
          <StyledLabel key={index}>
            <input
              type="radio"
              value={index + 1}
              ref={inputRef}
              name={`answer_${questionNumber + 1}`}
            />
            {valueString}
          </StyledLabel>
        ))}
      </StyledAnswerWrapper>
    </>
  )
}

export default Question

const StyleQuestion = styled.h2`
  margin-top: 0;
  margin-bottom: 3rem;
  font-size: ${({ theme }) => theme.fontSize}px;
`

const StyledAnswerWrapper = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  margin-top: 2rem;
  justify-content: space-between;
`

const StyledLabel = styled.label`
  display: flex;
  flex-flow: column;
  text-align: center;

  input {
    margin: auto;
    margin-bottom: 0.5rem;
  }
`
