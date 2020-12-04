import React, { useState } from "react"
import styled from "styled-components"
import FormImput from "../components/form-input"

const Login = () => {
  const [email, setEmail] = useState("")
  const [isAuth, setAuth] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    const domain =
      email.includes("@") &&
      email.substr(email.lastIndexOf("@") + 1).split(" ")[0]

    domain.includes("student") ? setAuth("true") : setAuth("false")

    if (isAuth === "true") {
      window.location.href = "/catalog?mail=" + email
    }
  }

  return (
    <StyledWrapper>
      <StyledHeader>Login</StyledHeader>

      <form onSubmit={handleSubmit}>
        <FormImput
          type="email" //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! dodaj type do FormInput
          name="mail input"
          title="Twój mail studencki"
          width={336}
          onInput={setEmail}
        />

        {isAuth === "false" && <p>Wprowadź mail z domeny studenckiej</p>}

        <StyledButton type="submit" value="Login" />
      </form>
    </StyledWrapper>
  )
}

export default Login

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.whiteToBlack};
  padding: 1rem 2rem;
  width: 400px;
  float: right;
  box-shadow: 0 2.2px 2.2px rgba(0, 0, 0, 0.068),
    0 5.3px 5.3px rgba(0, 0, 0, 0.096), 0 10px 10px rgba(0, 0, 0, 0.12),
    0 0px 17.9px rgba(0, 0, 0, 0.144), 0 33.4px 33.4px rgba(0, 0, 0, 0.172),
    0 0px 80px rgba(0, 0, 0, 0.24);
`

const StyledHeader = styled.h2`
  margin-bottom: 3rem;
`
const StyledButton = styled.input`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.whiteToBlack};
  font-size: ${({ theme }) => theme.fontSize}px;
  display: flex;
  padding: 1rem 4rem;
  border: none;
  font-weight: bold;
  margin: 1rem auto;
  cursor: pointer;
  float: right;

  &:active,
  &:focus {
    border: none;
  }
`
