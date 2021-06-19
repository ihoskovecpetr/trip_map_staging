/** @jsx jsx */
import React from "react";
import { jsx, Text, Button, Link } from "theme-ui";
import { keyframes } from "@emotion/react";

export default function CustomLoader() {
  return <span sx={styles.loader}></span>;
}

const rotation = keyframes`
    0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }

`;

const styles = {
  loader: {
    width: "48px",
    height: "48px",
    border: "4px solid",
    borderColor: "transparent #1F3E76 #1F3E76 transparent",
    borderRadius: "50%",
    display: "inline-block",
    position: "relative",
    boxSizing: "border-box",
    animation: `${rotation} 1s ease-in-out infinite`,

    "::after": {
      content: '""',
      boxSizing: "border-box",
      position: "absolute",
      left: "50%",
      top: "50%",
      border: "12px solid",
      borderColor: "transparent #fe6769 #fe6769 transparent",
      transform: "translate(-50%, -50%)",
      borderRadius: "50%",
    },
  },
};
