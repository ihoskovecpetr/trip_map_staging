/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";

export default function HeadingText({ isMobile, children }) {
  return <StyledText isMobile={isMobile}>{children}</StyledText>;
}

const StyledText = styled.p`
  font-weight: 400;
  color: black;
  text-align: left;
  margin: ${({ isMobile }) => (isMobile ? "5px 0 5px 0px" : "15px 0 10px 0px")};
  letter-spacing: 1.1px;
`;
