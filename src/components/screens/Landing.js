import styled from "styled-components";
import Logo from "../../icons/Logo";
import Navigation from "../Navigation";
import { useNavigate } from "react-router-dom";
const Page = styled.div`
  height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
  width: 100vw;
  background-color: ${(props) => props.theme.primary};
  position: relative;

  @media (max-width: 64em) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  width: 75%;
  min-height: 80vh;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 64em) {
    width: 85%;
  }

  @media (max-width: 64em) {
    flex-direction: column-reverse;
    width: 100%;
  }
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;

    &:last-of-type {
      height: 30vh;
    }
  }
`;

const BoxCenter = styled.div`
  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    &:last-of-type {
      height: 30vh;
    }
  }
`;

const Title = styled.h2`
  text-transform: capitalize;
  width: 100%;
  color: ${(props) => props.theme.secondary};
  font-size: ${(props) => props.theme.fontxxxl};

  font-weight: 800;
  align-self: flex-start;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.xxxl};
    justify-content: center;
    text-align: center;
  }
`;

const SubText = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  text-transform: capitalize;
  color: ${(props) => `rgba(${props.theme.textRgba}, 0.6)`};
  font-weight: 200;
  margin-bottom: 1rem;
  width: 100%;
  align-self: flex-start;

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const Button = styled.button`
  display: flex;
  align-self: flex-start;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.white};
  outline: none;
  border: none;

  font-size: ${(props) => props.theme.fontmd};
  padding: 0.75rem 2rem;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 2px 2px 0 2px ${(props) => props.theme.black};
  }

  @media (max-width: 64em) {
    align-self: center;
    text-align: center;
  }
`;

const SVGLogo = styled(Logo)`
  width: 60%;

  @media (max-width: 64em) {
    width: 40%;
  }
`;

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <Page>
        <Container>
          <Box>
            <BoxCenter>
              <Title>Much 2Do</Title>
              <SubText>Organize your work.</SubText>
              <SubText>Be productive.</SubText>
              <SubText>Step up.</SubText>

              <Button onClick={() => navigate("/login")}>Get Started</Button>
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

export default Landing;
