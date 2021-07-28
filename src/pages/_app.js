import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
// import { initGA, logPageView } from "analytics";
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
import { GlobalStyle } from "../theme/global";

export default function CustomApp({ Component, pageProps }) {
  // useEffect(() => {
  //   initGA();
  //   logPageView();
  //   Router.events.on("routeChangeComplete", logPageView);
  // }, []);

  const customizeForDevice = function () {
    const ua = navigator.userAgent;
    const checker = {
      iphone: ua.match(/(iPhone|iPod|iPad)/),
      blackberry: ua.match(/BlackBerry/),
      android: ua.match(/Android/),
    };
    if (checker.android) {
      console.log("customizeForDevice_Andriod device", {
        obj: checker.android,
      });
    } else if (checker.iphone) {
      console.log("customizeForDevice_iPhone device");
    } else if (checker.blackberry) {
      console.log("customizeForDevice_Blackberry device");
    } else {
      console.log("customizeForDevice_desktop");
    }
  };

  useEffect(() => {
    customizeForDevice();
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
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
