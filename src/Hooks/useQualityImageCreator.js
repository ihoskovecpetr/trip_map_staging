import React from "react";

import { createFinalImage } from "LibGlobal/createFinalImage";
import { useElementDimensions } from "Hooks/useElementDimensions";

const mapWrapperId = "map_wrap_2_id";

export function useQualityImageCreator() {
  const {
    height: mapWrapperHeight,
    width: mapWrapperWidth,
  } = useElementDimensions("map_wrap_2_id");

  console.log({ mapWrapperHeight, mapWrapperWidth });

  return async ({
    map,
    activeLayoutName,
    mapTitles,
    product,
    activeMapStyleName,
    options,
  }) => {
    console.log("Taking_screenshot:: ", { mapWrapperHeight, mapWrapperWidth });
    return createFinalImage({
      originalMapObject: map,
      activeLayoutName,
      mapTitles,
      product,
      activeMapStyleName,
      options: {
        // height: mapWrapperHeight,
        // width: mapWrapperWidth,
        height: document.getElementById(mapWrapperId)?.getBoundingClientRect()
          .height,
        width: document.getElementById(mapWrapperId)?.getBoundingClientRect()
          .width,
        ...options,
      },
    });
  };
}
