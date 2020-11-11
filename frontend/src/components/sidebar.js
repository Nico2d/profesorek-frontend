import React from "react"
import styled from "styled-components"
import Searchbar from "../components/searchbar"

const StyledSidebar = styled.div`
  width: 300px;
  padding: 1rem;
`

const StyledLabel = styled.label`
  display: block;
`

const Sidebar = ({
  setSearch,
  universityList,
  activeUniversityList,
  setActiveUniversityList,
}) => {
  const handleInputChange = e => {
    const target = e.target

    if (target.checked) {
      setActiveUniversityList([...activeUniversityList, target.name])
    } else {
      setActiveUniversityList(
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
            {university}
          </StyledLabel>
        ))}
      </div>
    </StyledSidebar>
  )
}

export default Sidebar
