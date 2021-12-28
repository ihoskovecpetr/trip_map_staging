/** @jsx jsx */
import { jsx, Container, Flex, Button } from "theme-ui";
import { keyframes } from "@emotion/core";
// import { Link } from "react-scroll";
import styled from "styled-components";

import Logo from "components/logo";
import LogoBlack from "assets/logo_black.png";
import LogoWhite from "assets/logo_while.png";
import { DrawerProvider } from "../../contexts/drawer/drawer.provider";
import MobileDrawer from "./mobile-drawer";
import menuItems from "./header.data";
import { useIsMobile } from "Hooks/useIsMobile";
import { useRouter } from "next/router";
import { PATHS } from "@constants";
import { useElementDimensions } from "Hooks/useElementDimensions";

export default function Header({ className }) {
  const router = useRouter();
  const { isMobile } = useIsMobile();
  const { height: headerHeight } = useElementDimensions("header");

  const isStudio = router.pathname === PATHS.studio;

  return (
    <DrawerProvider>
      <HeaderContainer isStudio={isStudio} isMobile={isMobile} id="header">
        <StyledContainer>
          <Logo src={LogoBlack} />
          XX
          <MobileDrawer />
        </StyledContainer>
      </HeaderContainer>
    </DrawerProvider>
  );
}

const positionAnim = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

const HeaderContainer = styled.div`
  font-weight: normal;
  padding: 5px 0;
  width: 100%;
  min-height: 60px;
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  transition: all 0.5s ease;
  animation: ${positionAnim} 0.4s ease;
  color: black;
  background-color: transparent;
`;

// background-color: ${({ isStudio, isMobile }) =>
// isStudio ? (isMobile ? "transparent" : "#7B8188") : "transparent"};

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
