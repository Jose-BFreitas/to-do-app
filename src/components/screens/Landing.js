import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Logo from "../../icons/Logo";

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.body};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SVGLogo = styled(Logo)`
  width: 2rem;
`;
const Landing = () => {
  const navigate = useNavigate();
  return (
    <Page>
      Landing
      <Logo />
      <SVGLogo />
      <button onClick={() => navigate("login")}>Login</button>
      <button onClick={() => navigate("register")}>Sign Up</button>
    </Page>
  );
};

export default Landing;
