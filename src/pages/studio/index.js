import React from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import ErrorBoundary from "components/ErrorBoundary";

import StudioRootContainer from "sections/studioRootContainer";
import { useIsMobile } from "../../Hooks/useIsMobile";

export default function IndexPage() {
  const { isMobile } = useIsMobile();

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        {!isMobile && (
          <Layout>
            <ErrorBoundary>
              <SEO title="Trip Map Studio" />
            </ErrorBoundary>
          </Layout>
        )}
        <StudioRootContainer />
      </StickyProvider>
    </ThemeProvider>
  );
}
