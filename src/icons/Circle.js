import * as React from "react";

const Circle = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={94}
    height={94}
    style={{
      enableBackground: "new 0 0 94 94",
    }}
    xmlSpace='preserve'
    {...props}
  >
    <path d='M47 94C21.084 94 0 72.916 0 47S21.084 0 47 0s47 21.084 47 47-21.084 47-47 47zm0-81.814c-19.196 0-34.814 15.618-34.814 34.814 0 19.195 15.618 34.814 34.814 34.814 19.195 0 34.814-15.619 34.814-34.814 0-19.196-15.619-34.814-34.814-34.814z' />
  </svg>
);

export default Circle;
