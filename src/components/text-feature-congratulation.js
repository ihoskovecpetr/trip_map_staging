/** @jsx jsx */
import { jsx, Box, Heading, Text, Button, Link } from "theme-ui";
import styled from "styled-components";
import { color, font, fontSize, fontWeight } from "utils";
import Typography from "@material-ui/core/Typography";

export default function TextFeature({
  subTitle,
  title,
  description,
  sessionId,
  btnName,
  btnURL = "#",
}) {
  function copyFunction() {
    var copyText = document.getElementById("myInput");

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Zkopírován text: " + copyText.value);
  }
  return (
    <Box sx={styles.card}>
      <Box>
        <Description>{subTitle}</Description>
        <MainHeading as="h2">{title}</MainHeading>
      </Box>

      {description && (
        <Text as="p" className="description" sx={styles.description}>
          {description}
        </Text>
      )}

      <Box sx={styles.wrapper}>
        {sessionId && (
          <Heading as="p" sx={styles.sessionIdHeading}>
            session ID
          </Heading>
        )}

        {sessionId && (
          <span>
            <textarea
              id="myInput"
              rows="2"
              onClick={copyFunction}
              sx={styles.sessionIdStyle}
              value={sessionId}
            />
            <p sx={styles.sessionIdDescription}>kopírujte poklikem</p>
          </span>
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
  description: {
    fontSize: ["15px", 2, null, null, null, "17px", null, 3],
    fontWeight: 400,
    lineHeight: [1.85, null, null, 2, null, "2.2"],
    color: "text_secondary",
    mb: "30px",
  },
  wrapper: {
    width: "100%",
  },
  sessionIdStyle: {
    wordWrap: "break-word",
    width: "100%",
    backgroundColor: "primary",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  sessionIdDescription: {
    marginTop: 0,
    top: "-5px",
    position: "relative",
  },
  sessionIdHeading: {
    textAlign: "left",
    color: "black",
  },
};

const MainHeading = styled.div`
  font-family: ${font("HarmoniaSans_local")};
`;

const Description = styled.p`
  font-family: ${font("HarmoniaSans_local")};
  margin: 0;
  text-align: left;
`;
