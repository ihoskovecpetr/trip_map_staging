/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";

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

import NextTabBtn from "../NextTabBtn/NextTabBtn";

import { MAP_STYLES_NAMES } from "../../constants/constants";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { useDisplayPNG } from "../../Hooks/useDisplayPNG";

export default function Step4Colors({
  activeMapStyle,
  setActiveMapStyle,
  nextTab,
}) {
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
        return displayPNG ? WhiteBluePNG : WhiteBlue;
      case MAP_STYLES_NAMES.WHITE_BLUE_LOW_CONTRAST:
        return displayPNG ? WhiteBlueLowContrastPNG : WhiteBlueLowContrast;
      case MAP_STYLES_NAMES.SANDY_DARK:
        return displayPNG ? SandyDarkPNG : SandyDark;
      case MAP_STYLES_NAMES.MUSTARD_BLUE:
        return displayPNG ? MustardBluePNG : MustardBlue;
      case MAP_STYLES_NAMES.OLD_SANDY_BROWN:
        return displayPNG ? OldSandyGreyPNG : OldSandyGrey;
      case MAP_STYLES_NAMES.SANDY_ORANGE_BLUE:
        return displayPNG ? SandyOrangeBluePNG : SandyOrangeBlue;
      case MAP_STYLES_NAMES.LOW_CONTRAST_GREEN:
        return displayPNG ? LowContrastGreenBluePNG : LowContrastGreenBlue;
      case MAP_STYLES_NAMES.BLACK_WHITE:
        return displayPNG ? BlackWhitePNG : BlackWhite;
      case MAP_STYLES_NAMES.BLACK_LAND:
        return displayPNG ? BlackLandPNG : BlackLand;

      default:
        return displayPNG ? LowContrastGreenBluePNG : LowContrastGreenBlue;
    }
  };

  return (
    <div sx={styles.container}>
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
              onClick={changeActiveStyle(style)}
            >
              <div
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  sx={styles.roundImage}
                  src={getMapStyleImg(style)}
                  id={`map_style_id_${index}`}
                  alt="Map style image"
                  onError={(e) => {
                    console.log("Direcimage", e);
                  }}
                />
              </div>
              <p sx={styles.itemStyleText}>{style}</p>
            </div>
          </>
        ))}
      </div>

      {/* <div sx={styles.absoluteBtnWrap}>
        <NextTabBtn onClick={nextTab} margin="20px 0px 75px">
          Další krok
        </NextTabBtn>
      </div> */}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    // pb: "90px",
  },

  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    color: "grey",
    margin: "20px 0",
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
    width: ["30%", "23%", "23%", "30%"],
    margin: ["1%", "1%", "1%", "1%"],
    padding: "4px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    "&.active img": {
      border: "3px solid",
      borderColor: "cta_color",
      padding: "3px",
      transform: "scale(1.3)",
    },
    "&.active p": {
      color: "cta_color",
    },
  },
  itemStyleText: {
    overflow: "hidden",
    height: "100%",
    margin: "0",
    marginTop: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: 1.2,
    letterSpacing: "1.1px",
    fontWeight: "100",
    textTransform: "uppercase",
    fontSize: "14px",
  },
  roundImage: {
    // filter: "drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.16))",
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    // border: "2px solid rgb(0,0,0,0.2)",
    boxShadow: "1px 1px 3px rgba(200,200,200,0.99)",
  },

  absoluteBtnWrap: {
    position: "fixed",
    top: ["85vh", "85vh", "85vh", "90vh"],
    left: "0px",
    height: 0,
    width: ["100%", "100%", "100%", "40%", "30%"],
  },
};
