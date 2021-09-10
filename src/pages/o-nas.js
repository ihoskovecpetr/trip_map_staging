import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import About from "sections/about";

import Faq from "sections/faq";

const IndexPage = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO
            title="Trip Map - O nás"
            description="Informace o nás"
            author="TripMap.shop"
          />
          {/* <LandingSection /> */}
        </Layout>

        {/* <IndexContainer /> */}
        <Layout withFooter>
          <About />
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
};

// export default connect((state) => state, {})(IndexPage);
export default IndexPage;
