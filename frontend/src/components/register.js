import React from "react"
import styled from "styled-components"
import FormImput from "../components/form-input"
import axios from "axios"
import { useForm } from "react-hook-form"

const Register = () => {
  const { register, handleSubmit, watch, setError, errors } = useForm()

  const onSubmit = () => {
    axios
      .post("http://localhost:1337/auth/local/register", {
        username: watch("username"),
        email: watch("email"),
        password: watch("password"),
      })
      .then(response => {
        console.log("Well done!")
        console.log("User profile", response.data.user)
        console.log("User token", response.data.jwt)
      })
      .catch(error => {
        console.log(eval(JSON.stringify(error.response.request.responseText)))
      })
  }

  return (
    <StyledWrapper>
      <StyledHeader>Rejestracja</StyledHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImput
          name="username"
          title="Nazwa użytkownika"
          width={336}
          onChange={() => {
            setError("username", {
              type: "manual",
              message: "Dont Forget Your Username Should Be Cool!",
            })
          }}
          inputRef={register({ required: true })}
        />
        <FormImput
          type="email"
          name="email"
          title="Twój mail studencki"
          width={336}
          inputRef={register({
            pattern: {
              value: /.+(@student).+/g,
              message: "E-mail musi znajdowac sie w domenie studenckiej",
            },
          })}
        />
        <FormImput
          type="password"
          name="password"
          title="Haslo"
          width={336}
          inputRef={register({ required: true })}
        />

        {errors.email && (
          <StyledErrorMessege>{errors.email.message}</StyledErrorMessege>
        )}
        <StyledButton type="submit" value="Załóż konto" />
      </form>

      <StyledFooterWrapper>
        <p>Masz już konto? <a>Zaloguj się</a></p> 
      </StyledFooterWrapper>
    </StyledWrapper>
  )
}

export default Register

const StyledFooterWrapper = styled.div`
  display: block;
  text-align: center;
  margin-top: 2rem;

  a {
    text-decoration: underline;
    color: blue;

    cursor: pointer;
  }
`

const StyledErrorMessege = styled.p`
  color: red;
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
  margin-top: 3rem;

  &:active,
  &:focus {
    border: none;
  }
`
