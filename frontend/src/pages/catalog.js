import React, { useState } from "react"
import styled from "styled-components"
import Lecturer from "../components/lecturer"
import Layout from "../layout/layout"
import Sidebar from "../components/sidebar"
import { graphql } from "gatsby"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import AddLecturer from "../components/add-lecturer"

const buttonSize = 70

const StyledContainer = styled.div`
  display: flex;
`
const Main = styled.div`
  flex-grow: 1;
`
const StyledHeader = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`
//TO DO: zrobić component button po którym bedzie tutaj dziedziczenie
const StyledButton = styled.div`
  height: ${buttonSize}px;
  width: ${buttonSize}px;
  background: ${({ theme }) => theme.colors.primary};
  font-size: ${buttonSize * 0.7}px;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`

const LecturerWrapper = styled.div`
  display: flex;
  flex-flow: column;
`
const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Catalog = ({ data }) => {
  const [lecturerList, setLecturerList] = useState(
    data.allStrapiLecturers.edges
  )
  const [search, setSearch] = useState("")
  const universityList = Array.from(
    new Set(lecturerList.map(document => document.node.UniversityName))
  )

  const [activeUniversityList, setActiveUniversityList] = useState(
    universityList
  )

  return (
    <Layout>
      <StyledButtonWrapper>
        <StyledButton>
          <AiOutlineEyeInvisible />
        </StyledButton>
      </StyledButtonWrapper>

      <StyledContainer>
        <Sidebar
          setSearch={setSearch}
          universityList={universityList}
          activeUniversityList={activeUniversityList}
          setActiveUniversityList={setActiveUniversityList}
        />
        <Main>
          <StyledHeader>Lista prowadzących</StyledHeader>
          <LecturerWrapper>
            {lecturerList
              // .filter(item => {
              //   return activeUniversityList.includes(item.node.UniversityName)
              // })
              .filter(item => {
                return (
                  item.node.Name.toLowerCase().includes(search) ||
                  item.node.Surname.toLowerCase().includes(search) ||
                  item.node.Titles.toLowerCase().includes(search)
                )
              })
              .map((document, index) => (
                <Lecturer key={index} data={document.node} />
              ))}
          </LecturerWrapper>
          <AddLecturer
            callback={callback =>
              setLecturerList(prevState => [...prevState, callback])
            }
          ></AddLecturer>
        </Main>
      </StyledContainer>
    </Layout>
  )
}

export default Catalog

export const query = graphql`
  query {
    allStrapiLecturers {
      edges {
        node {
          id
          Name
          Surname
          Titles
          UniversityFaculty
          UniversityName
          opinions_categories {
            category_name
            average_rating
          }
        }
      }
    }
  }
`
