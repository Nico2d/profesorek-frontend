import React, { useState } from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../utils/theme"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("light")

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />

      <StyledContainer>
        <StyledNavbar>
          <StyledButtonWrapper>
            <StyledChangeMode onClick={themeToggler}>
              {theme === "light" ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </StyledChangeMode>
          </StyledButtonWrapper>
        </StyledNavbar>

        {children}
      </StyledContainer>
    </ThemeProvider>
  )
}

export default Layout

const buttonSize = 70

const StyledChangeMode = styled.div`
  height: ${buttonSize}px;
  width: ${buttonSize}px;
  background: ${({ theme }) => theme.primary};
  font-size: ${buttonSize * 0.7}px;
  color: ${({ theme }) => theme.whiteToBlack};
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledNavbar = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  max-width: 1024px;
  padding: 1rem 2rem;
`

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;  
    margin:0;
    padding: 0;
    background-color: ${({ theme }) => theme.whiteToBlack};
    color: ${({ theme }) => theme.blackToYellow};
    font-size: ${({ theme }) => theme.fontSize}px;
    transition: all 0.25s linear;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`

const StyledContainer = styled.div`
  max-width: 1024px;
  padding: 0 1rem;
  margin: auto;
`
