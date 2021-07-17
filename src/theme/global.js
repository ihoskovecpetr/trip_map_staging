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

  @font-face {
    src: url("../FontFiles/HarmoniaSans/HarmoniaSansProCyr-Bold.ttf")
      format("truetype");
    font-family: "HarmoniaSans_local";
    font-weight: 600;
  }

  @font-face {
    src: url("../FontFiles/HarmoniaSans/HarmoniaSansProCyr-Regular.ttf")
      format("truetype");
    font-family: "HarmoniaSans_local";
    font-weight: 400;
  }

  @font-face {
    src: url("../FontFiles/HarmoniaSans/HarmoniaSansProCyr-Light.ttf")
      format("truetype");
    font-family: "HarmoniaSans_local";
    font-weight: 300;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${fonts}

  html {

  }

  body {
  
  }

`;
