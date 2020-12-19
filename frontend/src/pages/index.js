import React, { useState } from "react"
import SignUp from "../components/sign-up"
import SignIn from "../components/sign-in"
import Layout from "../layout/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import LinkButton from "../components/link-button"
import Triangle from "../assets/Triangle.svg"
import { isLoggedIn } from "../services/auth"

const IndexPage = () => {
  const [isSignIn, setToggleSign] = useState(true)

  return (
    <Layout>
      <SEO title="Home" />
      <StyledWrapper>
        <StyleTitleWrapper>
          <h1>Pomoż sobie oraz innym studentom</h1>
          <LinkButton text={"Lista Prowadząch"} path="/catalog" />
        </StyleTitleWrapper>

        <StyleLoginWrapper>
          {isLoggedIn() &&
            (isSignIn ? (
              <SignIn toggleSign={setToggleSign} />
            ) : (
              <SignUp toggleSign={setToggleSign} />
            ))}
        </StyleLoginWrapper>
      </StyledWrapper>
    </Layout>
  )
}
export default IndexPage

const StyleTitleWrapper = styled.div`
  float: left;
  width: 50%;

  h1 {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 2rem;
  }
`

const StyleLoginWrapper = styled.div`
  float: right;
  width: 50%;
`

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &::before,
  &::after {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  &::before {
    background: linear-gradient(
      115deg,
      ${({ theme }) => theme.whiteToBlack} 49%,
      ${({ theme }) => theme.primaryToWhite} 0%
    );
    z-index: -2;
  }

  &::after {
    background-color: ${({ theme }) => theme.secondaryToGray};
    mask-image: url("${Triangle}");
    mask-repeat: no-repeat;
    mask-position: center;
    z-index: -1;
  }
`
