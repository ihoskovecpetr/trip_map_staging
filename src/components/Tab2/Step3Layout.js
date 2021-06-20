/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, Text } from "theme-ui";

import borderBlurredLayoutImg from "assets/mapLayouts/webp/borderBlurredLayout.webp";
import bottomBlurredLayoutImg from "assets/mapLayouts/webp/bottomBlurredLayout.webp";
import bottomLineLayoutImg from "assets/mapLayouts/webp/bottomLineLayout.webp";
import doubleBlurredLayoutImg from "assets/mapLayouts/webp/doubleBlurredLayout.webp";
import bottomBoxLayoutImg from "assets/mapLayouts/webp/bottomBoxLayout.webp";
import islandBoxLayoutImg from "assets/mapLayouts/webp/islandBoxLayout.webp";
import borderBoxLayoutImg from "assets/mapLayouts/webp/borderBoxLayout.webp";
import pureLayoutImg from "assets/mapLayouts/webp/pureLayout.webp";

import borderBlurredLayoutImgPNG from "assets/mapLayouts/borderBlurredLayout.png";
import bottomBlurredLayoutImgPNG from "assets/mapLayouts/bottomBlurredLayout.png";
import bottomLineLayoutImgPNG from "assets/mapLayouts/bottomLineLayout.png";
import doubleBlurredLayoutImgPNG from "assets/mapLayouts/doubleBlurredLayout.png";
import bottomBoxLayoutImgPNG from "assets/mapLayouts/bottomBoxLayout.png";
import islandBoxLayoutImgPNG from "assets/mapLayouts/islandBoxLayout.png";
import borderBoxLayoutImgPNG from "assets/mapLayouts/borderBoxLayout.png";
import pureLayoutImgPNG from "assets/mapLayouts/pureLayout.png";
import { useIsMobile } from "../../Hooks/useIsMobile";

import NextTabBtn from "../NextTabBtn/NextTabBtn";

import { LAYOUT_STYLE_NAMES, LAYOUTS } from "../../constants/constants";

export default function Step3Layout({ activeFrame, setActiveLayout, nextTab }) {
  const [displayPNG, setDisplayPNG] = useState(false);
  const { isMobile } = useIsMobile();
  const changeActiveLayout = (index) => () => {
    setActiveLayout(index);
  };

  const getLayoutImg = (frameName) => {
    switch (frameName) {
      case LAYOUT_STYLE_NAMES.PURE:
        return displayPNG ? pureLayoutImgPNG : pureLayoutImg;
      case LAYOUT_STYLE_NAMES.ISLAND_BOX:
        return displayPNG ? islandBoxLayoutImgPNG : islandBoxLayoutImg;
      case LAYOUT_STYLE_NAMES.BOTTOM_LINE:
        return displayPNG ? bottomLineLayoutImgPNG : bottomLineLayoutImg;
      case LAYOUT_STYLE_NAMES.BORDER_BOX:
        return displayPNG ? borderBoxLayoutImgPNG : borderBoxLayoutImg;
      case LAYOUT_STYLE_NAMES.BORDER_BLUR:
        return displayPNG ? borderBlurredLayoutImgPNG : borderBlurredLayoutImg;
      case LAYOUT_STYLE_NAMES.BOTTOM_BLUR:
        return displayPNG ? bottomBlurredLayoutImgPNG : bottomBlurredLayoutImg;
      case LAYOUT_STYLE_NAMES.DOUBLE_BORDER:
        return displayPNG ? doubleBlurredLayoutImgPNG : doubleBlurredLayoutImg;
      default:
        return displayPNG ? pureLayoutImgPNG : pureLayoutImg;
    }
  };

  useEffect(() => {
    console.log("RWRENDE");
    const imageEl = document.getElementById("image_id_0");

    const eventCallback = (event, name) => {
      console.log(name, "_loading_IMG: ", event);
    };

    if (imageEl) {
      imageEl.addEventListener("error", (event) => {
        eventCallback("Error", event);
        setDisplayPNG(true);
      });
    }
    return () => {
      imageEl.removeEventListener("error", (event) => {
        eventCallback("Error", event);
      });
    };
  }, []);

  return (
    <div sx={styles.container}>
      {!isMobile && (
        <Text as="p" className="description" sx={styles.headingDesc}>
          Layout
        </Text>
      )}
      <div sx={styles.layoutWrap}>
        {Object.values(LAYOUTS).map((layoutObj, index) => (
          <>
            <div
              className={activeFrame === layoutObj.name && "active"}
              sx={styles.layoutItem}
              onClick={changeActiveLayout(layoutObj.name)}
            >
              <div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img
                  sx={styles.layoutImage}
                  src={getLayoutImg(layoutObj.name)}
                  alt={"Could not display this Layout"}
                  id={`image_id_${index}`}
                  onLoad={(e) => {
                    console.log("Image_Loaded", e);
                  }}
                  onError={(e) => {
                    console.log("Image_onError", e);
                  }}
                />
              </div>
              <p sx={styles.layoutItemText}>{layoutObj.name}</p>
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
    padding: "5px 5px",
    // pb: "90px",
  },

  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    color: "grey",
    margin: "20px 0",
    letterSpacing: "1.1px",
  },

  layoutWrap: {
    display: "flex",
    width: "100%",
    overflow: "scroll",
    flexWrap: [null, null, null, "wrap"],
  },
  layoutItem: {
    width: ["23%", "23%", "14%", "30%", "23%", "18%"],
    margin: ["1%", "1%", "1%", "1%", "1%", "1%"],
    padding: "4px",
    // height: "80px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",

    "&.active img": {
      border: "2px solid",
      borderColor: "cta_color",
      boxShadow: "3px 3px 5px #888888",
      transform: "scale(1.2)",
    },
    "&.active p": {
      color: "cta_color",
    },
  },
  layoutImage: {
    height: "60px",
    boxShadow: "3px 3px 5px #888888",
    border: "1px solid grey",
  },
  layoutItemText: {
    overflow: "hidden",
    height: "100%",
    margin: "0",
    marginTop: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "100%",
    letterSpacing: "1.1px",
    fontWeight: "100",
    textTransform: "uppercase",
    fontSize: "14px",
  },

  absoluteBtnWrap: {
    position: "fixed",
    top: ["85vh", "85vh", "85vh", "90vh"],
    left: "0px",
    height: 0,
    width: ["100%", "100%", "100%", "40%", "30%"],
  },
};
