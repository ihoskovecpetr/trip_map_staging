import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import Head from "next/head";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import ErrorBoundary from "components/ErrorBoundary";
import router, { useRouter } from "next/router";

import StudioRootContainer from "sections/studioRootContainer";
import { useIsMobile } from "../../Hooks/useIsMobile";
// import { wrapper } from "redux/store";

const StudioPage = (props) => {
  const router = useRouter();
  const { isMobile } = useIsMobile();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Trip Map - studio</title>
      </Head>
      <StickyProvider>
        {!isMobile && (
          <Layout>
            <ErrorBoundary>
              <SEO
                title="Trip Map - Studio"
                description="Designove studio pro tvorbu map"
                author="TripMap.shop"
              />
            </ErrorBoundary>
          </Layout>
        )}
        <StudioRootContainer />
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
