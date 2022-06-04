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

const Cross = (props) => (
  <SVG
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 490 490'
    style={{
      cursor: "pointer",
    }}
    xmlSpace='preserve'
    width='1em'
    height='1em'
    {...props}
  >
    <path d='M456.851 0 245 212.564 33.149 0 .708 32.337l211.961 212.667L.708 457.678 33.149 490 245 277.443 456.851 490l32.441-32.322-211.961-212.674L489.292 32.337z' />
  </SVG>
);

export default Cross;
