import React from "react"
import styled from "styled-components"

const OpinionCategory = ({ lecturerCategories, getSelected }) => {
  return (
    <>
      <StyledSelectWrapper>
        <p>Rodzaj zajęć: </p>
        <StyledSelect onChange={e => getSelected(e.target.value)}>
          {lecturerCategories.length > 0 ? (
            lecturerCategories.map((category, index) => (
              <option key={index} value={category.category_name}>
                {category.category_name}
              </option>
            ))
          ) : (
            <option>Brak</option>
          )}
        </StyledSelect>
      </StyledSelectWrapper>
    </>
  )
}

export default OpinionCategory

const StyledSelectWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;

  P {
    margin: 0;
  }
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
