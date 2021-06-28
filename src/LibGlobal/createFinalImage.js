// import request from "superagent";
import { drawLayout } from "./drawLayout";

function takeScreenshot(mapLocal) {
  return new Promise(function (resolve, _) {
    mapLocal.once("render", function () {
      resolve(mapLocal.getCanvas().toDataURL());
    });

    /* trigger render */
    mapLocal.setBearing(mapLocal.getBearing());
  });
}

export const createFinalImage = async (
  mapCanvas,
  activeLayout,
  mapTitles,
  product,
  activeMapStyleName
) => {
  return new Promise((resolve, reject) => {
    takeScreenshot(mapCanvas).then(function (data) {
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
          activeLayout,
          mapTitles,
          product,
          isProductionPrint: true,
          activeMapStyleName,
        });

        const finalImgWithLayout = mergerCanvas.toDataURL();

        resolve(finalImgWithLayout);
      };

      image.src = data;
    });
  });
};
