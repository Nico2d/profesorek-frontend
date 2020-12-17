import React, { useState } from "react"
import styled from "styled-components"
import FormImput from "./form-input"
import axios from "axios"
import { useForm } from "react-hook-form"

const SignIn = ({ toggleSign }) => {
  const { register, handleSubmit, watch, errors } = useForm()

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

        <StyledButton type="submit" value="Login" />
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

  &:active,
  &:focus {
    border: none;
  }
`
