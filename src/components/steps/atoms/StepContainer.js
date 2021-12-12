/** @jsx jsx */
import { jsx } from "theme-ui";
import styled from "styled-components";
import { color } from "utils";

export default function StepContent({ isMobile, children, isSolidBg }) {
  return (
    <Content isMobile={isMobile} isSolidBg={isSolidBg}>
      {children}
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  padding: ${({ isMobile }) => (isMobile ? "10px 0.5rem" : "10px 0rem")};
  padding-bottom: ${({ isMobile }) => (isMobile ? "220px" : "50px")};
  background: ${({ isSolidBg }) =>
    isSolidBg ? color("background_almost_white") : "transparent"};
`;
