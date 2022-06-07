import { createGlobalStyle } from "styled-components";
import "@fontsource/sora";

export const GlobalStyles = createGlobalStyle`

*,*::before,*::after{
    margin:0;
    padding:0;
}

html{
}

body{
    font-family: 'Sora',sans-serif;
    overflow-x: hidden;
    background-color: #FFF8E5;
    height: 100vh;
}
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */


/* Handle */
::-webkit-scrollbar-thumb {
    background: #9BB1A3; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #4A6B72;
}


h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}

a{
    color: inherit;
    text-decoration: none;
}

`;

export default GlobalStyles;
