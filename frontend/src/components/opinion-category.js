import React from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"

const OpinionCategory = ({ lecturerCategories, userRatedCategories }) => {
  const { register, watch } = useForm()

  return (
    <>
      <StyledSelectWrapper>
        <p>Rodzaj zajęć: </p>
        <StyledSelect ref={register} name="category">
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

      {userRatedCategories.includes(watch("category")) && (
        <StyleDesc>
          Ten rodzaj zajęć zoztał już przez Ciebie oceniony. Możesz dokonać
          zmiany poprzez modyfikację
        </StyleDesc>
      )}
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
