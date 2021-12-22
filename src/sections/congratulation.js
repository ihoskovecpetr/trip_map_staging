/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx } from "theme-ui";
import { Container, Box } from "theme-ui";
import axios from "axios";

import TextFeatureCongratulation from "components/text-feature-congratulation";
import Image from "components/image";
import PaymentThumb from "assets/congratulation.png";
// import PaymentPattern from "assets/payment-pattern.png";

const data = {
  subTitle: "Informace na závěr",
  title: "Vaše mapa je na cestě",
  description:
    "Platba proběhla úspěšně a v současnosti pracujeme na zhotovení výsledného produktu. Potvrzení o platbě a shrnutí objednávky obdržíte do několika sekund na email zadaný v předchozím kroku. Pokud si nás přejete dále kontaktovat, použijte prosím sessionID pro identifikaci objednávky. Jménem společnosti TripMap Vám děkuji a přeji příjemný den.",
  btnName: "Learn More",
  btnURL: "#",
};

export default function Congratulation() {
  const [sessionId, setSessionId] = useState(null);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSessionMissing, setIsSessionMissing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const sessionId = params.get("id");
    if (sessionId) {
      setSessionId(sessionId);
    } else {
    }
  }, []);

  return (
    <section sx={{ variant: "section.congratulation" }}>
      <Box sx={styles.bgOverlay} />
      <Container sx={styles.containerBox}>
        <Box sx={styles.thumbnail}>
          <Image src={PaymentThumb} alt={data.title} />
        </Box>
        <Box sx={styles.contentBox}>
          <TextFeatureCongratulation
            subTitle={data.subTitle}
            title={data.title}
            description={data.description}
            sessionId={sessionId}
          />
          {!sessionId && "sessionId is missing"}
        </Box>
      </Container>
    </section>
  );
}

const styles = {
  bgOverlay: {
    marginTop: "90px",
  },
  containerBox: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    flexWrap: ["wrap", null, null, "nowrap"],
  },
  thumbnail: {
    mb: 2,
    ml: [4, null, null, null, 0],
    order: [2, null, null, 0],
    pr: [null, null, 7, 0],
    display: "flex",
    alignItems: "center",
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
