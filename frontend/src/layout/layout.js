import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../utils/theme"
import { Link } from "gatsby"
import { FaDoorOpen } from "react-icons/fa"
import { useDarkMode } from "../components/useDarkMode"
import ThemeToggler from "../components/themeToggler"
import { getUser } from "../services/auth"

const Layout = ({ children }) => {
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  const themeMode = theme === "light" ? lightTheme : darkTheme
  const user = getUser()

  const logout = () => {
    localStorage.removeItem("userName")
    window.location.reload()
  }

  if (!mountedComponent) return <div />
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />

      <StyledContainer>
        <StyledNavbar>
          <StyledWelcome as={Link} to="/">
            {user !== {} && `Witaj ${user.username}!`}
          </StyledWelcome>

          <div style={{ display: "flex" }}>
            <ThemeToggler theme={theme} toggleTheme={themeToggler} />

            {localStorage.getItem("userName") != null && (
              <StyledIconButton onClick={logout}>
                <FaDoorOpen />
              </StyledIconButton>
            )}
          </div>
        </StyledNavbar>

        {children}
      </StyledContainer>
    </ThemeProvider>
  )
}

export default Layout

const buttonSize = 70

const StyledWelcome = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  height: inherit;
  color: ${({ theme }) => theme.blackToYellow};
`

export const StyledIconButton = styled.div`
  height: ${buttonSize}px;
  width: ${buttonSize}px;
  background: ${({ theme }) => theme.primary};
  font-size: ${buttonSize * 0.7}px;
  color: ${({ theme }) => theme.whiteToBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
`

const StyledNavbar = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  max-width: 1024px;
  padding: 1rem 2rem 1rem 0;
  display: flex;
  justify-content: space-between;
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
