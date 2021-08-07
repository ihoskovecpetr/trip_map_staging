import { MAP_STYLES, ORIENTATIONS } from "constants/constants";

export const getResizedImage = async ({
  originalImage,
  max_height,
  max_width,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const image = new Image();
      const image2 = new Image();

      image2.onload = function () {
        resolve(image2);
      };

      image.onerror = function (e) {
        console.log("image_load_error", { e });
        alert("Error while loading icon");
      };

      image.onload = function () {
        const resizingCanvas = document.createElement("canvas");
        const resizingCtx = resizingCanvas.getContext("2d");
        resizingCanvas.height = image.height;
        resizingCanvas.width = image.width;

        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = image.width;
        let height = image.height;

        // Add the resizing logic
        if (width > height) {
          if (width > max_width) {
            height *= max_width / width;
            width = max_width;
          }
        } else {
          if (height > max_height) {
            width *= max_height / height;
            height = max_height;
          }
        }

        resizingCanvas.height = height;
        resizingCanvas.width = width;

        resizingCtx.drawImage(image, 0, 0, width, height);

        image2.src = resizingCanvas.toDataURL();
      };

      image.src = originalImage;
    } catch (e) {
      alert(e);
      reject("Failed");
    }
  });
};
