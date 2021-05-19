import React from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";

import SEO from "components/seo";
import Layout from "components/layout";
import Congratulation from "sections/congratulation";
import SecurePayment from "sections/secure-payment";

export default function Success() {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Trip Map" />
          {/* <LandingSection /> */}
        </Layout>

        {/* <IndexContainer /> */}
        <Layout withFooter>
          <Congratulation />
          {/* <SecurePayment /> */}
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
}
