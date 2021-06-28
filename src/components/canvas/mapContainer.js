/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "theme-ui";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Rotate90DegreesCcwIcon from "@material-ui/icons/Rotate90DegreesCcw";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import Lightbox from "react-image-lightbox";

import { orientationSwitcher } from "../../LibGlobal/getOrientationSwitcher";
import { createFinalImage } from "../../LibGlobal/createFinalImage";
import { useIsMobile } from "Hooks/useIsMobile";

import {
  FAKE_DIV_IDS,
  TITLES_DEFAULT,
  ORIENTATIONS,
} from "../../constants/constants";

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
  const [imageBase64Created, setImageBase64Created] = useState("");
  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });
  const { isMobile } = useIsMobile();

  console.log({ product });

  const isWideOrientation =
    product?.sizeObject?.orientation === ORIENTATIONS.wide;

  const changeOrientation = () => {
    orientationSwitcher(product, setProduct);
  };

  const createPreviewImage = async () => {
    console.log({ activeLayout });
    const finalImgSrc = await createFinalImage(
      map,
      activeLayout,
      mapTitles,
      product,
      activeMapStyleName
    );

    setImageBase64Created(finalImgSrc);
    setLightbox({
      open: true,
      activeSrc: finalImgSrc,
    });
  };

  return (
    <div sx={styles.canvas_bg} id="map_studio_segment">
      <div sx={styles.allBtnWrapper} id="map_buttons_wrapper">
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
          <OpenWithIcon color="grey" onClick={() => createPreviewImage()} />
        </div>
      </div>

      <div
        sx={styles.map_available_space}
        id="map_available_space_id"
        className={isWideOrientation && "isWideOrientation"}
      >
        <div sx={styles.map_wrapper} id="map_wrapper_id">
          <div id="map" sx={styles.map}></div>
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

const styles = {
  canvas_bg: {
    px: "0 !important",
    pb: "20px",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "flex-start",
    transform: "translateX(0)", // this is important
    height: [null, null, null, "100%"],
    // pb: "100px",
    overflow: "auto",
    // border: "2px solid green",
  },
  map_available_space: {
    display: "flex",
    justifyContent: "center",
    alignItems: ["flex-start", null, null, "center"],
    pt: ["20px", null, null, 0],
    width: "100%",
    height: ["60vh", null, null, "85%"],
    // minHeight: ["60vh", "60vh", "60vh"],

    // "&.isWideOrientation": {
    //   // minHeight: ["45vh", null],
    //   height: "45vh",
    // },
  },
  map_wrapper: {
    // margin: "30px",
    // marginBottom: "40px",
    // marginTop: "10px",
  },
  map: {
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
    justifyContent: "flex-end",
    alignItems: "center",
    // height: [null, null, null, "10%"],
    p: "5px",
    // mb: "10px",
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
