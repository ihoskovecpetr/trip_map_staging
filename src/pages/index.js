import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import LandingSection from "sections/landingSection";
import GallerySection from "sections/gallery-section";
import LandingPage from "sections/landing-page";
import Feature from "sections/feature";
import IndexContainer from "sections/indexContainer";
import WorkFlow from "sections/workflow";
import TestimonialCard from "sections/testimonial";
import SecurePayment from "sections/secure-payment";
import PrintfulPrint from "sections/printful-print";
import PackagesOptions from "sections/packages-options";
import Faq from "sections/faq";
import { connect } from "react-redux";
import { wrapper } from "../redux/store";
import { setNewTitle } from "../redux/order/actions";
import { useDispatch } from "react-redux";

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
          <LandingPage />
          <WorkFlow />
          <GallerySection />
          <PackagesOptions />
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
