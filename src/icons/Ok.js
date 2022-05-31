import * as React from "react";

const Ok = (props, onClick) => (
  <svg
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
  </svg>
);

export default Ok;
