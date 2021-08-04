// import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
// import NextApp from "next/app";
import App, { Container } from "next/app";

// import { initGA, logPageView } from "analytics";
// Load DM Sans typeface
import "typeface-dm-sans";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider as ThemeProviderMaterialUI } from "@material-ui/styles";
import { wrapper } from "../redux/store";

// Load other package css file
import "react-multi-carousel/lib/styles.css";
import "react-modal-video/css/modal-video.min.css";
import "rc-drawer/assets/index.css";
import "./style.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import { ThemeProvider } from "styled-components";
import theme from "../theme/theme.js";
import { GlobalStyle } from "../theme/global";

import * as ga from "LibGlobal/ga";

const themeMaterialUI = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#f6aa1c",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

// const wrapper = createWrapper(makeStore);

// export default function CustomApp({ Component, pageProps }) {
const MyApp = ({ Component, pageProps, store }) => {
  const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     ga.pageview(url);
  //   };
  //   //When the component is mounted, subscribe to router changes
  //   //and log those page views
  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <>
      <Head>
        {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta> */}
      </Head>

      <ThemeProviderMaterialUI theme={themeMaterialUI}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ThemeProviderMaterialUI>
    </>
  );
};

MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => ({ pathname, req, res }) => {
    console.log("2. Page.getInitialProps uses the store to dispatch things");
    store.dispatch({
      type: "TICK",
      payload: "was set in error page " + pathname,
    });
  }
);

export default wrapper.withRedux(MyApp);
