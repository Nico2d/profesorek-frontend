import React, { useState } from "react"
import styled from "styled-components"

const OpinionCategory = ({
  lecturerCategories,
  userRatedCategories,
  getSelectedCategoryNameOfUserAnswers,
}) => {
  // console.log("lecturerCategories", )
  const [getSelect, setSelect] = useState(
    lecturerCategories.length > 0
      ? lecturerCategories[0].category_name
      : lecturerCategories
  )

  const isRatedByUser = () => {
    if (userRatedCategories.includes(getSelect)) {
      getSelectedCategoryNameOfUserAnswers(getSelect)
      return (
        <StyleDesc>
          Ten rodzaj zajęć zoztał już przez Ciebie oceniony. Możesz dokonać
          zmiany poprzez modyfikację
        </StyleDesc>
      )
    } else {
      getSelectedCategoryNameOfUserAnswers(null)
    }
  }

  return (
    <>
      <StyledSelectWrapper>
        <p>Rodzaj zajęć: </p>
        <StyledSelect onChange={e => setSelect(e.target.value)} name="category">
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

      {isRatedByUser()}
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
