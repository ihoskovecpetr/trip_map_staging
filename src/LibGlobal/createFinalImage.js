// import request from "superagent";
import mapboxgl from "mapbox-gl";

import { drawLayout } from "./drawLayout";
import { setDevicePixelRatio } from "LibGlobal/setDevicePixelRatio";
// import { getCurrentPixelRatio } from "LibGlobal/getCurrentPixelRatio";

import {
  MAP_STYLES,
  ORIENTATIONS,
  RUNTIME_PIXEL_RATIO,
  PRINT_CANVAS_BASE_PX,
} from "constants/constants";

// let snapshotMapObject;

function takeScreenshot(mapLocal) {
  return new Promise(function (resolve, _) {
    mapLocal.once("render", function () {
      // mapLocal.getCanvas().toBlob((blob) => resolve(blob));
      resolve(mapLocal.getCanvas().toDataURL());
    });

    /* trigger render */
    mapLocal.setBearing(mapLocal.getBearing());
  });
}

const fitBoundsMapPromise = async ({ originalMapObject, snapMapObject }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const originalBounds = originalMapObject.getBounds();
      console.log({
        originalBounds,
        snapMapObject,
        fitBounds: snapMapObject.fitBounds,
      });

      snapMapObject.fitBounds(originalBounds, {
        animate: false,
      });

      snapMapObject.on("idle", function (e) {
        //TODO: find another event after fully loading map to avoid setTimeout.

        console.log("Map_idling", { e });
        resolve();
        setTimeout(() => {}, 1000);
      });
    } catch (e) {
      console.log({ e });
      alert("resizing Error", e);
    }
  });
};

export const createFinalImage = async ({
  originalMapObject,
  snapMapInstance,
  activeLayoutName,
  mapTitles,
  product,
  activeMapStyleName,
  options,
}) => {
  const {
    // height,
    // width,
    // isPreview,
    // definitionConstant = 1,
    computedPixelRatio,
  } = options;
  return new Promise(async (resolve, reject) => {
    // let snapshotMap = document.createElement("div");
    // snapshotMap.setAttribute("id", "snapshot_map");

    //START
    // let snapshotMapWrapper = document.getElementById("snapshot_map_wrapper");

    // const isWideOrientation =
    //   product?.sizeObject?.orientation === ORIENTATIONS.wide;

    // const computedPixelBase = Math.floor(
    //   PRINT_CANVAS_BASE_PX / definitionConstant
    // );

    // const currentVersionPixelRatio = getCurrentPixelRatio(product.variantId);
    // const computedPixelRatio = Number(
    //   (currentVersionPixelRatio * definitionConstant).toFixed(2)
    // );

    // let multiple;

    // if (isWideOrientation) {
    //   multiple = computedPixelBase / width;
    // } else {
    //   multiple = computedPixelBase / height;
    // }

    // console.log({
    //   FinalWidth: width * multiple,
    //   finalHeight: height * multiple,
    // });
    // Object.assign(snapshotMapWrapper.style, {
    //   width: `${width * multiple}px`,
    //   height: `${height * multiple}px`,
    //   // display: "none",
    //   // visibility: "hidden",
    // });

    //END

    // const canvas = snapMapInstance.getCanvas();

    // canvas.height = `${400}px`;
    // canvas.width = `${100}px`;

    setDevicePixelRatio(computedPixelRatio);
    snapMapInstance.resize();

    // const PlaceToHideBigMap = document.getElementById("place_to_hide_big_map");
    // PlaceToHideBigMap.appendChild(snapshotMap);

    // snapshotMapObject = new mapboxgl.Map({
    //   container: "snapshot_map",
    //   zoom: originalMapObject.getZoom(),
    //   minZoom: 0,
    //   center: originalMapObject.getCenter(),
    //   style: MAP_STYLES[activeMapStyleName].url,
    //   preserveDrawingBuffer: true,
    // });

    await fitBoundsMapPromise({
      originalMapObject,
      snapMapObject: snapMapInstance,
    });

    takeScreenshot(snapMapInstance).then(async function (data) {
      try {
        const snapshotWrapper = document.getElementById("snapshot_map_wrapper");

        Object.assign(snapshotWrapper.style, {
          display: "none",
        });

        // div.parentNode.removeChild(div);

        const image = await getImageFromBase64(data);

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
          localPixelRatio: computedPixelRatio,
        });

        const finalImgWithLayout = mergerCanvas.toDataURL();

        resolve(finalImgWithLayout);

        setDevicePixelRatio(RUNTIME_PIXEL_RATIO);
      } catch (e) {
        alert("Failed while creating Taking screenshot and creating Image");
        console.log({ e });
        setDevicePixelRatio(RUNTIME_PIXEL_RATIO);
        reject(e);
      }
    });
  });
};

const getImageFromBase64 = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const imgEl = new Image();

      imgEl.onload = () => {
        resolve(imgEl);
      };

      imgEl.onerror = function (e) {
        console.log("Error loading image", e);

        reject("Failed to create image");
      };

      // console.log(JSON.stringify(data));
      // const theBlob = new Blob([atobX(data)], {
      //   type: "image/png",
      // });

      // const objectURL = URL.createObjectURL(theBlob);

      imgEl.src = data;
    } catch (Error) {
      console.log("Error in getImageFromBase64", { Error });
    }
  });
};
