/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Box } from "theme-ui";
import TextFeature from "components/text-feature";
import Image from "components/image";
import { useTranslation } from "Hooks/useTranslation";

import PrintfulHIW from "assets/how-printful-works-3.svg";
// import PaymentPattern from "assets/payment-pattern.png";

const data = {
  subTitle: "print.subtitle",
  title: "print.title",
  description: "print.description",
  btnName: "print.btnName",
  btnURL: "https://www.printful.com/",
};

export default function PrintfulPrint() {
  const t = useTranslation();

  return (
    <section sx={{ variant: "section.securePayment" }}>
      <Box sx={styles.bgOverlay} />
      <Container sx={styles.containerBox}>
        <Box sx={styles.thumbnail}>
          <Image src={PrintfulHIW} alt={t(data.title)} />
        </Box>
        <Box sx={styles.contentBox}>
          <TextFeature
            subTitle={t(data.subTitle)}
            title={t(data.title)}
            description={t(data.description)}
            btnName={t(data.btnName)}
            btnURL={data.btnURL}
          />
        </Box>
      </Container>
    </section>
  );
}

const styles = {
  bgOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    zIndex: -1,
    width: [
      "100%",
      null,
      null,
      "calc(50% + 400px)",
      "calc(50% + 480px)",
      "calc(50% + 570px)",
      null,
      "calc(50% + 625px)",
    ],
    // backgroundImage: `url(${PaymentPattern})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: "top left",
    backgroundSize: "cover",
    transform: "rotate(180deg)",
  },
  containerBox: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: ["wrap", null, null, "nowrap"],
  },
  thumbnail: {
    mb: -2,
    ml: [null, null, null, null, 0],
    width: "100%",
    order: [2, null, null, 0],
    px: [6, null, 7, 0],
    "& > img": {
      width: "100%",
    },
  },
  contentBox: {
    width: ["100%", 420, 480, 380, 500, 570],
    mx: "auto",
    flexShrink: 0,
    textAlign: ["center", null, null, "left"],
    pt: [0, null, null, 4, "50px", null, 4, "80px"],
    pl: [0, null, null, 40, "90px"],
    pb: [7, null, null, 9],
    pr: [0, null, null, null, null, 6],
  },
};
