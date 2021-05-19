import React from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import LandingSection from "sections/landingSection";
import KeyFeature from "sections/key-feature";
import LandingPage from "sections/landing-page";
import Feature from "sections/feature";
import IndexContainer from "sections/indexContainer";
import WorkFlow from "sections/workflow";
import TestimonialCard from "sections/testimonial";
import SecurePayment from "sections/secure-payment";
import PrintfulPrint from "sections/printful-print";
import PackagesOptions from "sections/packages-options";
import Faq from "sections/faq";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Trip Map" />
          {/* <LandingSection /> */}
        </Layout>

        {/* <IndexContainer /> */}
        <Layout withFooter>
          <LandingPage />
          <WorkFlow />
          <KeyFeature />
          <PackagesOptions />
          <SecurePayment />
          <PrintfulPrint />
          {/* <Feature />
          <TestimonialCard /> */}
          {/* <Faq /> */}
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
}
