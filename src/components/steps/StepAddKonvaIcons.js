/** @jsx jsx */
import React, { useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { color, fontWeight } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import { useKonvaIconsSelector } from "redux/order/reducer";
import pin_real_small from "assets/icons/pin_real_small.jpg";
import text_icon from "assets/icons/text_icon.png";

import {
  setIsKonvaRendered,
  setAddKonvaIcon,
  setRemoveKonvaIcon,
} from "redux/order/actions";

import { RUNTIME_PIXEL_RATIO, MAP_ICONS } from "constants/constants";

export default function StepAddKonvaIcons({ map }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const iconsRedux = useKonvaIconsSelector();

  useEffect(() => {
    dispatch(setIsKonvaRendered(true));

    return () => {
      !isMobile && dispatch(setIsKonvaRendered(false));
    };
  }, []);

  const addIcon = (iconType) => () => {
    dispatch(
      setAddKonvaIcon({
        id: Math.random().toFixed(3).toString(),
        x: 0.5, //Math.random()
        y: 0.5,

        rotation: Math.random() * 180,
        isDragging: false,
        iconType: iconType,
      })
    );
  };

  const removeIcon = (iconId) => () => {
    dispatch(setRemoveKonvaIcon(iconId));
  };

  const getThumbnailIcon = (iconType) => {
    console.log({ iconType });
    switch (iconType) {
      case MAP_ICONS.PIN_REAL:
        return pin_real_small;
      case MAP_ICONS.TEXT:
        return text_icon;
    }
  };

  return (
    <>
      <div sx={styles.container}>
        {!isMobile && <HeadingText>2. Pridente ikony</HeadingText>}
      </div>
      <button
        onClick={() => {
          dispatch(setIsKonvaRendered(true));
        }}
      >
        isKonva true
      </button>

      <button
        onClick={() => {
          dispatch(setIsKonvaRendered(false));
        }}
      >
        isKonva false
      </button>

      <button onClick={addIcon(MAP_ICONS.PIN_REAL)}>add ICON</button>
      <button onClick={addIcon(MAP_ICONS.TEXT)}>add ICON</button>
      {iconsRedux?.map((icon) => (
        <ItemWrap>
          <StyledImg src={getThumbnailIcon(icon.iconType)} />
          <p onClick={removeIcon(icon.id)}>{icon.iconType}</p>
        </ItemWrap>
      ))}
    </>
  );
}

const styles = {
  container: {
    width: "100%",
    position: "relative",
    paddingTop: "15px",
  },
};

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
`;

const ItemWrap = styled.div`
  display: flex;
  width: 100%;
`;
