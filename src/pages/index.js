import React, { useEffect } from 'react'
import { ThemeProvider } from 'theme-ui'
import { StickyProvider } from 'contexts/app/app.provider'
import theme from 'theme'
import SEO from 'components/seo'
import Layout from 'components/layout'
import ExamplesMapSection from 'sections/examplesMapSection'
import GallerySection from 'sections/gallery-section'
import LandingPage from 'sections/landing-page'
import WorkFlow from 'sections/workflow'
import Feature from 'sections/feature'
import TestimonialCard from 'sections/testimonial'
import SecurePayment from 'sections/secure-payment'
import PrintfulPrint from 'sections/printful-print'
import PackagesOptions from 'sections/packages-options'
import VideoFull from 'sections/video-full'
import Faq from 'sections/faq'

const IndexPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <StickyProvider>
                <SEO
                    title="Trip Map Introduction"
                    description="Beautifuly designed maps with your custom trip created in seconds. Design you original custom map."
                    author="TripMap.org"
                />

                <Layout withFooter>
                    <LandingPage />
                    <ExamplesMapSection />
                    <GallerySection />
                    <PackagesOptions />
                    <VideoFull />
                    <WorkFlow />
                    <SecurePayment />
                    <PrintfulPrint />
                    {/* <Feature /> */}
                    <TestimonialCard />
                    <Faq />
                </Layout>
            </StickyProvider>
        </ThemeProvider>
    )
}

export default IndexPage
