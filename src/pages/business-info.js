import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import ObchodniInformace from "sections/obchodniInformace";

import Faq from "sections/faq";

const IndexPage = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO
            title="Trip Map - Obchodni Informace"
            description="Dokumentace"
            author="TripMap.shop"
          />
        </Layout>

        <Layout withFooter>
          <ObchodniInformace />
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
};

export default IndexPage;
