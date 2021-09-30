/** @jsx jsx */
import { jsx, Container, Flex, Button } from "theme-ui";
import { keyframes } from "@emotion/core";
// import { Link } from "react-scroll";
import Link from "next/link";
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

export default function Header({ className }) {
  const router = useRouter();
  const { isMobile } = useIsMobile();

  const isStudio = router.pathname === PATHS.studio;

  return (
    <DrawerProvider>
      <HeaderContainer isStudio={isStudio} id="header">
        <Container sx={styles.container}>
          <Logo src={LogoBlack} /> {/* isMobile ? LogoWhite */}
          <Flex as="nav" sx={styles.nav}>
            {/* {menuItems.map(({ path, label }, i) => {
              return (
                <Link
                  activeClass="active"
                  href={path}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  key={i}
                >
                  {label}
                </Link>
              );
            })} */}
          </Flex>
          <MobileDrawer />
        </Container>
      </HeaderContainer>
    </DrawerProvider>
  );
}

const positionAnim = keyframes`
  from {
    opacity: 1;
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
  background-color: ${({ isStudio }) =>
    isStudio ? "transparent" : "transparent"};
`;

const styles = {
  header: {
    fontWeight: "normal",
    py: 1,
    width: "100%",
    minHeight: "60px",
    position: "absolute",
    zIndex: 5,
    top: 0,
    left: 0,
    transition: "all 0.5s ease",
    animation: `${positionAnim} 0.4s ease`,
    backgroundColor: "transparent",
    color: "#000000",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    mx: "auto",
    // display: "none",
    "@media screen and (min-width: 1024px)": {
      display: "block",
    },
    a: {
      fontSize: "16px",
      fontWeight: "400",
      px: 25,
      cursor: "pointer",
      lineHeight: "1.2",
      "&.active": {
        color: "secondary",
      },
    },
  },
};
