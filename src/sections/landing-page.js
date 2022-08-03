/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx, Container, Box, Grid, Text, Heading } from 'theme-ui'
import TextFeature from 'components/text-feature'
import Image from 'components/image'
import Carousel from 'nuka-carousel'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'

import Briefcase from 'assets/landing-page/briefcaseBlack.svg'
import Secure from 'assets/landing-page/secureBlack.svg'
import UnderlineLoader from 'components/UnderlineLoader'
import Button from 'components/Button'
import ScrollAnimatedIcon from 'components/ScrolAnimatedIcon'
import { useElementDimensions } from 'Hooks/useElementDimensions'
import { useIsMobile } from 'Hooks/useIsMobile'
import { useDisplayPNG } from 'Hooks/useDisplayPNG'
import { useIsSafari } from 'Hooks/useIsSafari'
import { mobile, color } from 'utils'
import DiscountBanner from 'components/DiscountBanner'
import { useTranslation } from 'Hooks/useTranslation'
import { fontWeight } from 'utils'
import { IS_CLIENT, MODE_OF_TRANSPORT } from 'constants/constants'
import BG_langing from 'assets/white_table_clock.jpg'
import GeocoderInput from 'components/GeocoderInput'
import ModeOfTransportSelect from 'components/draggableJourneys/ModeOfTransportSelect'
import { useGetJourneysDraggableSelector } from 'redux/order/reducer'
import { getNewTitleSubtitle } from 'LibGlobal/getNewTitleSubtitle'

import {
    setMapCoordinatesAction,
    removeAllJourneys,
    addNewLocationDraggable,
    setMapBboxAction,
    updateLocation,
    setNewTitle,
    setNewSubtitle,
    setActiveStepNumber
} from 'redux/order/actions'

import Carousel1Webp from 'assets/carousel_landing/webp/1.webp'
import Carousel2Webp from 'assets/carousel_landing/webp/2.webp'
import Carousel3Webp from 'assets/carousel_landing/webp/3.webp'
import Carousel4Webp from 'assets/carousel_landing/webp/4.webp'
import Carousel5Webp from 'assets/carousel_landing/webp/5.webp'

import Carousel1PNG from 'assets/carousel_landing/png/1.png'
import Carousel2PNG from 'assets/carousel_landing/png/2.png'
import Carousel3PNG from 'assets/carousel_landing/png/3.png'
import Carousel4PNG from 'assets/carousel_landing/png/4.png'
import Carousel5PNG from 'assets/carousel_landing/png/5.png'

import USA_east from 'assets/mapExamples/usa_east.png'
import JapanPNG from 'assets/mapExamples/new_japan.png'
import GermanyPNG from 'assets/mapExamples/new_germany.png'
import ItalyWhitePNG from 'assets/mapExamples/italy_white.png'

const data = {
    subTitle: '',
    title: 'landingPage.title', //"Vytvořte si stylovou mapu na památku", // "Vytvořte si stylovou vzpomínku na cesty",  "Vytvořte si vlastní mapu na vzpomínku",
    features: [
        {
            id: 1,
            imgSrc: Briefcase,
            altText: 'landingPage.1.alttext',
            title: 'landingPage.1.title',
            text: 'landingPage.1.text'
        },
        {
            id: 2,
            imgSrc: Secure,
            altText: 'landingPage.2.alttext',
            title: 'landingPage.2.title',
            text: 'landingPage.2.text'
        }
    ]
}

