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
  wrapper: {},
  description: {
    fontSize: ["15px", 2, null, null, null, "17px", null, 3],
    fontWeight: 400,
    lineHeight: [1.85, null, null, 2, null, "2.2"],
    color: "text_secondary",
    mb: "30px",
  },
};

const MainHeading = styled.div`
  font-family: ${font("HarmoniaSans_local")};
  padding: 0 10px;
`;
