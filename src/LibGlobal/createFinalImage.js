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
  const { computedPixelRatio } = options;
  return new Promise(async (resolve, reject) => {
    setDevicePixelRatio(computedPixelRatio);
    snapMapInstance.resize();

    await fitBoundsMapPromise({
      originalMapObject,
      snapMapObject: snapMapInstance,
    });

    takeScreenshot(snapMapInstance).then(async function (data) {
      try {
        alert("Got data from Screenshot" + JSON.stringify(data));
        const snapshotWrapper = document.getElementById("snapshot_map_wrapper");

        Object.assign(snapshotWrapper.style, {
          display: "none",
        });

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
        alert(
          "Failed while taking screenshot and creating Image" +
            JSON.stringify(e)
        );
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
        alert(JSON.stringify(e));
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
