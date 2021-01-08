import React from "react"
import styled from "styled-components"
import FormImput from "./form-input"
import axios from "axios"
import { useForm } from "react-hook-form"
import Button from "../components/button"
import { StyledLabel } from "../components/sidebar"
import { setUser, setToken } from "../services/auth"
import { motion } from "framer-motion"

const SignIn = ({ toggleSign }) => {
  const { register, handleSubmit, watch, errors, setError } = useForm()

  const onSubmit = () => {
    axios
      .post("http://localhost:1337/auth/local", {
        identifier: watch("username"),
        password: watch("password"),
      })
      .then(response => {
        console.log("Well done!")
        setUser(response.data.user)
        setToken(response.data.jwt)
        window.location.href = "http://localhost:8000/catalog"
      })
      .catch(error => {
        let json = JSON.parse(error.response.request.responseText)
        let errorMessege = json.message[0].messages[0].message

        setError("username", {
          type: "manual",
          message: errorMessege,
        })
      })
  }

  return (
    <StyledWrapper
      as={motion.div}
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -400, opacity: 0 }}
    >
      <StyledHeader>Sign In</StyledHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImput
          type="text"
          name="username"
          title="Nazwa użytkownika / e-mail"
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
        <Whitespace height="1.5rem" />
        <StyledLabel>
          <input type="checkbox" />
          <span></span>
          Pozostań zalogowany
        </StyledLabel>

        {errors.username && (
          <StyledErrorMessege>{errors.username.message}</StyledErrorMessege>
        )}

        <ButtonWrapper>
          <Button>Sign in</Button>
        </ButtonWrapper>
      </form>
      <StyledFooterWrapper>
        <p>
          Nie masz konta? <a onClick={() => toggleSign(false)}>Załóż konto</a>
        </p>
      </StyledFooterWrapper>
    </StyledWrapper>
  )
}

export default SignIn

const Whitespace = styled.div`
  height: ${props => props.height};
`

const StyledErrorMessege = styled.p`
  color: red;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const StyledFooterWrapper = styled.div`
  display: block;
  text-align: center;
  margin-top: 2rem;

  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.primaryToWhite};
    cursor: pointer;
  }
`

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
