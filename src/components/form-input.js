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
  margin-top: 2rem;
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
    background: ${({ theme }) => theme.secondary};
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
  background: transparent;
  color: ${({ theme }) => theme.blackToYellow};
  font-size: ${({ theme }) => theme.fontSize}px;

  &:focus {
    outline: none;
  }

  &:focus ~ ${StyledLabel}, &:valid ~ ${StyledLabel} {
    top: -20px;
    left: -1px;
    color: ${({ theme }) => theme.secondary};
  }

  &:focus ~ ${StyledBar}::before, &:focus ~ ${StyledBar}::after {
    width: 50%;
  }

  &:focus ~ ${StyledHighlight} {
    animation: ${inputHighlighter} 0.3s ease;
  }
`

const FormInput = ({ title, width, ...rest }) => {
  return (
    <StyledWrapper>
      <StyledInput width={width} {...rest} />
      <StyledHighlight></StyledHighlight>
      <StyledBar width={width}></StyledBar>
      <StyledLabel>{title}</StyledLabel>
    </StyledWrapper>
  )
}

export default FormInput
