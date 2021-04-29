import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
export const darkThem = {};
export const lightTheme = {
  accent: "#0095f6",
  borderColor: "rgb(219, 219, 219)",
};

export const GlobalStyles = createGlobalStyle`
${reset}
*{
    box-sizing:border-box;

}
input{
    all : unset;
}
body{
    font-size :14px;
    font-family: 'Open Sans', sans-serif;
    color : rgb(38,38,38);
}
`;
