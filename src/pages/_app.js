import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NextApp from "next/app";
import withRedux from "next-redux-wrapper";
import axios from "axios";

import CookieConsent from "react-cookie-consent";
import styled, { ThemeProvider } from "styled-components";
import { useCookies } from "react-cookie";

import { color } from "utils";

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
import theme from "../theme/theme.js";
import { GlobalStyle } from "../theme/global";

import { useFullStoreSelector } from "redux/order/reducer";

import { REDUX_COOKIE_NAME, IS_CLIENT } from "constants/constants";

const themeMaterialUI = createTheme({
  palette: {
    primary: {
      main: "#001427",
    },
    secondary: {
      main: "#f6aa1c",
    },
    cta_color: {
      main: "#f6aa1c",
    },
  },
});

const MyApp = ({ Component, pageProps, store }) => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies([REDUX_COOKIE_NAME]);

  const fullReduxStore = useFullStoreSelector();

  // useEffect(() => {
  //   const storedCookie = cookie[REDUX_COOKIE_NAME];

  //   if (storedCookie != router?.query?.id || !router?.query?.id) {
  //     router.query.id = storedCookie;
  //     router.push(router);
  //   }
  // }, []);

  useEffect(() => {
    const storedCookie = cookie[REDUX_COOKIE_NAME];

    const saveReduxStore = async (store) => {
      const response = await axios.post("api/save-redux-store", {
        reduxStore: store,
        storeId: storedCookie,
      });

      if (response.status === 203) {
        window.location.href =
          window.location.origin + window.location.pathname;
      }
    };

    saveReduxStore(fullReduxStore);
  }, [fullReduxStore]);

  useEffect(() => {
    if (router.pathname === "/studio") {
      const storedCookie = cookie[REDUX_COOKIE_NAME];

      if (storedCookie != router?.query?.id || !router?.query?.id) {
        router.query.id = storedCookie;
        router.push(router);
      }
    }
  }, [router.pathname]);

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
          <CookieConsent
            location="bottom"
            buttonText="Souhlasím"
            cookieName="myAwesomeCookieName2"
            style={{ background: "#2B373B" }}
            buttonStyle={{
              background: "#f6aa1c",
              color: "#4e503b",
              fontSize: "13px",
            }}
            expires={150}
          >
            Tento web používá k poskytování služeb, personalizaci reklam a
            analýze návštěvnosti soubory cookie. Používáním tohoto webu s tím
            souhlasíte.{" "}
            <span style={{ fontSize: "10px" }}>
              Více o GDPR se dočtete{" "}
              <StyledA href="/obchodni-informace">zde</StyledA>
            </span>
          </CookieConsent>

          <Component {...pageProps} />
        </ThemeProvider>
      </ThemeProviderMaterialUI>
    </>
  );
};

MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (appContext) => {
    const { ctx } = appContext;

    const { pathname, req, res, router } = ctx;

    if (IS_CLIENT) {
      console.log("_app_isClient_returnuning", { ctx });
      return;
    }

    const { meta } = req;

    if (meta?.storeId && res.cookie[REDUX_COOKIE_NAME] != meta.storeId) {
      res.cookie(REDUX_COOKIE_NAME, meta.storeId, {
        maxAge: 900000,
        httpOnly: false,
      });
    }

    const appProps = await NextApp.getInitialProps(appContext);

    return { ...appProps, extra: "prop", storeId: meta?.storeId };
  }
);

const StyledA = styled.a`
  color: ${color("cta_color")};
`;

export default wrapper.withRedux(MyApp);
