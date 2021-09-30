import { createGlobalStyle, css } from "styled-components";

const fonts = css`
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

  // RobotoMono
  @font-face {
    src: url("../FontFiles/Roboto_Mono/RobotoMono-Bold.ttf") format("truetype");
    font-family: "RobotoMono_local";
    font-weight: 600;
    font-display: block;
  }

  @font-face {
    src: url("../FontFiles/Roboto_Mono/RobotoMono-Regular.ttf")
      format("truetype");
    font-family: "RobotoMono_local";
    font-weight: 400;
    font-display: block;
  }

  @font-face {
    src: url("../FontFiles/Roboto_Mono/RobotoMono-Light.ttf") format("truetype");
    font-family: "RobotoMono_local";
    font-weight: 300;
    font-display: block;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${fonts}

  html {

  }

  body {
  
  }

  #full_screen_button {
    background-color: red;
  }
`;
