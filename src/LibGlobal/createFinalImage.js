// import request from "superagent";
import mapboxgl from "mapbox-gl";

import { drawLayout } from "./drawLayout";
import { setDevicePixelRatio } from "LibGlobal/setDevicePixelRatio";
import { getCurrentPixelRatio } from "LibGlobal/getCurrentPixelRatio";

import {
  MAP_STYLES,
  ORIENTATIONS,
  RUNTIME_PIXEL_RATIO,
} from "constants/constants";

let snapshotMapObject;

function takeScreenshot(mapLocal) {
  return new Promise(function (resolve, _) {
    mapLocal.once("render", function () {
      console.log("Render_local_Screenshot", mapLocal.getCanvas().toDataURL());
      resolve(mapLocal.getCanvas().toDataURL());
    });

    /* trigger render */
    mapLocal.setBearing(mapLocal.getBearing());
  });
}

const resizeMapPromise = async ({ originalMapObject, mapObject, options }) => {
  const { height, width } = options;
  return new Promise((resolve, reject) => {
    const originalBounds = originalMapObject.getBounds();

    mapObject.on("idle", function () {
      //TODO: find another event after fully loading image to avoid setTimeout.
      resolve();
      setTimeout(() => {}, 1000);
    });

    mapObject.fitBounds(originalBounds, {
      animate: false,
    });
  });
};

// export const setDevicePixelRatio = (ratio) => {
//   console.log();
//   Object.defineProperty(window, "devicePixelRatio", {
//     get: function () {
//       return ratio;
//     },
//   });
// };

export const createFinalImage = async ({
  originalMapObject,
  activeLayoutName,
  mapTitles,
  product,
  activeMapStyleName,
  options,
}) => {
  const { height, width, isPreview } = options;
  return new Promise(async (resolve, reject) => {
    let snapshotMap = document.createElement("div");
    snapshotMap.setAttribute("id", "snapshot_map");

    const isWideOrientation =
      product?.sizeObject?.orientation === ORIENTATIONS.wide;

    let multiple;
    if (isWideOrientation) {
      multiple = 1200 / width;
    } else {
      multiple = 1200 / height;
    }

    Object.assign(snapshotMap.style, {
      width: `${width * multiple}px`,
      height: `${height * multiple}px`,
      // display: "none",
      visibility: "hidden",
    });
    const PlaceToHideBigMap = document.getElementById("place_to_hide_big_map");
    PlaceToHideBigMap.appendChild(snapshotMap);

    snapshotMapObject = new mapboxgl.Map({
      container: "snapshot_map",
      zoom: originalMapObject.getZoom(),
      minZoom: 0,
      center: originalMapObject.getCenter(),
      style: MAP_STYLES[activeMapStyleName].url,
      preserveDrawingBuffer: true,
    });

    const CURRENT_VERSION_PIXEL_RATIO = getCurrentPixelRatio(product.variantId);
    const CURRENT_SNAPSHOT_PIXEL_RATIO = isPreview
      ? RUNTIME_PIXEL_RATIO
      : CURRENT_VERSION_PIXEL_RATIO;
    setDevicePixelRatio(CURRENT_SNAPSHOT_PIXEL_RATIO);

    console.log({ CURRENT_SNAPSHOT_PIXEL_RATIO });

    await resizeMapPromise({
      originalMapObject,
      mapObject: snapshotMapObject,
      options: { height, width },
    });

    takeScreenshot(snapshotMapObject).then(function (data) {
      var div = document.getElementById("snapshot_map");
      div.parentNode.removeChild(div);

      const image = new Image();

      image.onerror = function (e) {
        console.log("Error loading image", e);
        toast("Něco se pokazilo", {
          type: "error",
          position: "top-left",
        });
        reject("Failed to create image");
      };

      image.onload = function () {
        const mergerCanvas = document.getElementById("canvas_merging");

        mergerCanvas.setAttribute("height", image.height);
        mergerCanvas.setAttribute("width", image.width);
        var ctx = mergerCanvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        drawLayout(ctx, {
          width: image.width,
          height: image.height,
          activeLayoutName,
          mapTitles,
          product,
          isProductionPrint: true,
          activeMapStyleName,
          localPixelRatio: CURRENT_SNAPSHOT_PIXEL_RATIO,
        });

        const finalImgWithLayout = mergerCanvas.toDataURL();

        resolve(finalImgWithLayout);

        setDevicePixelRatio(RUNTIME_PIXEL_RATIO);
      };

      image.src = data;
    });
  });
};
