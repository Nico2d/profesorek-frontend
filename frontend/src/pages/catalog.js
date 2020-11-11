import React, { useState } from "react"
import styled from "styled-components"
import Lecturer from "../components/lecturer"
import Layout from "../layout/layout"
import Sidebar from "../components/sidebar"
import { graphql } from "gatsby"

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

const Catalog = ({ data }) => {
  const [search, setSearch] = useState("")

  const universityList = Array.from(
    new Set(
      data.allStrapiLecturers.edges.map(
        document => document.node.UniversityName
      )
    )
  )

  const [activeUniversityList, setActiveUniversityList] = useState(
    universityList
  )

  return (
    <Layout>
      <StyledContainer>
        <Sidebar
          setSearch={setSearch}
          universityList={universityList}
          activeUniversityList={activeUniversityList}
          setActiveUniversityList={setActiveUniversityList}
        />
        <Main>
          <StyledHeader>Lista prowadzących</StyledHeader>
          {data.allStrapiLecturers.edges
            .filter(item => {
              return activeUniversityList.includes(item.node.UniversityName)
            })
            .filter(item => {
              return (
                item.node.Name.toLowerCase().includes(search) ||
                item.node.Surname.toLowerCase().includes(search) ||
                item.node.Titles.toLowerCase().includes(search)
              )
            })
            .map(document => (
              <Lecturer key={document.node.id} data={document.node} />
            ))}
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
