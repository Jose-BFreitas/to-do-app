import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../icons/Logo";
import Input from "../Input";
import Navigation from "../Navigation";
import Google from "../../icons/Google";
import Facebook from "../../icons/Facebook";
import Apple from "../../icons/Apple";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
  width: 100vw;
  background-color: ${(props) => props.theme.primary};
  position: relative;
`;

const Container = styled.div`
  width: 75%;
  min-height: 80vh;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 64em) {
    &:last-of-type {
      display: none;
    }
  }
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxl};
  text-transform: capitalize;
  width: 100%;
  color: ${(props) => props.theme.black};
  font-weight: 200;
  align-self: flex-start;
`;

const LoginContainer = styled.div`
  background-color: ${(props) => props.theme.secondary};
  width: 20rem;
  height: auto;
  align-self: flex-start;
  padding: 1rem 1rem;

  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;

  box-shadow: 4px 4px 10px ${(props) => props.theme.black};

  @media (max-width: 64em) {
    width: 17rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-self: flex-start;
  background-color: ${(props) => props.theme.greenSecondary};
  color: ${(props) => props.theme.white};
  width: 100%;
  height: 3.5rem;
  outline: none;
  border: none;

  font-size: ${(props) => props.theme.fontlg};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  justify-content: center;
  align-items: center;

  margin-top: 1.5rem;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 2px 2px 0 2px ${(props) => props.theme.black};
  }

  &:active {
    background-color: rgba(155, 177, 163, 0.8);
    transform: translate(0px, 0px);
    box-shadow: none;
  }
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const Line = styled.div`
  width: 2rem;
  height: 2px;
  background-color: ${(props) => props.theme.primary};
`;

const DividerText = styled.span`
  padding: 0 0.5rem;
  color: ${(props) => props.theme.primary};
`;

const SVGLogo = styled(Logo)`
  width: 60%;

  @media (max-width: 64em) {
    width: 40%;
  }
`;

const LogoContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 1rem;

  & > * {
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(1);
    }
  }
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.primary};
  flex-direction: column;
`;

const OptionDivider = styled.div`
  height: 2px;
  width: 60%;
  margin: 0.5rem;
  background-color: ${(props) => props.theme.primary};
`;
const OptionText = styled.span`
  font-size: ${(props) => props.theme.fontsm};
  font-weight: 200;
  cursor: pointer;

  transition: all 0.2s ease;

  &:active {
    transform: scale(0.9);
  }
`;

const BoxCenter = styled.div``;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/todo");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Navigation />
      <Page>
        <Container>
          <Box>
            <BoxCenter>
              <Title>_Login</Title>
              <LoginContainer>
                <Input title='Email' value={email} setValue={setEmail} />
                <Input
                  title='Password'
                  value={password}
                  type='password'
                  setValue={setPassword}
                />
                <Button onClick={handleSubmit}>Login</Button>
                <Divider>
                  <Line />
                  <DividerText>or</DividerText>
                  <Line />
                </Divider>
                <LogoContainer>
                  <Facebook />
                  <Apple />
                  <Google />
                </LogoContainer>
                <OptionContainer>
                  <OptionText onClick={() => navigate("/register")}>
                    Create an account
                  </OptionText>
                  <OptionDivider />
                  <OptionText>Forgot password?</OptionText>
                </OptionContainer>
              </LoginContainer>
            </BoxCenter>
          </Box>
          <Box>
            <SVGLogo />
          </Box>
        </Container>
      </Page>
    </>
  );
};

export default Login;
