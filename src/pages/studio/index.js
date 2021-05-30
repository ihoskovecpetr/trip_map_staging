import React from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";

import RootContainer from "sections/rootContainer";

export default function IndexPage() {
  console.log("index/studio return");
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Trip Map Studio" />
        </Layout>
        <RootContainer />
      </StickyProvider>
    </ThemeProvider>
  );
}
