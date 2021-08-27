// import request from "superagent";
import mapboxgl from "mapbox-gl";

import { drawLayout } from "./drawLayout";
import { setDevicePixelRatio } from "LibGlobal/setDevicePixelRatio";
import { getCurrentPixelRatio } from "LibGlobal/getCurrentPixelRatio";

import {
  MAP_STYLES,
  ORIENTATIONS,
  RUNTIME_PIXEL_RATIO,
  PRINT_CANVAS_BASE_PX,
} from "constants/constants";

let snapshotMapObject;

function takeScreenshot(mapLocal) {
  return new Promise(function (resolve, _) {
    mapLocal.once("render", function () {
      // console.log("Render_local_Screenshot", mapLocal.getCanvas().toDataURL());

      // mapLocal.getCanvas().toBlob((blob) => resolve(blob));
      resolve(mapLocal.getCanvas().toDataURL());
    });

    /* trigger render */
    mapLocal.setBearing(mapLocal.getBearing());
  });
}

const resizeMapPromise = async ({ originalMapObject, mapObject }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const originalBounds = originalMapObject.getBounds();

      mapObject.on("idle", function () {
        //TODO: find another event after fully loading image to avoid setTimeout.
        resolve();
        setTimeout(() => {}, 1000);
      });

      mapObject.fitBounds(originalBounds, {
        animate: false,
      });
    } catch (e) {
      alert("resizing Error", e);
    }
  });
};

export const createFinalImage = async ({
  originalMapObject,
  activeLayoutName,
  mapTitles,
  product,
  activeMapStyleName,
  options,
}) => {
  const { height, width, isPreview, definitionConstant = 1 } = options;
  return new Promise(async (resolve, reject) => {
    let snapshotMap = document.createElement("div");
    snapshotMap.setAttribute("id", "snapshot_map");

    const isWideOrientation =
      product?.sizeObject?.orientation === ORIENTATIONS.wide;

    const computedPixelBase = Math.floor(
      PRINT_CANVAS_BASE_PX / definitionConstant
    );

    const currentVersionPixelRatio = getCurrentPixelRatio(product.variantId);
    const computedPixelRatio = Number(
      (currentVersionPixelRatio * definitionConstant).toFixed(2)
    );

    let multiple;

    if (isWideOrientation) {
      multiple = computedPixelBase / width;
    } else {
      multiple = computedPixelBase / height;
    }

    Object.assign(snapshotMap.style, {
      width: `${width * multiple}px`,
      height: `${height * multiple}px`,
      // display: "none",
      visibility: "hidden",
    });
    const PlaceToHideBigMap = document.getElementById("place_to_hide_big_map");
    PlaceToHideBigMap.appendChild(snapshotMap);

    setDevicePixelRatio(computedPixelRatio);

    snapshotMapObject = new mapboxgl.Map({
      container: "snapshot_map",
      zoom: originalMapObject.getZoom(),
      minZoom: 0,
      center: originalMapObject.getCenter(),
      style: MAP_STYLES[activeMapStyleName].url,
      preserveDrawingBuffer: true,
    });

    await resizeMapPromise({
      originalMapObject,
      mapObject: snapshotMapObject,
      options: { height, width },
    });

    takeScreenshot(snapshotMapObject).then(async function (data) {
      try {
        const div = document.getElementById("snapshot_map");
        div.parentNode.removeChild(div);

        // alert(JSON.stringify(data));

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
        // alert(JSON.stringify(e));
        console.log({ e });
        setDevicePixelRatio(RUNTIME_PIXEL_RATIO);
      }
    });
  });
};

const getImageFromBase64 = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const imgEl = new Image();
      // alert("Created_Img");

      imgEl.onload = () => {
        resolve(imgEl);
      };

      imgEl.onerror = function (e) {
        console.log("Error loading image", e);
        // alert(JSON.stringify(e));

        reject("Failed to create image");
      };

      console.log(JSON.stringify(data));
      // const theBlob = new Blob([atobX(data)], {
      //   type: "image/png",
      // });

      // const objectURL = URL.createObjectURL(theBlob);
      // alert("Created_objectURL");

      // alert(JSON.stringify({ objectURL: objectURL }));

      imgEl.src = data;
    } catch (Error) {
      console.log("Error in getImageFromBase64", { Error });
    }
  });
};
