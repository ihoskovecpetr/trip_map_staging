/** @jsx jsx */
import React from "react";
import { jsx, Text, Button, Link } from "theme-ui";
import {
  MAP_STYLES_NAMES,
  LAYOUT_STYLE_NAMES,
} from "../../constants/constants";

import borderBlurredLayoutImg from "assets/mapLayouts/borderBlurredLayout.png";
import bottomBlurredLayoutImg from "assets/mapLayouts/bottomBlurredLayout.png";
import bottomLineLayoutImg from "assets/mapLayouts/bottomLineLayout.png";
import doubleBlurredLayoutImg from "assets/mapLayouts/doubleBlurredLayout.png";
import bottomBoxLayoutImg from "assets/mapLayouts/bottomBoxLayout.png";
import islandBoxLayoutImg from "assets/mapLayouts/islandBoxLayout.png";
import borderBoxLayoutImg from "assets/mapLayouts/borderBoxLayout.png";
import pureLayoutImg from "assets/mapLayouts/pureLayout.png";

import LowContrastGreenBlue from "assets/mapStyles/LowContrastGreenBlue.png";
import MustardBlue from "assets/mapStyles/MustardBlue.png";
import SandyOrangeBlue from "assets/mapStyles/SandyOrangeBlue.png";
import WhiteDarkBlue from "assets/mapStyles/WhiteDarkBlue.png";
import WhiteGrey from "assets/mapStyles/WhiteGrey.png";
import WhiteBlue from "assets/mapStyles/WhiteBlue.png";
import WhiteLightBlue from "assets/mapStyles/WhiteLightBlue.png";
import OldDarkBlue from "assets/mapStyles/OldDarkBlue.png";
import OldSandyGrey from "assets/mapStyles/OldSandyGrey.png";

import NextTabBtn from "../NextTabBtn/NextTabBtn";

export default function Tab2({
  map,
  activeFrame,
  setActiveLayout,
  activeMapStyle,
  setActiveMapStyle,
  nextTab,
}) {
  const changeActiveLayout = (index) => () => {
    setActiveLayout(index);
  };

  const changeActiveStyle = (style) => () => {
    setActiveMapStyle(style);
  };

  const getFrameStyleImg = (frameName) => {
    switch (frameName) {
      case LAYOUT_STYLE_NAMES.PURE:
        return pureLayoutImg;
      case LAYOUT_STYLE_NAMES.ISLAND_BOX:
        return islandBoxLayoutImg;
      case LAYOUT_STYLE_NAMES.BOTTOM_LINE:
        return bottomLineLayoutImg;
      case LAYOUT_STYLE_NAMES.BORDER_BOX:
        return borderBoxLayoutImg;
      case LAYOUT_STYLE_NAMES.BORDER_BLUR:
        return borderBlurredLayoutImg;
      case LAYOUT_STYLE_NAMES.BOTTOM_BLUR:
        return bottomBlurredLayoutImg;
      case LAYOUT_STYLE_NAMES.DOUBLE_BORDER_BLUR:
        return doubleBlurredLayoutImg;
      default:
        return pureLayoutImg;
    }
  };

  const getMapStyleImg = (mapStyle) => {
    switch (mapStyle) {
      case MAP_STYLES_NAMES.WHITE_GREY:
        return WhiteGrey;
      case MAP_STYLES_NAMES.WHITE_BLUE:
        return WhiteBlue;
      case MAP_STYLES_NAMES.WHITE_LIGHT_BLUE:
        return WhiteLightBlue;
      case MAP_STYLES_NAMES.SANDY_DARK:
        return WhiteDarkBlue;
      case MAP_STYLES_NAMES.MUSTARD_BLUE:
        return MustardBlue;
      case MAP_STYLES_NAMES.OLD_SANDY_GREY:
        return OldSandyGrey;
      case MAP_STYLES_NAMES.SANDY_ORANGE_BLUE:
        return SandyOrangeBlue;
      case MAP_STYLES_NAMES.LOW_CONTRAST_GREEN:
        return LowContrastGreenBlue;

      default:
        return LowContrastGreenBlue;
    }
  };

  return (
    <div sx={styles.container}>
      <Text as="p" className="description" sx={styles.topDescription}>
        <b>Tip!</b> Pro změnu naspisu a podnadpisu klikněte přímo na mapu
      </Text>
      <Text as="p" className="description" sx={styles.subHeading}>
        Vyberte Rozvržení
      </Text>
      <div sx={styles.layoutWrap}>
        {Object.values(LAYOUT_STYLE_NAMES).map((frame) => (
          <>
            <div
              className={activeFrame === frame && "active"}
              sx={styles.layoutItem}
              onClick={changeActiveLayout(frame)}
            >
              <div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img sx={styles.frameImage} src={getFrameStyleImg(frame)} />
              </div>
              <p sx={styles.itemText}>{frame}</p>
            </div>
          </>
        ))}
      </div>
      <Text as="p" className="description" sx={styles.subHeading}>
        Vyberte barevnou kombinaci
      </Text>
      <div sx={styles.stylesWrap}>
        {Object.values(MAP_STYLES_NAMES).map((style) => (
          <>
            <div
              className={activeMapStyle === style && "active"}
              sx={styles.mapDesignItem}
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
      <div sx={styles.absoluteBtnWrap}>
        <NextTabBtn onClick={nextTab} margin="20px 0px 75px">
          Další krok
        </NextTabBtn>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    padding: "10px",
    pb: "90px",
  },
  layoutWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
  layoutItem: {
    width: ["23%", "23%", "23%", "30%", "23%", "18%"],
    margin: ["1%", "1%", "1%", "1%", "1%", "1%"],
    padding: "4px",
    // height: "80px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "&.active img": {
      border: "2px solid",
      borderColor: "cta_color",
      boxShadow: "3px 3px 5px #888888",
    },
  },
  absoluteBtnWrap: {
    position: "fixed",
    top: ["85vh", "85vh", "85vh", "90vh"],
    left: "0px",
    height: 0,
    width: ["100%", "100%", "100%", "40%"],
  },
  frameImage: {
    height: "60px",
    boxShadow: "3px 3px 5px #888888",
    border: "1px solid grey",
  },
  itemText: {
    // width: "40%",
    // wordBreak: "break-all",
    overflow: "hidden",
    height: "100%",
    margin: "0",
    marginTop: "5px",
    textAlign: "center",
    verticalAlign: "middle",
  },
  stylesWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
  mapDesignItem: {
    width: ["30%", "23%", "23%", "30%"],
    margin: ["1%", "1%", "1%", "1%"],
    padding: "4px",
    display: "flex",
    flexDirection: "column",

    "&.active img": {
      border: "2px solid",
      borderColor: "cta_color",
    },
  },
  itemStyleText: {
    overflow: "hidden",
    height: "100%",
    margin: "0",
    marginTop: "5px",
    textAlign: "center",
    verticalAlign: "middle",
  },
  roundImage: {
    filter: "drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.16))",
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    border: "2px solid rgb(0,0,0,0.2)",
    boxShadow: "3px 3px 5px #888888",
  },

  topDescription: {
    margin: "20px 0px",
    fontWeight: 300,
  },
  subHeading: {
    fontWeight: 600,
    textAlign: "left",
  },
};
