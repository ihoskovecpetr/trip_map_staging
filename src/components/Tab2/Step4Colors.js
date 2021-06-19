/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";

import LowContrastGreenBlue from "assets/mapStyles/LowContrastGreenBlue.png";
import MustardBlue from "assets/mapStyles/MustardBlue.png";
import SandyOrangeBlue from "assets/mapStyles/SandyOrangeBlue.png";
import SandyDark from "assets/mapStyles/SandyDark.png";
import WhiteGrey from "assets/mapStyles/WhiteGrey.png";
import WhiteBlue from "assets/mapStyles/WhiteBlue.png";
import WhiteBlueLowContrast from "assets/mapStyles/WhiteBlueLowContrast.png";
import OldSandyGrey from "assets/mapStyles/OldSandyGrey.png";
import BlackWhite from "assets/mapStyles/BlackWhite.png";
import BlackLand from "assets/mapStyles/BlackLand.png";

import NextTabBtn from "../NextTabBtn/NextTabBtn";

import { MAP_STYLES_NAMES } from "../../constants/constants";
import { useIsMobile } from "../../Hooks/useIsMobile";

export default function Step4Colors({
  activeMapStyle,
  setActiveMapStyle,
  nextTab,
}) {
  const { isMobile } = useIsMobile();

  const changeActiveStyle = (style) => () => {
    setActiveMapStyle(style);
  };

  const getMapStyleImg = (mapStyle) => {
    switch (mapStyle) {
      case MAP_STYLES_NAMES.WHITE_GREY:
        return WhiteGrey;
      case MAP_STYLES_NAMES.WHITE_BLUE:
        return WhiteBlue;
      case MAP_STYLES_NAMES.WHITE_BLUE_LOW_CONTRAST:
        return WhiteBlueLowContrast;
      case MAP_STYLES_NAMES.SANDY_DARK:
        return SandyDark;
      case MAP_STYLES_NAMES.MUSTARD_BLUE:
        return MustardBlue;
      case MAP_STYLES_NAMES.OLD_SANDY_BROWN:
        return OldSandyGrey;
      case MAP_STYLES_NAMES.SANDY_ORANGE_BLUE:
        return SandyOrangeBlue;
      case MAP_STYLES_NAMES.LOW_CONTRAST_GREEN:
        return LowContrastGreenBlue;
      case MAP_STYLES_NAMES.BLACK_WHITE:
        return BlackWhite;
      case MAP_STYLES_NAMES.BLACK_LAND:
        return BlackLand;

      default:
        return LowContrastGreenBlue;
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
        {Object.values(MAP_STYLES_NAMES).map((style) => (
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
                <img sx={styles.roundImage} src={getMapStyleImg(style)} />
              </div>
              <p sx={styles.itemStyleText}>{style}</p>
            </div>
          </>
        ))}
      </div>
      {!isMobile && (
        <Text as="p" className="description" sx={styles.topDescription}>
          <b>Tip!</b> Pro změnu nadpisu a podnadpisu klikněte přímo na mapu
        </Text>
      )}

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

  topDescription: {
    margin: "20px 0px",
    fontWeight: 100,
    "& b": {
      color: "grey",
      fontWeight: 500,
    },
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
