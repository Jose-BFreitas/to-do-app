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

const SvgComponent = (props, onClick) => (
  <SVG
    onClick={onClick}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 42 42'
    style={{
      cursor: "pointer",
    }}
    xmlSpace='preserve'
    width='1em'
    height='1em'
    {...props}
  >
    <path d='M42 19H23V0h-4v19H0v4h19v19h4V23h19z' />
  </SVG>
);

export default SvgComponent;
