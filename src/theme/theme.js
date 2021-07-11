const theme = {
  colors: {
    text: "#343D48", // darkgrey - body color and primary color
    cta_color: "#25CB9E", // green-blue "#fe6769", // red CTA color
    text_secondary: "black", // "#02073E", // darkdarkblue - secondary body color
    heading: "black", // "#244886", // darkblue - primary heading color
    heading_secondary: "#0F2137", // almost black - heading color
    background: "#FFFFFF", // white -  body background color
    background_almost_white: "#F9FBFD", // almost white - secondary background color
    whitish_paper_blue: "#E5ECF4", // white paper blue -  border color
    primary: "black", // "#1F3E76", // blue - primary button and link color
    secondary: "#25CB9E", // greenblue - secondary color - can be used for hover states
    muted: "#7B8188", // grey - muted color
    accent: "#609", // violet - a contrast color for emphasizing UI
    yellow: "#F6C416",
  },
  breakPoints: {
    smallMobile: "375px",
    largeMobile: "475px",
    tablet: "640px",
    tabletLarge: "768px",
    desktop: "1024px",
    wideScreen: "1600px",
  },
  fonts: {
    ubuntu: `'Ubuntu', sans-serif`,
    avenir: `'Avenir', sans-serif`,
  },
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 600,
    bolder: 900,
  },
  fontSizes: {
    xs: ".75rem",
    sm: ".875rem",
    default: "1rem",
    md: "1.125rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "2.5rem",
    xxxl: "3.5rem",
    giant: "3.75rem",
  },
  downloadButtonSizes: {
    sm: "10rem",
    md: "15rem",
    lg: "20rem",
    xl: "25rem",
  },
  lineHeights: {
    larger: "1.5",
  },
  contentWidth: "1200px",
};

export default theme;
