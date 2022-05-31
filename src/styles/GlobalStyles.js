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
    height: 100vh;
    background-color: #FFF8E5;
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
