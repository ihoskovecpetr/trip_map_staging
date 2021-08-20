/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import PaleBlue from "assets/mapStyles/webp/PaleBlue.webp";
import SandyDark from "assets/mapStyles/webp/SandyDark.webp";
import WhiteBlue from "assets/mapStyles/webp/WhiteBlue.webp";
import BlackWhite from "assets/mapStyles/webp/BlackWhite.webp";
import BlackLand from "assets/mapStyles/webp/BlackLand.webp";
import GreyBlue from "assets/mapStyles/webp/GreyBlue.webp";
import DoubleBlue from "assets/mapStyles/webp/DoubleBlue.webp";
import RedBlue from "assets/mapStyles/webp/RedBlue.webp";
import YellowGreen from "assets/mapStyles/webp/YellowGreen.webp";
import BlueYellow from "assets/mapStyles/webp/BlueYellow.webp";
import GreenOrange from "assets/mapStyles/webp/GreenOrange.webp";
import RedWhite from "assets/mapStyles/webp/RedWhite.webp";

import PaleBluePNG from "assets/mapStyles/png/PaleBlue.png";
import SandyDarkPNG from "assets/mapStyles/png/SandyDark.png";
import WhiteBluePNG from "assets/mapStyles/png/WhiteBlue.png";
import BlackWhitePNG from "assets/mapStyles/png/BlackWhite.png";
import BlackLandPNG from "assets/mapStyles/png/BlackLand.png";
import DarkBlueMonocolorPNG from "assets/mapStyles/png/DarkBlueMonocolor.png";
import DoubleBluePNG from "assets/mapStyles/png/DoubleBlue.png";
import RedBluePNG from "assets/mapStyles/png/RedBlue.png";
import GreenOrangePNG from "assets/mapStyles/png/GreenOrange.png";
import BlueYellowPNG from "assets/mapStyles/png/BlueYellow.png";
import YellowGreenPNG from "assets/mapStyles/png/YellowGreen.png";
import RedWhitePNG from "assets/mapStyles/png/RedWhite.png";

import { MAP_STYLES_NAMES } from "../../constants/constants";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { useDisplayPNG } from "../../Hooks/useDisplayPNG";
import { color, font, fontSize, fontWeight } from "utils";
import { setActiveMapStyleAction } from "redux/order/actions";
import { useActiveMapStyleSelector } from "redux/order/reducer";

export default function Step4Colors() {
  const dispatch = useDispatch();
  const activeMapStyleName = useActiveMapStyleSelector();

  const { isMobile } = useIsMobile();
  const { displayPNG } = useDisplayPNG({ id: "map_style_id_0" });

  const changeActiveStyle = (style) => () => {
    dispatch(setActiveMapStyleAction(style));
    // setActiveMapStyleName(style);
  };

  const getMapStyleImg = (mapStyle) => {
    switch (mapStyle) {
      case MAP_STYLES_NAMES.WHITE_BLUE:
        return displayPNG ? WhiteBluePNG : WhiteBlue;
      case MAP_STYLES_NAMES.SANDY_DARK:
        return displayPNG ? SandyDarkPNG : SandyDark;
      case MAP_STYLES_NAMES.PALE_BLUE:
        return displayPNG ? PaleBluePNG : PaleBlue;
      case MAP_STYLES_NAMES.BLACK_WHITE:
        return displayPNG ? BlackWhitePNG : BlackWhite;
      case MAP_STYLES_NAMES.BLACK_LAND:
        return displayPNG ? BlackLandPNG : BlackLand;
      case MAP_STYLES_NAMES.GREY_BLUE:
        return displayPNG ? DarkBlueMonocolorPNG : GreyBlue;
      case MAP_STYLES_NAMES.DOUBLE_BLUE:
        return displayPNG ? DoubleBluePNG : DoubleBlue;
      case MAP_STYLES_NAMES.RED_BLUE:
        return displayPNG ? RedBluePNG : RedBlue;
      case MAP_STYLES_NAMES.YELLOW_GREEN:
        return displayPNG ? YellowGreenPNG : YellowGreen;
      case MAP_STYLES_NAMES.BLUE_YELLOW:
        return displayPNG ? BlueYellowPNG : BlueYellow;
      case MAP_STYLES_NAMES.GREEN_ORANGE:
        return displayPNG ? GreenOrangePNG : GreenOrange;
      case MAP_STYLES_NAMES.RED_WHITE:
        return displayPNG ? RedWhitePNG : RedWhite;

      default:
        return displayPNG ? PaleBluePNG : PaleBlue;
    }
  };

  return (
    <Container>
      {!isMobile && <HeadingText>7. Barevná kombinace</HeadingText>}
      <ColorsWrap>
        {Object.values(MAP_STYLES_NAMES).map((style, index) => (
          <div
            className={activeMapStyleName === style && "active"}
            sx={styles.mapColorsItem}
          >
            <ImageWrap active={activeMapStyleName === style}>
              <StyledImage
                src={getMapStyleImg(style)}
                id={`map_style_id_${index}`}
                active={activeMapStyleName === style}
                alt="Map style image"
                onClick={changeActiveStyle(style)}
              />
            </ImageWrap>
            <p sx={styles.itemStyleText} onClick={changeActiveStyle(style)}>
              {!isMobile && style}
            </p>
          </div>
        ))}
      </ColorsWrap>
    </Container>
  );
}

const styles = {
  mapColorsItem: {
    width: ["23%", "18%", null, "23%", "18%"],
    margin: ["1%", "1%", null, "1%", "1%"],
    padding: "0px",
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
    width: ["100%", null, null, "unset"],
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
const ColorsWrap = styled.div`
  display: flex;
  width: 100%;
  overflow: scroll;
  padding: 10px 10px;
  flex-wrap: wrap;
`;

const Container = styled.div`
  width: 100%;
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const ImageWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 3rem;
  height: 3rem;
  // padding-bottom: 100%;
  border-radius: 25%;
  outline: none;
  // background: ${({ src }) => `url(${src})`};
  // background-size: cover;
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px 3px;
  color: ${({ active }) => active && color("cta_color")};
`;
