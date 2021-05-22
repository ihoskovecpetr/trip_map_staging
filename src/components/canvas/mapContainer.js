/** @jsx jsx */
import React from "react";
import { jsx, Container } from "theme-ui";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Rotate90DegreesCcwIcon from "@material-ui/icons/Rotate90DegreesCcw";
import OpenWithIcon from "@material-ui/icons/OpenWith";

import { SIZES } from "../../constants/constants";
import { orientationSwitcher } from "../../LibGlobal/getOrientationSwitcher";

export default function MapContainer({
  addZoom,
  subtractZoom,
  setProduct,
  product,
}) {
  const changeOrientation = () => {
    orientationSwitcher(product, setProduct);
    //     const nextSize = product.sizeObject.acceptableSizes.find(
    //       (size) => size != product.sizeObject.code
    //     );

    //     setProduct((prev) => ({
    //       ...prev,
    //       sizeObject: SIZES.find((size) => size.code === nextSize),
    //     }));
  };

  return (
    <Container sx={styles.canvas_bg}>
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
          <OpenWithIcon color="grey" style={{ color: "lightGrey" }} />
        </div>
      </div>
      <div sx={styles.map_wrapper_wrapper} id="map_wrapper_wrapper_id">
        <div sx={styles.map_wrapper} id="map_wrapper_id">
          <div id="map" sx={styles.map}></div>
        </div>
      </div>

      <canvas id="canvas_merging" sx={styles.canvas_merging} />
    </Container>
  );
}

const BNT_RADIUS = 4;

const styles = {
  canvas_bg: {
    bg: "rgb(242, 242, 242)",
    px: "0 !important",
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
  map_wrapper_wrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: [null, null, null, "85%"],
    minHeight: ["50vh", "50vh", "50vh"],
    // border: "2px dotted red",
  },
  map_wrapper: {
    // margin: "30px",
    marginBottom: "40px",
    marginTop: "10px",
  },
  map: {
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
    mb: "10px",
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
