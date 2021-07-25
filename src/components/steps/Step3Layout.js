/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";

import borderBlurredLayoutImgPNG from "assets/mapLayouts/png/borderBlurredLayout.png";
import bottomBlurredLayoutImgPNG from "assets/mapLayouts/png/bottomBlurredLayout.png";
import bottomLineLayoutImgPNG from "assets/mapLayouts/png/bottomLineLayout.png";
import doubleBlurredLayoutImgPNG from "assets/mapLayouts/png/doubleBlurredLayout.png";
import bottomBoxLayoutImgPNG from "assets/mapLayouts/png/bottomBoxLayout.png";
import islandBoxLayoutImgPNG from "assets/mapLayouts/png/islandBoxLayout.png";
import borderBoxLayoutImgPNG from "assets/mapLayouts/png/borderBoxLayout.png";
import pureLayoutImgPNG from "assets/mapLayouts/png/pureLayout.png";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { color } from "utils";

import { LAYOUT_STYLE_NAMES, LAYOUTS } from "../../constants/constants";

export default function Step3Layout({ activeFrame, setActiveLayout }) {
  const { isMobile } = useIsMobile();
  const changeActiveLayout = (index) => () => {
    setActiveLayout(index);
  };

  const getLayoutImg = (frameName) => {
    switch (frameName) {
      case LAYOUT_STYLE_NAMES.PURE:
        return pureLayoutImgPNG;
      case LAYOUT_STYLE_NAMES.ISLAND_BOX:
        return islandBoxLayoutImgPNG;
      case LAYOUT_STYLE_NAMES.BOTTOM_LINE:
        return bottomLineLayoutImgPNG;
      case LAYOUT_STYLE_NAMES.BORDER_BOX:
        return borderBoxLayoutImgPNG;
      case LAYOUT_STYLE_NAMES.BORDER_BLUR:
        return borderBlurredLayoutImgPNG;
      case LAYOUT_STYLE_NAMES.BOTTOM_BLUR:
        return bottomBlurredLayoutImgPNG;
      case LAYOUT_STYLE_NAMES.DOUBLE_BORDER:
        return doubleBlurredLayoutImgPNG;
      default:
        return pureLayoutImgPNG;
    }
  };

  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>Layout</HeadingText>}
      <div sx={styles.allLayoutsWrap}>
        {Object.values(LAYOUTS).map((layoutObj, index) => (
          <div
            className={activeFrame === layoutObj.name && "active"}
            sx={styles.layoutItem}
            onClick={changeActiveLayout(layoutObj.name)}
          >
            <ImageWrap>
              <StyledImage
                src={getLayoutImg(layoutObj.name)}
                active={activeFrame === layoutObj.name}
                alt={"Could not display this Layout"}
                id={`image_id_${index}`}
              />
            </ImageWrap>
            <p sx={styles.layoutItemText}>{layoutObj.name}</p>
          </div>
        ))}
      </div>
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
    marginTop: "20px",
    letterSpacing: "1.1px",
  },
  allLayoutsWrap: {
    display: "flex",
    // width: "100%",
    overflow: "scroll",
    flexWrap: [null, null, null, "wrap"],
    paddingTop: "2px",
  },
  layoutItem: {
    width: ["4rem", null, null, "23%", "23%", "18%"],
    margin: ["5px 5px", null, null, "1%", "1%", "1%"],
    // paddingTop: "4px",
    // height: "80px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",

    "&.active img": {
      // border: "5px solid",
      // borderColor: "cta_color",
      // boxShadow: "0px 0px 0px 5px",
      // color: "cta_color",
      // transform: "scale(1.2)",
    },
    "&.active p": {
      color: "cta_color",
    },
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
    fontWeight: 400,
    textTransform: "uppercase",
    fontSize: "14px",
  },
};

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  outline: none;
  display: block;
  height: 60px;
  background-color: ${({ active }) => active && color("cta_color")};
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px 3px;
  color: ${({ active }) => active && color("cta_color")};
`;