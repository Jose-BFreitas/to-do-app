import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Section = styled.section`
  width: 100vw;
  background-color: ${(props) => props.theme.primary};
  height: ${(props) => props.theme.navHeight};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 90%;
  height: ${(props) => props.theme.navHeight};
  margin: 0 auto;
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
`;

const MenuItem = styled.li`
  margin: 0 1.5rem;
  color: ${(props) => props.theme.black};
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 0%;
    height: 2px;
    background: ${(props) => props.theme.black};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <Section>
      <NavBar>
        <Menu>
          <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
          <MenuItem onClick={() => navigate("/register")}>Register</MenuItem>
        </Menu>
      </NavBar>
    </Section>
  );
};

export default Navigation;
