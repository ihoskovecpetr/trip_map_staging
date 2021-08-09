import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import About from "sections/About";

import Faq from "sections/faq";
import { wrapper } from "../redux/store";

const IndexPage = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Trip Map" />
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

IndexPage.getInitialProps = wrapper.getInitialPageProps(
  (store) => ({ pathname, req, res }) => {
    // store.dispatch(setNewTitle());
  }
);

// export default connect((state) => state, {})(IndexPage);
export default IndexPage;
