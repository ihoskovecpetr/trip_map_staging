import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import ExamplesMapSection from "sections/examplesMapSection";
import GallerySection from "sections/gallery-section";
import LandingPage from "sections/landing-page";
import WorkFlow from "sections/workflow";
import Feature from "sections/feature";
import TestimonialCard from "sections/testimonial";
import SecurePayment from "sections/secure-payment";
import PrintfulPrint from "sections/printful-print";
import PackagesOptions from "sections/packages-options";
import VideoFull from "sections/video-full";
import Faq from "sections/faq";
import { wrapper } from "../redux/store";

const IndexPage = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Trip Map" />
        </Layout>

        <Layout withFooter>
          <LandingPage />
          <WorkFlow />
          <GallerySection />
          <PackagesOptions />
          <VideoFull />
          <ExamplesMapSection />
          <SecurePayment />
          <PrintfulPrint />
          {/* <Feature />
          <TestimonialCard /> */}
          <Faq />
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
