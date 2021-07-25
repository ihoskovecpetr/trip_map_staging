/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";

import Lightbox from "react-image-lightbox";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Rotate90DegreesCcwIcon from "@material-ui/icons/Rotate90DegreesCcw";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import CircularProgress from "@material-ui/core/CircularProgress";

import { orientationSwitcher } from "../../LibGlobal/getOrientationSwitcher";
import { createFinalImage } from "../../LibGlobal/createFinalImage";
import { useIsMobile } from "Hooks/useIsMobile";
import { color } from "utils";

import Logo from "components/logo";
import LogoWhite from "assets/logo_while.png";
import { useElementDimensions } from "Hooks/useElementDimensions";

import { FAKE_DIV_IDS, TITLES_DEFAULT } from "../../constants/constants";

export default function MapContainer({
  map,
  addZoom,
  subtractZoom,
  setProduct,
  activeLayout,
  mapTitles,
  product,
  activeMapStyleName,
}) {
  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });
  const [isCreatingImage, setIsCreatingImage] = useState(false);
  const { isMobile } = useIsMobile();

  const changeOrientation = () => {
    orientationSwitcher(product, setProduct);
  };

  const {
    height: mapWrapperHeight,
    width: mapWrapperWidth,
  } = useElementDimensions("map_wrap_2_id");

  const fullscreenImageRequested = async () => {
    setIsCreatingImage(true);

    const finalImgSrc = await createFinalImage({
      originalMapObject: map,
      activeLayoutName: activeLayout,
      mapTitles,
      product,
      activeMapStyleName,
      options: {
        height: mapWrapperHeight,
        width: mapWrapperWidth,
        isPreview: true,
      },
    });

    setLightbox({
      open: true,
      activeSrc: finalImgSrc,
    });

    setIsCreatingImage(false);
  };

  return (
    <div sx={styles.canvas_bg} id="map_studio_segment">
      <div sx={styles.allBtnWrapper} id="map_buttons_wrapper">
        {isMobile && (
          <LogoWrap>
            <Logo src={LogoWhite} />
          </LogoWrap>
        )}
        <EmptySpaceExpander></EmptySpaceExpander>
        <div sx={styles.zoomBtnWrapper}>
          <div sx={styles.zoomBtn} className="left" onClick={addZoom}>
            <AddIcon />
          </div>
          <div sx={styles.zoomBtn} className="right" onClick={subtractZoom}>
            <RemoveIcon />
          </div>
        </div>

        <div sx={styles.rotateBtn}>
          <Rotate90DegreesCcwIcon onClick={changeOrientation} />
        </div>

        <div sx={styles.rotateBtn}>
          {isCreatingImage ? (
            <ColorWrap>
              <StyledCircularProgress />
            </ColorWrap>
          ) : (
            <OpenWithIcon
              color="grey"
              onClick={() => fullscreenImageRequested()}
            />
          )}
        </div>
      </div>

      <div sx={styles.map_available_space} id="map_available_space_id">
        <div id="map_wrap_2_id">
          <div id="map" sx={styles.map_wrap_1}></div>
        </div>

        {Object.keys(FAKE_DIV_IDS).map((key, index) => (
          <div
            id={FAKE_DIV_IDS[key]}
            contenteditable="plaintext-only"
            style={{
              width: "auto",
              display: "inline-block",
              visibility: "hidden",
              position: "fixed",
              overflow: "auto",
            }}
          >
            {TITLES_DEFAULT[index]}
          </div>
        ))}
      </div>

      <canvas id="canvas_merging" sx={styles.canvas_merging} />
      <PlaceToHideBigMap id="place_to_hide_big_map"></PlaceToHideBigMap>
      {lightbox.open && (
        <Lightbox
          mainSrc={lightbox.activeSrc}
          onCloseRequest={() => setLightbox({ open: false })}
        />
      )}
    </div>
  );
}

const BNT_RADIUS = 4;

const LogoWrap = styled.div`
  position: absolute;
  display: flex;
`;

const EmptySpaceExpander = styled.div`
  flex-grow: 4;
`;

const PlaceToHideBigMap = styled.div`
  width: 0px;
  height: 0px;
  overflow: hidden;
`;

const ColorWrap = styled.div`
  color: ${color("cta_color")} !important;
  display: flex;
`;

const StyledCircularProgress = styled(CircularProgress)({
  height: "24px !important",
  width: "24px !important",
  color: "inherit !important",
});

const styles = {
  canvas_bg: {
    px: "0 !important",
    display: "flex",
    flexDirection: "column",
    transform: "translateX(0)", // this is important, reset absolute position to thos element
    height: [null, null, null, "100%"],
    overflow: "auto",
  },
  map_available_space: {
    display: "flex",
    justifyContent: "center",
    alignItems: ["flex-start", null, null, "center"],
    pt: ["20px", null, null, 0],
    width: "100%",
    height: ["60vh", null, null, "85vh"],
  },

  map_wrap_1: {
    position: "relative",
    overflow: "initial",
    width: "100%",
    height: "100%",
  },
  canvas_merging: {
    display: "none",
  },
  allBtnWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem",
  },
  zoomBtnWrapper: {
    display: "flex",
    padding: "auto",
    // marginRight: "30px",
  },
  zoomBtn: {
    border: "1px solid lightGrey",
    display: "flex",
    padding: "5px 5px",
    margin: "auto",
    backgroundColor: "white",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    cursor: "pointer",

    "&.left": {
      borderRadius: `${BNT_RADIUS}px 0 0 ${BNT_RADIUS}px`,
      borderRight: "0px solid lightGrey",
    },
    "&.right": {
      borderRadius: `0 ${BNT_RADIUS}px ${BNT_RADIUS}px 0`,
    },
  },
  rotateBtn: {
    border: "1px solid lightGrey",
    display: "flex",
    padding: "5px 5px",
    m: "2px",
    borderRadius: `${BNT_RADIUS}px`,
    backgroundColor: "white",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)",
    cursor: "pointer",
    // marginRight: "30px",
  },
};
