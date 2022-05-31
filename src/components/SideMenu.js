import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import Logout from "../icons/Logout";
import Logo from "../icons/Logo";

const Container = styled.div`
  height: 100vh;
  width: 5rem;
  background-color: ${(props) => props.theme.secondary};
  float: left;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  margin-top: 1rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const LogoIcon = styled(Logo)`
  height: 100%;
  width: 100%;
  stroke: 3px;
`;

const Menu = styled.div``;

const Divider = styled.div``;

const LogoutContainer = styled.div`
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    fill: ${(props) => props.theme.white};
  }
  &:active {
    transform: scale(1.1);
  }
`;

const SideMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You're logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container>
      <LogoContainer>
        <LogoIcon />
      </LogoContainer>
      <Menu></Menu>
      <LogoutContainer>
        <Logout onClick={handleLogout} />
      </LogoutContainer>
    </Container>
  );
};

export default SideMenu;