export default function LandingPage() {
    const { height: headerHeight } = useElementDimensions('header')
    const { height: carouselHeight } = useElementDimensions('carousel_wrapper')
    const { isMobile } = useIsMobile()
    const { displayPNG } = useDisplayPNG()
    const isSafari = useIsSafari()
    const t = useTranslation()
    const dispatch = useDispatch()
    const journeysDragable = useGetJourneysDraggableSelector()

    const [fromLocation, setFromLocation] = useState(null)
    const [toLocation, setToLocation] = useState(null)

    useEffect(() => {
        const vh = window.innerHeight * 0.01
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`)
        document.getElementById('vid')?.play()
    }, [])

    const createLocationBody = result => {
        const sourceId = 'SourceId_' + Math.random()
        const titleSourceId = 'TitleSourceId_' + Math.random()
        const placeNameArr = result.place_name.split(',')
        const newTitle = placeNameArr[0]

        return {
            location: result.geometry.coordinates,
            sourceId: sourceId,
            titleSourceId: titleSourceId,
            title: newTitle,
            titleLabel: newTitle,
            titleLabelDisplayed: true,
            modeOfTransport: MODE_OF_TRANSPORT.driving,
            titleLocation: result.geometry.coordinates
        }
    }

    const addTripLocation = (tripId, result) => {
        dispatch(
            addNewLocationDraggable({
                body: createLocationBody(result),
                tripId: tripId,
                reverse: false
            })
        )
    }

    const updateTripLocation = (e, id, index) => {
        dispatch(updateLocation({ ...createLocationBody(e), id: id, index: index }))
    }

    const updateTitleSubtitle = (e1, e2) => {
        const { title, subtitle } = getNewTitleSubtitle(e1, e2)
        dispatch(setNewTitle(title))
        dispatch(setNewSubtitle(subtitle))
    }

    const setResultFromLocation = e => {
        if (!fromLocation) {
            setFromLocation(e)
            dispatch(removeAllJourneys())
            dispatch(setMapBboxAction([]))
            addTripLocation('trip-1', e)
            updateTitleSubtitle(e)
            // dispatch(setMapCoordinatesAction([e.center[0], e.center[1]]))
        } else {
            updateTripLocation(e, 'location-1', 1)
            updateTitleSubtitle(e)
        }
    }

    const setResultToLocation = e => {
        if (!toLocation) {
            setToLocation(e.place_name)
            addTripLocation('trip-1', e)
            updateTitleSubtitle(fromLocation, e)
        } else {
            updateTripLocation(e, 'location-2', 2)
            updateTitleSubtitle(fromLocation, e)
        }
    }

    const secondLocation = journeysDragable?.locations['location-2']

    return (
        <SectionContainer>
            <ContainerBox headerHeight={headerHeight}>
                <Box sx={styles.carouselBox}>
                    <LandingCarouselWrap id="carousel_wrapper">
                        {/* {!isMobile && !isSafari && (
                            <StyledVideo
                                muted
                                id="vid"
                                width="100%"
                                height="100%"
                                autoplay
                                playsinline
                                // controls="true"
                                loop
                                poster={displayPNG ? '/video_fallback.png' : '/video_fallback.webp'}
                            >
                                <source
                                    src="/mobile_landing_short_low_quality.mp4"
                                    type="video/mp4"
                                    media="all and (max-width: 480px)"
                                />
                                Your browser does not support the video tag.
                            </StyledVideo>
                        )} */}

                        {/* {(isMobile || isSafari) && ( */}
                        <>
                            {!IS_CLIENT && (
                                <>
                                    <StyledTestImage
                                        src={
                                            displayPNG
                                                ? 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516535/assets/new_japan_yq1gcm.png'
                                                : 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516692/assets/new_japan_ubkxmy.webp'
                                        }
                                    />
                                </>
                            )}

                            {/* <Carousel
                                autoplay={true}
                                cellAlign="center"
                                heightMode="max"
                                autoplayInterval={2500}
                                // heightMode={current}
                                initialSlideHeight={0}
                                // frameOverflow="visible"
                                // withoutControls
                                pauseOnHover={false}
                                wrapAround
                                swiping
                                defaultControlsConfig={{ containerClassName: 'nukaCarouserContainer' }}
                                renderCenterLeftControls={() => null}
                                renderCenterRightControls={() => null}
                                // style={{ height: IS_CLIENT ? 0 : 'inherit' }}
                            >
                                <img
                                    src={
                                        displayPNG
                                            ? 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659053297/assets/2_uviwc9.png'
                                            : 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659052989/assets/2_w1nh1j.webp'
                                    }
                                />
                                <img
                                    src={
                                        displayPNG
                                            ? 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659053297/assets/3_pnme0a.png'
                                            : 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659052989/assets/3_yuo2x8.webp'
                                    }
                                    loading="lazy"
                                />
                                <img
                                    src={
                                        displayPNG
                                            ? 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659053297/assets/5_hkwd2x.png'
                                            : 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659052989/assets/5_phvfaq.webp'
                                    }
                                    loading="lazy"
                                />
                                <img
                                    src={
                                        displayPNG
                                            ? 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659053297/assets/4_hhpxi5.png'
                                            : 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659052989/assets/4_r0mbcs.webp'
                                    }
                                    loading="lazy"
                                />
                            </Carousel> */}

                            <Carousel
                                autoplay={true}
                                cellAlign="center"
                                autoplayInterval={2500}
                                // heightMode="max"
                                // heightMode={current}
                                // initialSlideHeight={10}
                                // frameOverflow="visible"
                                withoutControls
                                pauseOnHover={false}
                                wrapAround
                                swiping
                                renderCenterLeftControls={() => null}
                                renderCenterRightControls={() => null}
                            >
                                <img
                                    src={
                                        displayPNG
                                            ? 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516536/assets/new_germany_lif81o.png'
                                            : 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516691/assets/new_germany_fpuvo4.webp'
                                    }
                                    loading="lazy"
                                />

                                <img
                                    src={
                                        displayPNG
                                            ? 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516535/assets/new_japan_yq1gcm.png'
                                            : 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516692/assets/new_japan_ubkxmy.webp'
                                    }
                                    loading="lazy"
                                />

                                <img
                                    src={
                                        displayPNG
                                            ? 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516536/assets/italy_white_cl8pgw.png'
                                            : 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516691/assets/italy_white_qfszgs.webp'
                                    }
                                    loading="lazy"
                                />

                                <img
                                    src={
                                        displayPNG
                                            ? 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516536/assets/usa_east_cwkc48.png'
                                            : 'https://res.cloudinary.com/dkyt8girl/image/upload/v1659516692/assets/usa_east_uyf7il.webp'
                                    }
                                    loading="lazy"
                                />

                                {/* {displayPNG ? <GalleryImg src={GermanyPNG} /> : <GalleryImg src={GermanyPNG} />}
                                {displayPNG ? <GalleryImg src={JapanPNG} /> : <GalleryImg src={JapanPNG} />}
                                {displayPNG ? <GalleryImg src={ItalyWhitePNG} /> : <GalleryImg src={ItalyWhitePNG} />}
                                {displayPNG ? <GalleryImg src={USA_east} /> : <GalleryImg src={USA_east} />} */}
                            </Carousel>

                            <ZeroHeightWrap>
                                <motion.div
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    initial={{ opacity: 0 }}
                                >
                                    <ScrollDownWrapper maxHeightTop={headerHeight + carouselHeight} id="pure_cta_box">
                                        <ScrollAnimatedIcon />
                                    </ScrollDownWrapper>
                                </motion.div>
                            </ZeroHeightWrap>
                        </>
                    </LandingCarouselWrap>
                </Box>

                <Box sx={styles.contentBox}>
                    <BoxWrapper>
                        <Title>{t('landingPage.title')}</Title>

                        <Subtitle>Starting location:</Subtitle>
                        <Row>
                            <GeocoderInput
                                style={{
                                    // display: "inline",
                                    flex: 1,
                                    borderLeft: '1px solid lightGrey',
                                    borderRight: '1px solid lightGrey'
                                    // zIndex: activeLocationId === location.id ? 10 : 1
                                }}
                                setResult={e => {
                                    setResultFromLocation(e)
                                }}
                                clearAfterResult={false}
                                // onClick={() => {
                                //     setActiveLocationId(location.id)
                                // }}
                                // map={map}
                                placeholder={'Paris, France...'}
                            />
                        </Row>
                        {fromLocation && (
                            <>
                                <Subtitle>Destination:</Subtitle>
                                <Row>
                                    <GeocoderInput
                                        style={{
                                            flex: 1,
                                            borderLeft: '1px solid lightGrey',
                                            borderRight: '1px solid lightGrey'
                                        }}
                                        setResult={e => {
                                            setResultToLocation(e)
                                        }}
                                        clearAfterResult={false}
                                        // onClick={() => {
                                        //     setActiveLocationId(location.id)
                                        // }}
                                        // map={map}
                                        placeholder={'Madrid, Spain...'}
                                    />
                                </Row>
                            </>
                        )}
                        {toLocation && (
                            <>
                                <Subtitle>Mode of transport:</Subtitle>
                                <Row>
                                    <ModeOfTransportSelect location={secondLocation} />
                                </Row>
                            </>
                        )}
                        {/* <CtaBtn> See result </CtaBtn> */}
                        {fromLocation && <CtaComponent />}
                    </BoxWrapper>
                    {/* </Box> */}

                    {/* <Box sx={styles.ctaOnlyLarge}>
                        <CtaComponent />
                    </Box> */}
                    {/* </Grid> */}
                </Box>
            </ContainerBox>
        </SectionContainer>
    )
}

function CtaComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { locale } = router
    const dispatch = useDispatch()

    const t = useTranslation()

    useEffect(() => {
        setIsLoading(false)

        let options = {
            rootMargin: '0px',
            threshold: 1.0,
            trackVisibility: true,
            delay: 100
        }

        let observer = new IntersectionObserver(e => {
            console.log('visible??', e)
        }, options)

        let target = document.getElementById('link_studio_id')

        if (target) {
            observer.observe(target)
        }
    }, [])

    const onClick = () => {
        if (!isLoading) {
            setIsLoading(true)
            dispatch(setActiveStepNumber(0))
            router.push('/studio')
        }
    }
    return (
        <CtaBtn onClick={onClick} isLoading={isLoading}>
            <StyledText>
                {t('landingPage.cta', {
                    value: (
                        <span>
                            {locale === 'cs' ? 'Ukázat' : 'See'}&nbsp;
                            {locale === 'cs' ? 'Návrh' : 'Design'}
                        </span>
                    )
                })}
                {isLoading && <UnderlineLoader />}
            </StyledText>
        </CtaBtn>
    )
}

const GalleryImg = ({ src }) => {
    return <StyledImg src={src} loading="lazy" />
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
    /* align-items: stretch; */
`

const StyledImg = styled.img`
    max-height: 500px;
    object-fit: contain;
`

const SectionContainer = styled.section`
    position: relative;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), ${`url(${BG_langing})`};
    background-size: auto 100%;
    padding-top: 5%;

    ${mobile`
        padding-top: 10%;
        height: 100vh;
        max-height: 1000px;
    `};
`

const BoxWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.2);
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 5px;
    border-radius: 5px;
    margin: 20px 0;
`

const StyledTestImage = styled.img`
    width: 100%;
`

const Title = styled.h1`
    color: white;
    font-weight: 400;
    margin: 0;
`

const Subtitle = styled.h5`
    color: white;
    margin: 0;
    margin-top: 10px;
    margin-bottom: -5px;
    font-weight: 500;
`

const StyledText = styled.p`
    display: inline-block;
    margin: 0;
    transform: translateX(0);
    font-weight: ${fontWeight('bold')};
`

const ZeroHeightWrap = styled.div`
    height: 0;
`

const ScrollDownWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    position: relative;
    top: -170px;
    z-index: 90;

    ${mobile`
        display: none;
    `}
`

const LandingCarouselWrap = styled.div`
    width: 100%;

    ${mobile`
    max-height: 80vh;
  `}
`

const CtaBtn = styled(Button)`
    pointer-events: all;
    background-color: rgb(239, 17, 67);
    color: white;
    font-size: 1rem !important;
    font-weight: 400;
    letter-spacing: 1.5px;
    /* width: 50%; */
    border-radius: 2px;
    margin: 15px 0;
`

const ContainerBox = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 0 !important;

    ${mobile`
    height: ${({ headerHeight }) => (headerHeight ? `calc(100vh - ${headerHeight}px - 30px)` : '80vh')};
    flex-Direction: row;
  `};
`

const styles = {
    onlyMobile: {
        display: ['block', null, null, 'none']
    },
    carouselBox: {
        width: ['100%', '100%', '100%', 450, 450, 570],
        height: ['unset', null, null, '100%'], //"100vh"
        // pl: [0, 0, 0, 5, 7, 95],
        // pr: [0, 0, 0, 5, null, 75, 95],
        pt: [6, null, 0],
        order: [0, null, null, 0],
        cursor: 'default',
        display: 'flex',
        alignItems: 'center'
    },
    contentBox: {
        width: ['100%', 450, 350, 350, 500, 570],
        pt: [2, null, 0],
        pr: [2, null, 'auto', null, null],
        pl: [2, null, 'auto', null, null],
        flexShrink: 0,
        display: ['block']
    },
    headingTop: {
        pl: [0, null, null, null, '35px', null, '55px', 6],
        px: [2, null, null, 'unset'],
        mb: [3, null, null, null, 1],
        textAlign: ['center', null, null, 'left']
    },
    gridCards: {
        p: ['0 0px 35px', null, null, null, '0 20px 40px', null, '0 40px 40px', 0]
    },
    card: {
        display: 'flex',
        alignItems: 'flex-start',
        p: ['0 17px 20px', null, null, '0 0 20px', '20px 15px 17px', null, null, '25px 30px 23px'],
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: '10px',
        transition: 'all 0.3s',
        width: ['100%', '85%', null, '100%'],
        mx: 'auto'
    },

    ctaOnlyLarge: {
        display: ['flex', null, null, 'flex'],
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '40px'
    },

    ctaLink: {
        cursor: 'pointer',
        display: 'flex',
        justify: 'center'
    },

    img: {
        width: ['50px', null, '55px'],
        height: 'auto',
        flexShrink: 0,
        mr: [3, 4]
    },
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        mt: '-5px',
        title: {
            fontSize: 3,
            color: 'za',
            lineHeight: 1.4,
            fontWeight: 700,
            mb: [2, null, null, null, 3]
        },

        subTitle: {
            fontSize: 1,
            fontWeight: 400,
            lineHeight: [1.85, null, 2]
        }
    }
}
