import { createGlobalStyle, css } from "styled-components";

const fonts = css`
  @font-face {
    src: url("../FontFile/EB_Garamond/Ubuntu-Light.ttf") format("truetype");
    src: url("../FontFile/EB_Garamond/EBGaramond-VariableFont_wght.ttf")
      format("truetype");
    font-family: "Gramond_local";
  }

  @font-face {
    src: url("../FontFile/Qahiri/Qahiri-Regular.ttf") format("truetype");
    src: url("../FontFile/Qahiri/Qahiri-Regular.ttf") format("truetype");
    font-family: "Qahiri_local";
  }

  @font-face {
    src: url("../FontFile/Roboto/Roboto-Regular.ttf") format("truetype");
    src: url("../FontFile/Roboto/Roboto-Regular.ttf") format("truetype");
    font-family: "Roboto_local";
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${fonts}

  html {

  }

  body {
  
  }

`;
