/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Flex, Box, Heading, Text, Image, Button } from "theme-ui";
import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import { useRouter } from "next/router";

import { useDisplayPNG } from "Hooks/useDisplayPNG";
import { fontSize, mobile } from "utils";

import CarouselSanFrancisco from "assets/mapExamples/static_san_francisco.png";
import CarouselSanFranciscoWebp from "assets/mapExamples/static_san_francisco.webp";

import CarouselItaly from "assets/mapExamples/static_italy.png";
import CarouselItalyWebp from "assets/mapExamples/static_italy.webp";

import CarouselManhattanBikeBlack from "assets/mapExamples/static_manhattan_bike_black.png";
import CarouselManhattanBlackWebp from "assets/mapExamples/static_manhattan_black.webp";

import CarouselManhattan from "assets/mapExamples/static_manhattan.png";
import CarouselManhattanPaleWebp from "assets/mapExamples/static_manhattan_pale.webp";

import CarouselGreeceWebp from "assets/mapExamples/static_greece.webp";
import CarouselGreece from "assets/mapExamples/static_greece.png";

import CarouselPrague from "assets/mapExamples/static_prague.png";
import CarouselPragueWebp from "assets/mapExamples/static_prague.webp";

import CarouselRioWebp from "assets/mapExamples/static_rio.webp";
import CarouselRio from "assets/mapExamples/static_rio.png";

export default function Examples() {
  const router = useRouter();
  const { displayPNG } = useDisplayPNG();

  return (
    <section sx={styles.banner} id="home">
      <StyledContainer>
        <CarouselWrap>
          <Carousel
            autoplay={true}
            cellAlign="center"
            heightMode="max"
            // heightMode={current}
            initialSlideHeight={90}
            // frameOverflow="visible"
            withoutControls
            wrapAround
            swiping
            renderCenterLeftControls={() => null}
            renderCenterRightControls={() => null}
          >
            {displayPNG ? (
              <>
                <img src={CarouselSanFrancisco} />
              </>
            ) : (
              <>
                <img src={CarouselSanFranciscoWebp} />
              </>
            )}

            {displayPNG ? (
              <img src={CarouselItaly} />
            ) : (
              <img src={CarouselItalyWebp} />
            )}

            {displayPNG ? (
              <img src={CarouselManhattanBikeBlack} />
            ) : (
              <img src={CarouselManhattanBlackWebp} />
            )}

            {displayPNG ? (
              <img src={CarouselRio} />
            ) : (
              <img src={CarouselRioWebp} />
            )}

            {displayPNG ? (
              <img src={CarouselManhattan} />
            ) : (
              <img src={CarouselManhattanPaleWebp} />
            )}

            {displayPNG ? (
              <img src={CarouselGreece} />
            ) : (
              <img src={CarouselGreeceWebp} />
            )}

            {displayPNG ? (
              <img src={CarouselPrague} />
            ) : (
              <img src={CarouselPragueWebp} />
            )}
          </Carousel>
        </CarouselWrap>
        <Box sx={styles.banner.contentBox}>
          <StyledHeading>Zvěčni si své dobrodružství</StyledHeading>
          <Text as="p" variant="heroSecondary">
            Připoměňte si neopakovatelné okamžiky vašeho života a vytvořte si
            osobitou mapu.
          </Text>
          <Button
            variant="whiteButton"
            onClick={() => {
              router.push("/studio");
            }}
            aria-label="Get Started"
          >
            Začít navrhovat
          </Button>
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

const CarouselWrap = styled.div`
  width: 100%;
  margin-bottom: 0px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${mobile`
    flex-direction: row;
  `}
`;
