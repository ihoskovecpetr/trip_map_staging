/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, Container, Box, Grid, Text, Heading } from "theme-ui";
import Link from "next/link";
import TextFeature from "components/text-feature";
import Image from "components/image";
import Carousel from "nuka-carousel";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import Briefcase from "assets/landing-page/briefcaseBlack.svg";
import Secure from "assets/landing-page/secureBlack.svg";
import UnderlineLoader from "components/UnderlineLoader";
import Button from "components/Button";
import ScrollAnimatedIcon from "components/ScrolAnimatedIcon";
import { useElementDimensions } from "Hooks/useElementDimensions";
import { useIsMobile } from "Hooks/useIsMobile";
import { useDisplayPNG } from "Hooks/useDisplayPNG";
import { mobile, color } from "utils";

import Carousel1 from "assets/landing-page/webp/1.webp";
import Carousel2 from "assets/landing-page/webp/2.webp";
import Carousel3 from "assets/landing-page/webp/3.webp";
import Carousel4 from "assets/landing-page/webp/4.webp";
import Carousel5 from "assets/landing-page/webp/5.webp";
import Carousel6 from "assets/landing-page/webp/6.webp";
import Carousel7 from "assets/landing-page/webp/7.webp";
import Carousel8 from "assets/landing-page/webp/8.webp";

import Carousel1PNG from "assets/landing-page/png/1.png";
import Carousel2PNG from "assets/landing-page/png/2.png";
import Carousel3PNG from "assets/landing-page/png/3.png";
import Carousel4PNG from "assets/landing-page/png/4.png";
import Carousel5PNG from "assets/landing-page/png/5.png";
import Carousel6PNG from "assets/landing-page/png/6.jpg";
import Carousel7PNG from "assets/landing-page/png/7.png";
import Carousel8PNG from "assets/landing-page/png/8.png";

const data = {
  subTitle: "",
  title: "Vytvořte si stylovou památku na cesty", //"Vytvořte si stylovou mapu na památku", // "Vytvořte si stylovou vzpomínku na cesty",  "Vytvořte si vlastní mapu na vzpomínku",
  features: [
    {
      id: 1,
      imgSrc: Briefcase,
      altText: "Vlastní design",
      title: "Vlastní design",
      text:
        "V našem online studiu si můžete připravit mapu dle vlastních preferencí",
    },
    {
      id: 2,
      imgSrc: Secure,
      altText: "Vlastní zpracování",
      title: "Vlastní zpracování",
      text:
        "Přejete si zpracování s rámem či bez rámu? Žádný problém, jsme připraveni!",
    },
  ],
};

export default function LandingPage() {
  const { height: headerHeight } = useElementDimensions("header");
  const { height: carouselHeight } = useElementDimensions("carousel_wrapper");
  const { isMobile } = useIsMobile();
  const { displayPNG } = useDisplayPNG();

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.getElementById("vid")?.play();
  }, []);

  return (
    <section sx={styles.sectionContainer}>
      <Container sx={styles.containerBox}>
        <Box sx={styles.carouselBox}>
          <LandingCarousel id="carousel_wrapper">
            {!isMobile && (
              <StyledVideo
                muted
                id="vid"
                width="100%"
                height="100%"
                autoplay
                playsinline
                loop
                poster={
                  displayPNG ? "/video_fallback.png" : "/video_fallback.webp"
                }
              >
                <source
                  src="/mobile_landing_short_2_ORIGINAL_compressed.mp4"
                  type="video/mp4"
                  media="all and (max-width: 480px)"
                />
                Your browser does not support the video tag.
              </StyledVideo>
            )}

            {isMobile && (
              <>
                <Carousel
                  autoplay={true}
                  cellAlign="center"
                  heightMode="max"
                  autoplayInterval={3000}
                  // heightMode={current}
                  initialSlideHeight={90}
                  // frameOverflow="visible"
                  // withoutControls
                  wrapAround
                  swiping
                  renderCenterLeftControls={() => null}
                  renderCenterRightControls={() => null}
                >
                  <img src={displayPNG ? Carousel1PNG : Carousel1} />
                  <img src={displayPNG ? Carousel2PNG : Carousel2} />
                  <img src={displayPNG ? Carousel5PNG : Carousel5} />
                  <img src={displayPNG ? Carousel6PNG : Carousel6} />
                  <img src={displayPNG ? Carousel3PNG : Carousel3} />
                  <img src={displayPNG ? Carousel4PNG : Carousel4} />
                  <img src={displayPNG ? Carousel7PNG : Carousel7} />
                  <img src={displayPNG ? Carousel8PNG : Carousel8} />
                </Carousel>
                <ZeroHeightWrap>
                  <motion.div
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    initial={{ opacity: 0 }}
                  >
                    <PureCtaBox
                      maxHeightTop={headerHeight + carouselHeight}
                      id="pure_cta_box"
                    >
                      <ScrollAnimatedIcon />
                      {/* <CtaComponent /> */}
                    </PureCtaBox>
                  </motion.div>
                </ZeroHeightWrap>
              </>
            )}
          </LandingCarousel>
        </Box>

        <Box sx={styles.contentBox}>
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0 }}
            initial={{ opacity: 0 }}
          >
            <Box sx={styles.headingTop}>
              <TextFeature subTitle={data.subTitle} title={data.title} />
            </Box>
          </motion.div>

          <Grid gap="15px 0" columns={1} sx={styles.gridCards}>
            {data.features.map((item, index) => (
              <motion.div
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: (index + 1) * 0.6 }}
                initial={{ opacity: 0 }}
              >
                <Box sx={styles.card} key={item.id}>
                  <Image src={item.imgSrc} alt={item.altText} sx={styles.img} />

                  <Box sx={styles.wrapper}>
                    <div sx={styles.wrapper.title}>{item.title}</div>
                    <Text sx={styles.wrapper.subTitle}>{item.text}</Text>
                  </Box>
                </Box>
              </motion.div>
            ))}

            <motion.div
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              initial={{ opacity: 0 }}
            >
              <Box sx={styles.ctaOnlyLarge}>
                <CtaComponent />
              </Box>
            </motion.div>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}

function CtaComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);

    let options = {
      rootMargin: "0px",
      threshold: 1.0,
      trackVisibility: true,
      delay: 100,
    };

    let observer = new IntersectionObserver((e) => {
      console.log("visible??", e);
    }, options);

    let target = document.getElementById("link_studio_id");

    if (target) {
      observer.observe(target);
    }
  }, []);

  const onClick = () => {
    if (!isLoading) {
      setIsLoading(true);
      router.push("/studio");
    }
  };
  return (
    <CtaBtn onClick={onClick} isLoading={isLoading}>
      <StyledText>
        Začít navrhovat {isLoading && <UnderlineLoader />}
      </StyledText>
    </CtaBtn>
  );
}

const StyledVideo = styled.video`
  height: 100%;
`;

const StyledText = styled.p`
  display: inline-block;
  margin: 0;
  transform: translateX(0);
`;

const ZeroHeightWrap = styled.div`
  height: 0;
`;

const PureCtaBox = styled.div`
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
`;

const LandingCarousel = styled.div`
  width: 100%;
  min-height: 70vh;

  ${mobile`
    max-height: 80vh;
  `}
`;

const CtaBtn = styled(Button)`
  pointer-events: all;
  background-color: rgb(239, 17, 67);
  color: white;
  font-size: 1rem !important;
  font-weight: 400;
  letter-spacing: 1.5px;
  width: 50%;
  border-radius: 10px;
`;

const styles = {
  sectionContainer: {
    py: [null, null, null, 5, null, 6],
    pt: [8, null, null, "unset"],
    position: "relative",
    height: ["unset", null, null, "100vh"],
    maxHeight: [null, null, null, "1000px"],
  },
  onlyMobile: {
    display: ["block", null, null, "none"],
  },
  containerBox: {
    p: [0, 0],
    display: "flex",
    height: ["unset", null, null, "100%"],
    alignItems: ["center"],
    justifyContent: ["space-around"], //"space-between"
    flexDirection: ["column", null, null, "row"],
  },
  carouselBox: {
    width: ["100%", "100%", "100%", 450, 450, 570],
    height: ["unset", null, null, "100%"], //"100vh"
    pl: [0, 0, 0, 5, 7, 95],
    pr: [0, 0, 0, 5, null, 75, 95],
    order: [0, null, null, 0],
    cursor: "default",
    display: "flex",
    alignItems: "center",
  },
  contentBox: {
    width: ["100%", 450, 350, 350, 500, 570],
    pt: [7, null, 0],
    pr: [0, null, "auto", null, null, 80],
    pl: "auto",
    flexShrink: 0,
    display: ["block"],
  },
  headingTop: {
    pl: [0, null, null, null, "35px", null, "55px", 6],
    px: [2, null, null, "unset"],
    mb: [3, null, null, null, 1],
    textAlign: ["center", null, null, "left"],
  },
  gridCards: {
    p: ["0 0px 35px", null, null, null, "0 20px 40px", null, "0 40px 40px", 0],
  },
  card: {
    display: "flex",
    alignItems: "flex-start",
    p: [
      "0 17px 20px",
      null,
      null,
      "0 0 20px",
      "20px 15px 17px",
      null,
      null,
      "25px 30px 23px",
    ],
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: "10px",
    transition: "all 0.3s",
    width: ["100%", "85%", null, "100%"],
    mx: "auto",
  },

  ctaOnlyLarge: {
    display: ["flex", null, null, "flex"],
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "40px",
  },

  ctaLink: {
    cursor: "pointer",
    display: "flex",
    justify: "center",
  },

  img: {
    width: ["50px", null, "55px"],
    height: "auto",
    flexShrink: 0,
    mr: [3, 4],
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    mt: "-5px",
    title: {
      fontSize: 3,
      color: "heading_secondary",
      lineHeight: 1.4,
      fontWeight: 700,
      mb: [2, null, null, null, 3],
    },

    subTitle: {
      fontSize: 1,
      fontWeight: 400,
      lineHeight: [1.85, null, 2],
    },
  },
};
