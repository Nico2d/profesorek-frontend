import React from "react"
import styled from "styled-components"
import { AiOutlineCloseSquare } from "react-icons/ai"
import { motion } from "framer-motion"

const Popup = ({
  children,
  isOpen,
  onClose,
  color = ({ theme }) => theme.blackToYellow,
}) => {
  if (!isOpen) return null
  return (
    <StyledPopup
      as={motion.div}
      initial={{ scale: 0.5, y: "-50%", x: "-50%" }}
      animate={{ scale: 1 }}
      transition={{ type: "tween", duration: 0.25 }}
    >
      {children}
      <StyledIcon onClick={() => onClose(false)} iconColor={color}>
        <AiOutlineCloseSquare />
      </StyledIcon>
    </StyledPopup>
  )
}

export default Popup

const StyledIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 3rem;
  color: ${props => props.iconColor};
`

const StyledPopup = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  background: ${({ theme }) => theme.whiteToBlack};
  color: ${({ theme }) => theme.blackToYellow};
  width: 800px;
  height: 500px;
  box-shadow: 0 0px 2.2px rgba(0, 0, 0, 0.068), 0 0px 5.3px rgba(0, 0, 0, 0.096),
    0 0px 10px rgba(0, 0, 0, 0.12), 0 0px 17.9px rgba(0, 0, 0, 0.144),
    0 0px 33.4px rgba(0, 0, 0, 0.172), 0 0px 80px rgba(0, 0, 0, 0.24);
  border: 1px solid ${({ theme }) => theme.blackToYellow};
  font-size: ${({ theme }) => theme.fontSize}px;
  transition: all 0.25s linear;
`
