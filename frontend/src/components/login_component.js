import React from "react"
import styled, {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
body{
    font-family: 'Times New Roman';
}
`;

const StyledWrapper = styled.div`
    height = 45vh;
    background: lightblue;
    box-sizing: border-box;

`;

const Login = () => {
    return <StyledWrapper>
                <h1>Login</h1>
                <input type="email" name="mail input" placeholder="Your student mail"/>
                <br/>
                <input type="submit" name="submit login"/>
           </StyledWrapper>

}

export default Login