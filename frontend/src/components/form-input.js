import React from "react"
import styled, { keyframes } from "styled-components"

const inputHighlighter = keyframes`
    from {
      background: #5264ae;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
`
const StyledLabel = styled.label`
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
`

const StyledHighlight = styled.span`
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
`

const StyledWrapper = styled.div`
  position: relative;
  margin-bottom: 45px;
`
const StyledBar = styled.span`
  position: relative;
  display: block;
  width: ${props => props.width}px;

  &:before,
  &:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: ${({ theme }) => theme.colors.primary};
    transition: 0.2s ease all;
  }

  &:before {
    left: 50%;
  }
  &:after {
    right: 50%;
  }
`

const StyledInput = styled.input`
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: ${props => props.width}px;
  border: none;
  border-bottom: 1px solid #757575;

  &:focus {
    outline: none;
  }

  &:focus ~ ${StyledLabel}, &:valid ~ ${StyledLabel} {
    top: -20px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }

  &:focus ~ ${StyledBar}::before, &:focus ~ ${StyledBar}::after {
    width: 50%;
  }

  &:focus ~ ${StyledHighlight} {
    animation: ${inputHighlighter} 0.3s ease;
  }
`

const FormInput = ({ title, width }) => {
  return (
    <StyledWrapper>
      <StyledInput type="text" required width={width} />
      <StyledHighlight></StyledHighlight>
      <StyledBar width={width}></StyledBar>
      <StyledLabel>{title}</StyledLabel>
    </StyledWrapper>
  )
}

export default FormInput
