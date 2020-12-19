import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Lecturer from "../components/lecturer"
import Layout from "../layout/layout"
import Sidebar from "../components/sidebar"
import AddLecturer from "../components/add-lecturer"
import { gql, useQuery } from "@apollo/client"
import { isSignIn } from "../services/auth"

const Catalog = () => {
  const { loading, error, data } = useQuery(GET_LECTURERS)
  const [search, setSearch] = useState("")
  const [universityList, setUniversityList] = useState([])
  const [activeUniversityList, setActiveUniversityList] = useState([])
  const [lecturerList, setLecturerList] = useState([])

  useEffect(() => {
    const onCompleted = data => {
      const unicalList = Array.from(
        new Set(data.lecturers.map(item => item.UniversityName))
      )
      setLecturerList(data.lecturers)
      setUniversityList(unicalList)
      setActiveUniversityList(unicalList)
    }
    const onError = error => {
      console.log("error: ", error)
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data)
      } else if (onError && !loading && error) {
        onError(error)
      }
    }
  }, [loading, error, data])

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`

  const AddNewLecturer = ({ node }) => {
    setLecturerList(prevState => [...prevState, node])

    if (universityList.indexOf(node.UniversityName) === -1) {
      setUniversityList([...universityList, node.UniversityName])
      setActiveUniversityList([...activeUniversityList, node.UniversityName])
    }
  }

  return (
    <Layout>
      <StyledContainer>
        <Sidebar
          setSearch={setSearch}
          universityList={universityList}
          activeUniversityList={activeUniversityList}
          getActiveUniversityList={setActiveUniversityList}
        />
        <StyledMainContent>
          <StyledHeader>
            <StyledHeading>Lista prowadzących</StyledHeading>
            {!isSignIn() && `Zaloguj sie aby dodać opinie`}
          </StyledHeader>
          <LecturerWrapper>
            {lecturerList
              .filter(item => {
                return activeUniversityList.includes(item.UniversityName)
              })
              .filter(item => {
                return (
                  item.Name.toLowerCase().includes(search) ||
                  item.Surname.toLowerCase().includes(search) ||
                  item.Titles.toLowerCase().includes(search)
                )
              })
              .map((item, index) => (
                <Lecturer key={index} data={item} />
              ))}
          </LecturerWrapper>
          {isSignIn() && (
            <AddLecturer
              callback={callback => AddNewLecturer(callback)}
            ></AddLecturer>
          )}
        </StyledMainContent>
      </StyledContainer>
    </Layout>
  )
}

export default Catalog

const StyledContainer = styled.div`
  margin-top: 4rem;
  display: flex;
`
const StyledMainContent = styled.div`
  flex-grow: 1;
`

const StyledHeader = styled.div`
  margin-bottom: 2rem;
`

const StyledHeading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0;
`

const LecturerWrapper = styled.div`
  display: flex;
  flex-flow: column;
`

const GET_LECTURERS = gql`
  query getLecturers {
    lecturers {
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
`
