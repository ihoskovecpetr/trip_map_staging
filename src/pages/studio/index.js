import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import Head from "next/head";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import StudioRootContainer from "sections/studioRootContainer";
import { useIsMobile } from "Hooks/useIsMobile";
import { REDUX_COOKIE_NAME } from "constants/constants";

import { resetStore } from "redux/order/actions";

const StudioPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = useIsMobile();

  function ErrorFallback({ error }) {
    console.log("ErrorFallback_reseting_store", { error });

    Cookies.set(REDUX_COOKIE_NAME, "XX_DLTD");

    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button
          onClick={() => {
            dispatch(resetStore());
            router.push("/studio?id=123");
          }}
        >
          RESETOVAT STUDIO
        </button>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Trip Map - Studio</title>
      </Head>
      <StickyProvider>
        {!isMobile && (
          <Layout>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <SEO
                title="Trip Map - Studio"
                description="Designove studio pro tvorbu map"
                author="TripMap.shop"
              />
            </ErrorBoundary>
          </Layout>
        )}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {/* {str.toUpperCase()} */}
          <StudioRootContainer />
        </ErrorBoundary>
      </StickyProvider>
    </ThemeProvider>
  );
};

// StudioPage.getInitialProps = wrapper.getInitialPageProps((store) => (props) => {
//   const { pathname, req, res, router, query } = props;

//   return { pathname };
// });

// StudioPage.getInitialProps = async (ctx) => {
//   return { props: "nic" };
// };

export default StudioPage;
