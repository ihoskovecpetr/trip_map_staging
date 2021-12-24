/** @jsx jsx */
import { jsx, Box, Heading, Text, Button, Link } from "theme-ui";
import styled from "styled-components";
import { color, font, fontSize, fontWeight } from "utils";

export default function TextFeature({
  subTitle,
  title,
  description,
  sessionId,
  btnName,
  btnURL = "#",
}) {
  return (
    <Box sx={styles.card}>
      <Box sx={styles.wrapper}>
        <div as="p" sx={styles.wrapper.subTitle}>
          {subTitle}
        </div>
        <MainHeading as="h2" sx={styles.wrapper.title}>
          {title}
        </MainHeading>
      </Box>

      {description && (
        <Text as="p" className="description" sx={styles.description}>
          {description}
        </Text>
      )}

      <Box sx={styles.wrapper}>
        {sessionId && (
          <Text as="p" sx={styles.wrapper.subTitle}>
            session ID
          </Text>
        )}

        {sessionId && (
          <Text as="p" sx={styles.wrapper.subTitleId}>
            {sessionId}
          </Text>
        )}
      </Box>

      {btnName && (
        <Link href={btnURL} target="_blank" variant="default">
          <Button variant="primary" aria-label={btnName}>
            {btnName}
          </Button>
        </Link>
      )}
    </Box>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexShrink: 0,
    a: {
      m: ["0 auto", null, null, 0],
    },
  },
  wrapper: {
    // width: "100%",
    // display: "flex",
    // flexDirection: "column",
    // mt: "-5px",
    // title: {
    //   fontSize: ["24px", null, "28px", "32px", "36px", "42px", null, "46px"],
    //   color: "heading_secondary",
    //   lineHeight: [1.35, null, null, 1.3, 1.2],
    //   fontWeight: "700",
    //   letterSpacing: "-.5px",
    //   mb: 5,
    // },
    // subTitle: {
    //   fontSize: [0, null, "14px"],
    //   color: "heading",
    //   letterSpacing: "2px",
    //   textTransform: "uppercase",
    //   fontWeight: "700",
    //   mb: [2, null, null, null, 3],
    //   lineHeight: 1.5,
    // },
    // subTitleId: {
    //   fontSize: [0, null, "14px"],
    //   color: "secondary",
    //   letterSpacing: "2px",
    //   textTransform: "uppercase",
    //   fontWeight: "700",
    //   mb: [2, null, null, null, 3],
    //   lineHeight: 1.5,
    //   width: "100%",
    //   wordWrap: "break-word",
    // },
  },
  description: {
    fontSize: ["15px", 2, null, null, null, "17px", null, 3],
    fontWeight: 400,
    lineHeight: [1.85, null, null, 2, null, "2.2"],
    color: "text_secondary",
    mb: "30px",
  },
};

const MainHeading = styled.div`
  padding: 0 5px;
`;
