import React, { useState } from "react"
import styled from "styled-components"
import FormImput from "../components/form-input"
import axios from "axios"
import { useForm } from "react-hook-form"

// Request API.
// Add your own code here to customize or restrict how the public can register new users.
axios
  .post("http://localhost:1337/auth/local/register", {
    username: "Strapi user",
    email: "user@strapi.io",
    password: "strapiPassword",
  })
  .then(response => {
    // Handle success.
    console.log("Well done!")
    console.log("User profile", response.data.user)
    console.log("User token", response.data.jwt)
  })
  .catch(error => {
    // Handle error.
    console.log("An error occurred:", error.response)
  })

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  // const [email, setEmail] = useState("")
  // const [isAuth, setAuth] = useState("")

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const [userName, domain] = email.includes("@") && email.split("@")

  //   if (domain.includes("student")) {
  //     window.location.href = "/catalog"
  //     localStorage.setItem("userName", userName)
  //   } else {
  //     setAuth("false")
  //   }
  // }

  return (
    <StyledWrapper>
      <StyledHeader>Login</StyledHeader>

      <form onSubmit={handleSubmit}>
        <FormImput
          type="text"
          name="username"
          title="Nazwa użytkownika"
          width={336}
          inputRef={register}
        />
        <FormImput
          type="email"
          name="email"
          title="Twój mail studencki"
          width={336}
          inputRef={register}
        />
        <FormImput
          type="password"
          name="password"
          title="Haslo"
          width={336}
          inputRef={register}
        />

        {/* {isAuth === "false" && (
          <p>
            <b>Wprowadź mail z domeny studenckiej</b>
          </p>
        )} */}

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
