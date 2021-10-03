export const getLayoutImgArray = async (images) => {
  const getLayoutImgPromisses = async (imageObj) => {
    return new Promise((resolve, reject) => {
      try {
        const image = new Image(100, 100);

        image.crossOrigin = "Anonymous";
        image.onload = () => {
          resolve({ ...imageObj, imageEl: image });
        };
        image.src = imageObj.imageUrl;
      } catch (e) {
        console.log({ e });
        reject(e);
      }
    });
  };

  const imagesArrays = images.map((imageObj) =>
    getLayoutImgPromisses(imageObj)
  );

  const resolved = await Promise.all(imagesArrays);

  return resolved;
};
