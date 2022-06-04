import * as React from "react";
import styled from "styled-components";

const SVG = styled.svg`
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const Ok = (props, onClick) => (
  <SVG
    width='1em'
    height='1em'
    xmlns='http://www.w3.org/2000/svg'
    aria-labelledby='okIconTitle'
    stroke='#000'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    fill='none'
    color='#000'
    onClick={onClick}
    style={{ cursor: "pointer" }}
    {...props}
  >
    <title>{"Confirm"}</title>

    <path d='m4 13 5 5L20 7' />
  </SVG>
);

export default Ok;
