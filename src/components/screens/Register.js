import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import styled from "styled-components";
import Logo from "../../icons/Logo";
import Input from "../Input";
import Navigation from "../Navigation";

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
  margin-top: 1.5rem;

  font-size: ${(props) => props.theme.fontlg};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  justify-content: center;
  align-items: center;

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

const SVGLogo = styled(Logo)`
  width: 60%;

  @media (max-width: 64em) {
    width: 40%;
  }
`;

const ForgotContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

const ForgotPw = styled.a`
  justify-content: center;
  text-align: center;
  text-decoration: underline;
  color: ${(props) => props.theme.white};
`;

const BoxCenter = styled.div``;

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, name);
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
              <Title>_Register</Title>
              <LoginContainer>
                <Input title='Email' value={email} setValue={setEmail} />
                <Input title='Name' value={name} setValue={setName} />

                <Input
                  title='Password'
                  value={password}
                  setValue={setPassword}
                  type='password'
                />
                <Input
                  title='Confirm Password'
                  value={confirmPw}
                  setValue={setConfirmPw}
                  type='password'
                />

                <Button onClick={handleSubmit}>Register</Button>
                <ForgotContainer>
                  <ForgotPw>Forgot Password</ForgotPw>
                </ForgotContainer>
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

export default Register;
