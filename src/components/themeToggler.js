import React from "react"
import { StyledIconButton } from "../layout/layout"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

const ThemeToggler = ({ theme, toggleTheme }) => {
  return (
    <StyledIconButton onClick={toggleTheme}>
      {theme === "light" ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    </StyledIconButton>
  )
}

export default ThemeToggler
