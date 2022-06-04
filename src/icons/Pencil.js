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

const Pencil = (props) => (
  <SVG
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512.019 512.019'
    style={{
      enableBackground: "new 0 0 512.019 512.019",
      cursor: "pointer",
    }}
    xmlSpace='preserve'
    width='1em'
    height='1em'
    {...props}
  >
    <path d='M350.316 80.852 0 431.166v80.843h80.841l350.316-350.316zM377.28 53.907 431.175.013l80.84 80.84-53.893 53.894z' />
  </SVG>
);

export default Pencil;
