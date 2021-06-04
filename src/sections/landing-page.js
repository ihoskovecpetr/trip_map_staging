/** @jsx jsx */
import { jsx, Container, Box, Grid, Text, Heading, Button } from "theme-ui";
import Link from "next/link";
import TextFeature from "components/text-feature";
import Image from "components/image";
import Carousel from "nuka-carousel";

import LandingPagePicture from "assets/landing-page/landing_page_bg_double.png";
import LandingPageBg from "assets/landing-page/landing_photo_bg.png";
import InterierFlowers from "assets/landing-page/interier_flowers.webp";
import InterierBlack from "assets/landing-page/interier_black.webp";
import FramedPicture from "assets/landing-page/FramedPicture.webp";
import FramedPictureBack from "assets/landing-page/FramedPicBack.webp";

import Briefcase from "assets/landing-page/briefcase.svg";
import Secure from "assets/landing-page/secure.svg";

const data = {
  subTitle: "",
  title: "Vytvořte si stylovou mapu na památku", // "Vytvořte si stylovou vzpomínku na cesty",  "Vytvořte si vlastní mapu na vzpomínku",
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
  return (
    <section sx={styles.sectionContainer}>
      <div sx={styles.backgroundDiv} />
      <Box sx={styles.pureCtaBox}>
        <Cta />
      </Box>
      <Container sx={styles.containerBox}>
        <Box sx={styles.thumbnail}>
          {/* <Image
            sx={styles.landingImage}
            src={LandingPagePicture}
            alt="Thumbnail"
          /> */}
          <div sx={styles.landingCarousel}>
            <Carousel
              autoplay={true}
              cellAlign="center"
              heightMode="max"
              // heightMode={current}
              initialSlideHeight={90}
              // frameOverflow="visible"
              // withoutControls
              wrapAround
              swiping
              renderCenterLeftControls={() => null}
              renderCenterRightControls={() => null}
            >
              <img src={InterierBlack} />
              <img src={FramedPicture} />
              <img src={FramedPictureBack} />

              {/* <img src={LandingPagePicture} />
              <img src={LandingPageBg} />
              <img src={InterierFlowers} /> */}
            </Carousel>
          </div>
        </Box>

        <Box sx={styles.contentBox}>
          <Box sx={styles.headingTop}>
            <TextFeature subTitle={data.subTitle} title={data.title} />
          </Box>

          <Grid gap="15px 0" columns={1} sx={styles.gridCards}>
            {data.features.map((item) => (
              <Box sx={styles.card} key={item.id}>
                <Image src={item.imgSrc} alt={item.altText} sx={styles.img} />

                <Box sx={styles.wrapper}>
                  <Heading sx={styles.wrapper.title}>{item.title}</Heading>
                  <Text sx={styles.wrapper.subTitle}>{item.text}</Text>
                </Box>
              </Box>
            ))}
            <Box sx={styles.ctaOnlyLarge}>
              <Cta />
            </Box>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}

function Cta() {
  return (
    <Box sx={styles.ctaBox}>
      <Link href={"/studio"} sx={styles.cta} variant="default">
        <Button variant="primary" sx={styles.btn} aria-label={"btnName"}>
          ZAČNI TVOŘIT
        </Button>
      </Link>
    </Box>
  );
}

const styles = {
  sectionContainer: {
    py: [null, null, 9, null, null, 10],
    // pt: [8, null],
    // pointerEvents: "none",
    position: "relative",
    "&::before": {
      position: "absolute",
      content: '""',
      top: ["auto", null, null, "50%"],
      bottom: ["100px", 0, null, "auto"],
      left: 0,
      background: "linear-gradient(-157deg, #F6FAFD, #F9FCFC, #FCFDFC)",
      height: [350, 550, "60%"],
      width: "50%",
      zIndex: -1,
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
      transform: ["translateY(0)", null, null, "translateY(-50%)"],
    },

    // backgroundImage: [`url(${LandingPageBg})`, null, `none`],
    // backgroundRepeat: "no-repeat",
    // backgroundSize: ["100% auto", "cover"],
    // boxShadow: ["inset 0 0 0 2000px rgba(255, 255, 255, 0.1)", null, "unset"],
    // backgroundOrigin: "content-box",
  },
  backgroundDiv: {
    height: ["100vh", "100vh", "unset"],
    pt: [7, null],
    width: "100%",
    zIndex: -1,
    position: "absolute",
    backgroundImage: [`url(${LandingPagePicture})`, null, `none`],
    backgroundRepeat: "no-repeat",
    backgroundSize: ["100% auto", "cover"],
    boxShadow: ["inset 0 0 0 2000px rgba(255, 255, 255, 0.1)", null, "unset"],
    backgroundOrigin: "content-box",
  },
  containerBox: {
    display: "flex",
    height: ["100%", "100%", "unset"],
    alignItems: ["center"],
    justifyContent: ["flex-end"], //"space-between"
    flexDirection: ["column", null, "row"],
  },
  thumbnail: {
    width: ["100%", 450, 350, 350, 500, 570],
    height: "100%",
    pl: [0, 5, 0, null, 7, 95],
    pr: [0, 5, null, null, null, 75, 95],
    order: [0, null, null, 0],
    display: ["none", null, "block"],
  },
  landingImage: {},
  landingCarousel: {
    width: "100%",
    height: "100%",
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
    // boxShadow: "4px 4px 8px rgba(69, 88, 157, 0.07)",
    mx: "auto",
    "&:hover": {
      boxShadow: [
        "0px 0px 0px rgba(0, 0, 0, 0)",
        null,
        null,
        null,
        "0px 8px 16px rgba(69, 88, 157, 0.07)",
      ],
    },
  },

  ctaOnlyLarge: {
    display: ["none", "none", "block", "block"],
  },

  pureCtaBox: {
    display: ["flex", "flex", "none"],
    justifyContent: "center",
    alignItems: "flex-end",
    flexWrap: "wrap",
    height: "100vh",
  },
  ctaBox: {
    // width: "100%",
    p: "2rem",
    marginBottom: "3rem",
    // display: "flex",
    // justifyContent: "center",
    // backgroundImage: ["none", "none", "none", "block"],
  },

  btn: {
    pointerEvents: "all",
    backgroundColor: "cta_color",
    fontSize: "1rem !important",
    p: "1rem 1.5rem",
    width: "100%",
    borderRadius: "10px",
  },

  cta: {
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
