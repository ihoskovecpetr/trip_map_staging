/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { mobile } from "utils";

import borderBlurredLayoutImgPNG from "assets/mapLayouts/png/borderBlurredLayout.png";
import bottomBlurredLayoutImgPNG from "assets/mapLayouts/png/bottomBlurredLayout.png";
import bottomLineLayoutImgPNG from "assets/mapLayouts/png/bottomLineLayout.png";
import doubleBlurredLayoutImgPNG from "assets/mapLayouts/png/doubleBlurredLayout.png";
import bottomBoxLayoutImgPNG from "assets/mapLayouts/png/bottomBoxLayout.png";
import islandBoxLayoutImgPNG from "assets/mapLayouts/png/islandBoxLayout.png";
import borderBoxLayoutImgPNG from "assets/mapLayouts/png/borderBoxLayout.png";
import pureLayoutImgPNG from "assets/mapLayouts/png/pureLayout.png";
import { useIsMobile } from "Hooks/useIsMobile";
import { color } from "utils";
import { setActiveLayoutAction } from "redux/order/actions";
import { useActiveLayoutSelector } from "redux/order/reducer";
import HeadingText from "./atoms/HeadingText";
import StepContainer from "./atoms/StepContainer";
import { TAB_STEPS } from "@constants";

import { LAYOUT_STYLE_NAMES, LAYOUTS } from "constants/constants";

export default function StepLayout({ index }) {
  const dispatch = useDispatch();
  const activeLayoutNameRedux = useActiveLayoutSelector();
  const { isMobile } = useIsMobile();

  const changeActiveLayout = (layoutName) => {
    dispatch(setActiveLayoutAction(layoutName));
    // setActiveLayout(layoutName);
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
    <StepContainer isMobile={isMobile}>
      <HeadingText isMobile={isMobile}>
        {index}. {TAB_STEPS[index].full}
      </HeadingText>
      <AllLayoutsContainer>
        {Object.values(LAYOUTS).map((layoutObj, index) => (
          <div
            className={activeLayoutNameRedux === layoutObj.name && "active"}
            sx={styles.layoutItem}
            onClick={() => changeActiveLayout(layoutObj.name)}
            key={Math.random()}
          >
            <ImageWrap key={Math.random()}>
              <StyledImage
                src={getLayoutImg(layoutObj.name)}
                active={activeLayoutNameRedux === layoutObj.name}
                alt={"Could not display this Layout"}
                id={`image_id_${index}`}
              />
            </ImageWrap>
            <p sx={styles.layoutItemText}>{layoutObj.name}</p>
          </div>
        ))}
      </AllLayoutsContainer>
    </StepContainer>
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
  layoutItem: {
    width: ["23%", "18%", null, "23%", "18%"],
    margin: ["1%", "1%", null, "1%", "1%"],
    // paddingTop: "4px",
    // height: "80px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",

    "&.active img": {},
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

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  outline: none;
  display: block;
  height: 60px;
  border-radius: 2px;
  background-color: ${({ active }) => active && color("cta_color")};
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px 3px;
  color: ${({ active }) => active && color("cta_color")};
`;

const AllLayoutsContainer = styled.div`
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  padding-top: 2px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
