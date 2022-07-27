/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import { Container, Flex, Box, Heading, Text, Image } from 'theme-ui'
import styled from 'styled-components'
import Carousel from 'nuka-carousel'
import { useRouter } from 'next/router'

import { useDisplayPNG } from 'Hooks/useDisplayPNG'
import { fontSize, mobile } from 'utils'
import UnderlineLoader from 'components/UnderlineLoader'
import Button from 'components/Button'
import { useIsMobile } from 'Hooks/useIsMobile'
import { useTranslation } from 'Hooks/useTranslation'

import CarouselHKpng from 'assets/mapExamples/new_hk.png'

import CarouselManhattanBikeBlack from 'assets/mapExamples/new_manhattan.png'

import JapanPNG from 'assets/mapExamples/new_japan.png'

import USAWatPNG from 'assets/mapExamples/new_usa.png'

import GermanyPNG from 'assets/mapExamples/new_germany.png'
import ItalyPNG from 'assets/mapExamples/new_italy.png'

export default function Examples() {
    const router = useRouter()
    const { displayPNG } = useDisplayPNG()
    const { isMobile } = useIsMobile()
    const t = useTranslation()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        <section sx={styles.banner} id="home">
            <StyledContainer>
                <CarouselWrap>
                    <StyledCarousel
                        autoplay={true}
                        cellAlign="center"
                        autoplayInterval={1200}
                        // heightMode="max"
                        // heightMode={current}
                        // initialSlideHeight={10}
                        // frameOverflow="visible"
                        withoutControls
                        wrapAround
                        swiping
                        renderCenterLeftControls={() => null}
                        renderCenterRightControls={() => null}
                    >
                        {displayPNG ? <GalleryImg src={CarouselHKpng} /> : <GalleryImg src={CarouselHKpng} />}
                        {displayPNG ? <GalleryImg src={USAWatPNG} /> : <GalleryImg src={USAWatPNG} />}
                        {displayPNG ? <GalleryImg src={JapanPNG} /> : <GalleryImg src={JapanPNG} />}
                        {displayPNG ? <GalleryImg src={GermanyPNG} /> : <GalleryImg src={GermanyPNG} />}
                        {displayPNG ? <GalleryImg src={ItalyPNG} /> : <GalleryImg src={ItalyPNG} />}

                        {displayPNG ? (
                            <GalleryImg src={CarouselManhattanBikeBlack} />
                        ) : (
                            <GalleryImg src={CarouselManhattanBikeBlack} />
                        )}

                        {/* {displayPNG ? (
              <GalleryImg src={CarouselRio} />
            ) : (
              <GalleryImg src={CarouselRioWebp} />
            )} */}
                    </StyledCarousel>
                </CarouselWrap>
                <Box sx={styles.banner.contentBox}>
                    <StyledHeading>{t('examples.title')}</StyledHeading>
                    <Text as="p" variant="heroSecondary">
                        {t('examples.subtitle')}
                    </Text>
                    <CtaBtn
                        onClick={() => {
                            setIsLoading(true)
                            router.push('/studio')
                        }}
                        aria-label="Get Started"
                    >
                        <StyledText>
                            {t('examples.cta')}
                            {isLoading && <UnderlineLoader />}
                        </StyledText>
                    </CtaBtn>
                </Box>
            </StyledContainer>
        </section>
    )
}

const GalleryImg = ({ src }) => {
    return <StyledImg src={src} loading="lazy" />
}

const styles = {
    banner: {
        overflow: ['hidden', 'initial', null, 'hidden'],
        // backgroundImage: `url(${BannerBG})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: 'top left',
        backgroundSize: 'cover',
        borderBottomRightRadius: [100, 150, null, null, null, 250],
        pt: ['150px', null, null, null, null, null, '140px', '130px'],
        pb: ['100px', null, null, '110px', null, 10, '150px'],
        backgroundColor: 'primary',
        contentBox: {
            width: ['100%', null, '70%', '35%', '30%', '30%'],
            display: 'flex',
            flexDirection: 'column',
            alignItems: ['center', null, null, 'flex-start'],
            flexShrink: 0,
            pt: [0, null, null, null, null, null, 5, 7]
        }
    }
}

const StyledHeading = styled.h2`
    color: white;
    line-height: 1.2;
    font-size: ${fontSize('xl')};
    font-weight: 700;
    margin-bottom: 10px;
`

const BtnWrap = styled.div`
    // display: flex;
`

const CtaBtn = styled(Button)`
    pointer-events: all;
    background-color: rgb(239, 17, 67);
    color: white;
    // font-size: 1rem !important;
    // font-weight: 400;
    // letter-spacing: 1.5px;
    // width: 50%;
    // border-radius: 10px;
`

const StyledText = styled.p`
    display: inline-block;
    margin: 0;
    transform: translateX(0);
`

const CarouselWrap = styled.div`
    width: 100%;
    margin-bottom: 0px;
    // max-height: 400px;
`

const StyledImg = styled.img`
    max-height: 500px;
    object-fit: contain;
`

const StyledCarousel = styled(Carousel)``

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${mobile`
    flex-direction: row;
  `}
`
