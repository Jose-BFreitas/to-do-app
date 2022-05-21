import styled from "styled-components";
import Logo from "../../icons/Logo";
import Navigation from "../Navigation";

const Page = styled.div`
  min-height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
  width: 100vw;
  background-color: ${(props) => props.theme.primary};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 6rem;
  text-transform: capitalize;
  width: 100%;
  color: ${(props) => props.theme.secondary};
  font-weight: 800;
  align-self: flex-start;
`;

const SubText = styled.h2`
  font-size: ${(props) => props.theme.fontxl};
  text-transform: capitalize;
  color: ${(props) => `rgba(${props.theme.textRgba}, 0.6)`};
  font-weight: 200;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  width: 80%;
  align-self: flex-start;
`;

const Button = styled.button`
  display: flex;
  align-self: flex-start;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.white};
  outline: none;
  border: none;

  font-size: ${(props) => props.theme.fontmd};
  padding: 1rem 2.5rem;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  margin-left: 0.5rem;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 2px 2px 0 2px ${(props) => props.theme.black};
  }
`;

const SVGLogo = styled(Logo)`
  height: 100%;
`;

const Landing = () => {
  return (
    <>
      <Navigation />
      <Page>
        <Container>
          <Box>
            <Title>Much 2Do</Title>
            <SubText>Organize your work.</SubText>
            <SubText>Be productive.</SubText>
            <SubText>Step up.</SubText>

            <Button>Get Started</Button>
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
