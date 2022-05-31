import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h3`
  color: ${(props) => props.theme.white};
  font-weight: 200;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const InputContainer = styled.div`
  background-color: ${(props) => props.theme.greenPrimary};
  height: 2.7rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  text-align: start;
  padding: 0 0.5rem;
`;

const TextInput = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  outline: none;
  text-decoration: none;
  font-size: ${(props) => props.theme.fontmd};
`;

const Input = ({ title, value, setValue }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <InputContainer>
        <TextInput onChange={(e) => setValue(e.target.value)} />
      </InputContainer>
    </Container>
  );
};

export default Input;
