/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";

import LowContrastGreenBlue from "assets/mapStyles/webp/LowContrastGreenBlue.webp";
import MustardBlue from "assets/mapStyles/webp/MustardBlue.webp";
import SandyOrangeBlue from "assets/mapStyles/webp/SandyOrangeBlue.webp";
import SandyDark from "assets/mapStyles/webp/SandyDark.webp";
import WhiteGrey from "assets/mapStyles/webp/WhiteGrey.webp";
import WhiteBlue from "assets/mapStyles/webp/WhiteBlue.webp";
import WhiteBlueLowContrast from "assets/mapStyles/webp/WhiteBlueLowContrast.webp";
import OldSandyGrey from "assets/mapStyles/webp/OldSandyGrey.webp";
import BlackWhite from "assets/mapStyles/webp/BlackWhite.webp";
import BlackLand from "assets/mapStyles/webp/BlackLand.webp";

import LowContrastGreenBluePNG from "assets/mapStyles/png/LowContrastGreenBlue.png";
import MustardBluePNG from "assets/mapStyles/png/MustardBlue.png";
import SandyOrangeBluePNG from "assets/mapStyles/png/SandyOrangeBlue.png";
import SandyDarkPNG from "assets/mapStyles/png/SandyDark.png";
import WhiteGreyPNG from "assets/mapStyles/png/WhiteGrey.png";
import WhiteBluePNG from "assets/mapStyles/png/WhiteBlue.png";
import WhiteBlueLowContrastPNG from "assets/mapStyles/png/WhiteBlueLowContrast.png";
import OldSandyGreyPNG from "assets/mapStyles/png/OldSandyGrey.png";
import BlackWhitePNG from "assets/mapStyles/png/BlackWhite.png";
import BlackLandPNG from "assets/mapStyles/png/BlackLand.png";
import DarkBlueMonocolorPNG from "assets/mapStyles/png/DarkBlueMonocolor.png";
import DoubleBluePNG from "assets/mapStyles/png/DoubleBlue.png";

import { MAP_STYLES_NAMES } from "../../constants/constants";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { useDisplayPNG } from "../../Hooks/useDisplayPNG";
import { color, font, fontSize, fontWeight } from "utils";

export default function Step4Colors({ activeMapStyle, setActiveMapStyle }) {
  const { isMobile } = useIsMobile();
  const { displayPNG } = useDisplayPNG({ id: "map_style_id_0" });

  const changeActiveStyle = (style) => () => {
    setActiveMapStyle(style);
  };

  const getMapStyleImg = (mapStyle) => {
    switch (mapStyle) {
      case MAP_STYLES_NAMES.WHITE_GREY:
        return displayPNG ? WhiteGreyPNG : WhiteGrey;
      case MAP_STYLES_NAMES.WHITE_BLUE:
        return WhiteBluePNG;
      case MAP_STYLES_NAMES.WHITE_BLUE_LOW_CONTRAST:
        return WhiteBlueLowContrastPNG;
      case MAP_STYLES_NAMES.SANDY_DARK:
        return SandyDarkPNG;
      // case MAP_STYLES_NAMES.MUSTARD_BLUE:
      //   return displayPNG ? MustardBluePNG : MustardBlue;
      // case MAP_STYLES_NAMES.OLD_SANDY_BROWN:
      //   return displayPNG ? OldSandyGreyPNG : OldSandyGrey;
      case MAP_STYLES_NAMES.SANDY_ORANGE_BLUE:
        return displayPNG ? SandyOrangeBluePNG : SandyOrangeBlue;
      case MAP_STYLES_NAMES.LOW_CONTRAST_GREEN:
        return LowContrastGreenBluePNG;
      case MAP_STYLES_NAMES.BLACK_WHITE:
        return displayPNG ? BlackWhitePNG : BlackWhite;
      case MAP_STYLES_NAMES.BLACK_LAND:
        return displayPNG ? BlackLandPNG : BlackLand;
      case MAP_STYLES_NAMES.DARK_BLUE_MONOCOLOR:
        return DarkBlueMonocolorPNG;
      case MAP_STYLES_NAMES.DOUBLE_BLUE:
        return DoubleBluePNG;

      default:
        return displayPNG ? LowContrastGreenBluePNG : LowContrastGreenBlue;
    }
  };

  return (
    <Container>
      {!isMobile && (
        <Text as="p" className="description" sx={styles.headingDesc}>
          Barevná kombinace
        </Text>
      )}
      <div sx={styles.stylesWrap}>
        {Object.values(MAP_STYLES_NAMES).map((style, index) => (
          <>
            <div
              className={activeMapStyle === style && "active"}
              sx={styles.mapColorsItem}
            >
              <ImageWrap active={activeMapStyle === style}>
                <StyledImage
                  src={getMapStyleImg(style)}
                  id={`map_style_id_${index}`}
                  active={activeMapStyle === style}
                  alt="Map style image"
                  onError={(e) => {
                    console.log("Direcimage", e);
                  }}
                  onClick={changeActiveStyle(style)}
                />
              </ImageWrap>
              <p sx={styles.itemStyleText} onClick={changeActiveStyle(style)}>
                {style}
              </p>
            </div>
          </>
        ))}
      </div>
    </Container>
  );
}

const styles = {
  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    color: "grey",
    marginTop: "20px",
    letterSpacing: "1.1px",
  },

  stylesWrap: {
    display: "flex",
    width: "100%",
    overflow: "scroll",
    padding: "10px 5px",
    flexWrap: [null, null, null, "wrap"],
  },
  mapColorsItem: {
    width: ["5rem", null, "23%", "30%"],
    margin: ["4px", null, "1%", "1%"],
    padding: "4px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    "&.active p": {
      color: "cta_color",
    },
  },
  itemStyleText: {
    overflow: "hidden",
    height: "100%",
    width: ["5rem", null, null, "unset"],
    margin: "0",
    marginTop: "12px",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: 1.2,
    letterSpacing: "1.1px",
    fontWeight: 400,
    textTransform: "uppercase",
    fontSize: "14px",
  },
};

const Container = styled.div`
  width: 100%;
`;

const ImageWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 25%;
  outline: none;
  display: block;
  background-color: ${({ active }) => active && color("cta_color")};
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px 5px;
  color: ${({ active }) => active && color("cta_color")};
`;

// background-color: ${({ active }) =>
// active ? color("cta_color") : "rgba(0, 0, 0, 0.1)"};
