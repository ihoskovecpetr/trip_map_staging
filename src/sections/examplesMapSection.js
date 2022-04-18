/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import { Container, Flex, Box, Heading, Text, Image } from "theme-ui";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import { useRouter } from "next/router";

import { useDisplayPNG } from "Hooks/useDisplayPNG";
import { fontSize, mobile } from "utils";
import UnderlineLoader from "components/UnderlineLoader";
import Button from "components/Button";
import { useIsMobile } from "Hooks/useIsMobile";
import { useTranslation } from "Hooks/useTranslation";

import CarouselSanFrancisco from "assets/mapExamples/static_san_francisco.png";
import CarouselSanFranciscoWebp from "assets/mapExamples/static_san_francisco.webp";

import CarouselManhattanBikeBlack from "assets/mapExamples/manhattan.png";
import CarouselManhattanBlackWebp from "assets/mapExamples/manhattan.webp";

import CarouselRioWebp from "assets/mapExamples/static_rio.webp";
import CarouselRio from "assets/mapExamples/static_rio.png";

import JapanPNG from "assets/mapExamples/japan_white_frame.png";
import JapanWebp from "assets/mapExamples/japan_white_frame.webp";

import USAWatPNG from "assets/mapExamples/usa_wat.png";
import USAWatWebp from "assets/mapExamples/usa_wat.webp";

import GermanyPNG from "assets/mapExamples/germany_trip.png";
import GermanyWebp from "assets/mapExamples/germany_trip.webp";

import RawGermanyWebp from "assets/mapRawExamples/germany.webp";
import RawGermany from "assets/mapRawExamples/germany.png";

const imagesArr = [
  {
    thumbnailHeight: 324,
    // thumbnaxilWidth: 550,
    src:
      "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/sf_sandy_nuyh5n.webp",
    thumbnail:
      "https://res.cloudinary.com/dkyt8girl/image/upload/h_600,c_scale/Finished%20Interiers/sf_sandy_nuyh5n.webp",
  },
];

export default function Examples() {
  const router = useRouter();
  const { displayPNG } = useDisplayPNG();
  const { isMobile } = useIsMobile();
  const t = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section sx={styles.banner} id="home">
      <StyledContainer>
        <CarouselWrap>
          <StyledCarousel
            autoplay={true}
            cellAlign="center"
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
            {displayPNG ? (
              <StyledImg src={CarouselSanFrancisco} />
            ) : (
              <StyledImg src={CarouselSanFranciscoWebp} />
            )}

            {displayPNG ? (
              <StyledImg src={USAWatPNG} />
            ) : (
              <StyledImg src={USAWatWebp} />
            )}
            {displayPNG ? (
              <StyledImg src={JapanPNG} />
            ) : (
              <StyledImg src={JapanWebp} />
            )}
            {displayPNG ? (
              <StyledImg src={GermanyPNG} />
            ) : (
              <StyledImg src={GermanyWebp} />
            )}

            {displayPNG ? (
              <StyledImg src={CarouselManhattanBikeBlack} />
            ) : (
              <StyledImg src={CarouselManhattanBlackWebp} />
            )}

            {displayPNG ? (
              <StyledImg src={CarouselRio} />
            ) : (
              <StyledImg src={CarouselRioWebp} />
            )}
          </StyledCarousel>
        </CarouselWrap>
        <Box sx={styles.banner.contentBox}>
          <StyledHeading>{t("examples.title")}</StyledHeading>
          <Text as="p" variant="heroSecondary">
            {t("examples.subtitle")}
          </Text>
          <CtaBtn
            onClick={() => {
              setIsLoading(true);
              router.push("/studio");
            }}
            aria-label="Get Started"
          >
            <StyledText>
              {t("examples.cta")}
              {isLoading && <UnderlineLoader />}
            </StyledText>
          </CtaBtn>
        </Box>
      </StyledContainer>
    </section>
  );
}

const styles = {
  banner: {
    overflow: ["hidden", "initial", null, "hidden"],
    // backgroundImage: `url(${BannerBG})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: "top left",
    backgroundSize: "cover",
    borderBottomRightRadius: [100, 150, null, null, null, 250],
    pt: ["150px", null, null, null, null, null, "140px", "130px"],
    pb: ["100px", null, null, "110px", null, 10, "150px"],
    backgroundColor: "primary",
    contentBox: {
      width: ["100%", null, "70%", "35%", "30%", "30%"],
      display: "flex",
      flexDirection: "column",
      alignItems: ["center", null, null, "flex-start"],
      flexShrink: 0,
      pt: [0, null, null, null, null, null, 5, 7],
    },
  },
};

const StyledHeading = styled.h2`
  color: white;
  line-height: 1.2;
  font-size: ${fontSize("xl")};
  font-weight: 700;
  margin-bottom: 10px;
`;

const BtnWrap = styled.div`
  // display: flex;
`;

const CtaBtn = styled(Button)`
  pointer-events: all;
  background-color: rgb(239, 17, 67);
  color: white;
  // font-size: 1rem !important;
  // font-weight: 400;
  // letter-spacing: 1.5px;
  // width: 50%;
  // border-radius: 10px;
`;

const StyledText = styled.p`
  display: inline-block;
  margin: 0;
  transform: translateX(0);
`;

const CarouselWrap = styled.div`
  width: 100%;
  margin-bottom: 0px;
  // max-height: 400px;
`;

const StyledImg = styled.img`
  max-height: 500px;
  object-fit: contain;
`;

const StyledCarousel = styled(Carousel)``;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${mobile`
    flex-direction: row;
  `}
`;
