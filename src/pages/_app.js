import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { initGA, logPageView } from "analytics";
// Load DM Sans typeface
import "typeface-dm-sans";

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

export default function CustomApp({ Component, pageProps }) {
  useEffect(() => {
    initGA();
    logPageView();
    Router.events.on("routeChangeComplete", logPageView);
  }, []);

  return (
    <>
      <Head>
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta> */}
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
