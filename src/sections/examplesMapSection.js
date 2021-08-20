/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Flex, Box, Heading, Text, Image, Button } from "theme-ui";
import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "nuka-carousel";
import { useRouter } from "next/router";
import ModalVideo from "react-modal-video";
import { Link } from "components/link";
import { FaPlayCircle } from "react-icons/fa";

import CarouselJapanPNG from "assets/mapExamples/Japan_karaoke.png";
import CarouselNYWhitePNG from "assets/mapExamples/NY_white.png";
import CarouselRioCopacabanaPNG from "assets/mapExamples/Rio_copacabana.png";
import CarouselHKDragonPNG from "assets/mapExamples/HK_Dragons_back.png";
import CarouselSFAlcatrazPNG from "assets/mapExamples/San_francisco_alcatraz.png";
import CarouselSydneyPNG from "assets/mapExamples/Sydney_surfing.png";

import { fontSize, mobile } from "utils";

export default function Examples() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    setVideoOpen(true);
  };

  return (
    <section sx={styles.banner} id="home">
      <Container sx={styles.banner.container}>
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
            <img src={CarouselRioCopacabanaPNG} />
            <img src={CarouselJapanPNG} id="carousel_img_photo_0" />
            <img src={CarouselSydneyPNG} />
            <img src={CarouselSFAlcatrazPNG} />
            <img src={CarouselHKDragonPNG} />
          </Carousel>
        </CarouselWrap>
        <Box sx={styles.banner.contentBox}>
          <StyledHeading>Zvěčni si své dobrodružství</StyledHeading>
          <Text as="p" variant="heroSecondary">
            Připoměňte si neopakovatelné okamžiky vašeho života a vytvořte si
            osobitou mapu.
          </Text>
          <Flex>
            <Button
              variant="whiteButton"
              onClick={() => {
                router.push("/studio");
              }}
              aria-label="Get Started"
            >
              do studia
            </Button>
            <>
              <ModalVideo
                channel="youtube"
                isOpen={videoOpen}
                videoId="ZNA9rmDsYVE"
                onClose={() => setVideoOpen(false)}
              />
              <Button
                variant="textButton"
                aria-label="Watch Video"
                onClick={handleClick}
              >
                {/* <FaPlayCircle /> */}
              </Button>
            </>
          </Flex>
        </Box>
      </Container>
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
    container: {
      display: "flex",
      flexDirection: ["column", null, null, "row"],
    },
    contentBox: {
      width: ["100%", null, "85%", "55%", "50%", "55%"],
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
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

const CarouselWrap = styled.div`
  width: 100%;
  margin-bottom: 20px;

  ${mobile`
    margin-bottom: 0px;
  `}
`;
