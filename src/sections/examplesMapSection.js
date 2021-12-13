/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Flex, Box, Heading, Text, Image, Button } from "theme-ui";
import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import { useRouter } from "next/router";
import CarouselManhattanBikeBlack from "assets/mapExamples/static_manhattan_bike_black.png";
import CarouselGreece from "assets/mapExamples/static_greece.png";
import CarouselItaly from "assets/mapExamples/static_italy.png";
import CarouselManhattanBike from "assets/mapExamples/static_manhattan_bike.png";
import CarouselManhattan from "assets/mapExamples/static_manhattan.png";
import CarouselPrague from "assets/mapExamples/static_prague.png";
import CarouselRio from "assets/mapExamples/static_rio.png";
import CarouselSanFrancisco from "assets/mapExamples/static_san_francisco.png";

import { fontSize, mobile } from "utils";

export default function Examples() {
  const router = useRouter();

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
            <img src={CarouselGreece} />
            <img src={CarouselSanFrancisco} />
            <img src={CarouselManhattanBike} id="carousel_img_photo_0" />
            <img src={CarouselItaly} />
            <img src={CarouselManhattanBike} />
            <img src={CarouselRio} />
            <img src={CarouselManhattan} />
            <img src={CarouselPrague} />
            <img src={CarouselManhattanBikeBlack} />
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
