import React, { useState } from "react"
import styled from "styled-components"
import FormImput from "./form-input"
import axios from "axios"
import { useForm } from "react-hook-form"
import Button from "../components/button"
import { motion } from "framer-motion"

const SignUp = ({ toggleSign }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    errors,
    clearErrors,
  } = useForm()
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)

  const onSubmitHandler = () => {
    console.log("Rejestracja")
    axios
      .post(
        "https://co-tam-profesorku-backend.herokuapp.com/auth/local/register",
        {
          username: watch("username"),
          email: watch("email"),
          password: watch("password"),
        }
      )
      .then(() => {
        console.log("Well done!")
        setIsRegisterSuccess(true)
      })
      .catch(error => {
        setError("register", {
          type: "manual",
          message: JSON.parse(error.response.request.responseText).message[0]
            .messages[0].message,
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
      <StyledHeader>Sign Up</StyledHeader>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
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
          onChange={() => {
            clearErrors("register")
          }}
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
        {errors.register && (
          <StyledErrorMessege>{errors.register.message}</StyledErrorMessege>
        )}
        {isRegisterSuccess && (
          <StyledErrorMessege>
            Gratulacje! Udało Ci się założyć nowe konto
          </StyledErrorMessege>
        )}

        <ButtonWrapper>
          <Button
            as="input"
            type="submit"
            value="Załóż konto"
            onClick={() => console.log("click")}
          />
        </ButtonWrapper>
      </form>

      <StyledFooterWrapper>
        <p>
          Masz już konto? <a onClick={() => toggleSign(true)}>Zaloguj się</a>
        </p>
      </StyledFooterWrapper>
    </StyledWrapper>
  )
}

export default SignUp

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
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
