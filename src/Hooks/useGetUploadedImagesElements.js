import { useState, useEffect, useMemo } from "react";

import { getLayoutImgArray } from "LibGlobal/getLayoutImgArray";

export function useGetUploadedImagesElements(images) {
  const [enrichedImages, setEnrichedImages] = useState([]);

  // useEffect(() => {
  //   const makeAsyncThing = async () => {
  //     const newImages = images.filter(
  //       (image) =>
  //         !enrichedImages.some(
  //           (enriched) => enriched.sourceId === image.sourceId
  //         )
  //     );

  //     console.log({ newImages });
  //     const imagesArr = await getLayoutImgArray(newImages);

  //     setEnrichedImages((prev) => [...prev, ...imagesArr]);
  //   };

  //   if (images.length) {
  //     makeAsyncThing();
  //   }
  // }, [images]);

  const enrichedImages_memo = useMemo(() => {
    return enrichedImages;
  }, [enrichedImages]);

  return enrichedImages_memo;
}
