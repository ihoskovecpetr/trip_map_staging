import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NextApp from "next/app";
import axios from "axios";
import { useDispatch } from "react-redux";

import CookieConsent from "react-cookie-consent";
import styled, { ThemeProvider } from "styled-components";
import { useCookies } from "react-cookie";

import { color } from "utils";

// import { initGA, logPageView } from "analytics";
// Load DM Sans typeface
import "typeface-dm-sans";
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
import themeMaterialUI from "../theme/themeMaterialUI.js";
import { GlobalStyle } from "../theme/global";

import { useFullStoreSelector } from "redux/order/reducer";

import { REDUX_COOKIE_NAME, IS_CLIENT } from "constants/constants";

const MyApp = ({ Component, pageProps, store }) => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies([REDUX_COOKIE_NAME]);
  const dispatch = useDispatch();
  const fullReduxStore = useFullStoreSelector();

  useEffect(() => {
    const storedCookie = cookie[REDUX_COOKIE_NAME];

    const saveReduxStore = async (store) => {
      const response = await axios.post("api/save-redux-store", {
        reduxStore: store,
        storeId: storedCookie,
      });

      if (response.status === 203) {
        const URLWithoutQuery =
          window.location.origin + window.location.pathname;
        window.location.href = URLWithoutQuery;
      }
    };

    saveReduxStore(fullReduxStore);
  }, [fullReduxStore]);

  useEffect(() => {
    if (router.pathname === "/studio") {
      const storedCookie = cookie[REDUX_COOKIE_NAME];

      const NonCookieOwner = storedCookie != router?.query?.id;
      const isMissingQueryID = !router?.query?.id;

      if (NonCookieOwner || isMissingQueryID) {
        router.query.id = storedCookie;
        router.push(router);
      }
    }
  }, [router.pathname]);

  return (
    <>
      {/* <Head>
        <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
      </Head> */}

      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ThemeProviderMaterialUI theme={themeMaterialUI}>
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
        </ThemeProviderMaterialUI>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (appContext) => {
    const { ctx } = appContext;

    const { pathname, req, res, router } = ctx;

    if (IS_CLIENT) {
      return;
    }

    const { meta } = req;

    if (meta?.storeId && res.cookie[REDUX_COOKIE_NAME] != meta.storeId) {
      console.log("Setting_new_cookie");

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
