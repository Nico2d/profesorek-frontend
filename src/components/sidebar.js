import React from "react"
import styled from "styled-components"
import Searchbar from "../components/searchbar"

const StyledSidebar = styled.div`
  max-width: 280px;
  margin-right: 2rem;
  margin-top: 2rem;
`

export const StyledLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  &:hover input ~ span {
    background-color: #ccc;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: ${({ theme }) => theme.primary};
    }

    &:checked ~ span:after {
      display: block;
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #aaa;

    &:after {
      content: "";
      position: absolute;
      display: none;
    }

    &:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid ${({ theme }) => theme.whiteToBlack};
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }
`

const Sidebar = ({
  setSearch,
  universityList,
  activeUniversityList,
  getActiveUniversityList,
}) => {
  const handleInputChange = e => {
    const target = e.target

    if (target.checked) {
      getActiveUniversityList([...activeUniversityList, target.name])
    } else {
      getActiveUniversityList(
        activeUniversityList.filter(item => item !== target.name)
      )
    }
  }

  return (
    <StyledSidebar>
      <h3>Wyszukaj</h3>
      <Searchbar query={setSearch} />
      <h4>Uczelnie</h4>
      <div>
        {universityList.map(university => (
          <StyledLabel key={university}>
            <input
              name={university}
              type="checkbox"
              onChange={handleInputChange}
              defaultChecked={true}
            />
            <span></span>
            {university}
          </StyledLabel>
        ))}
      </div>
    </StyledSidebar>
  )
}

export default Sidebar
