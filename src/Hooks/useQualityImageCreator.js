import React from "react";

import { createFinalImage } from "LibGlobal/createFinalImage";
// import { useElementDimensions } from "Hooks/useElementDimensions";
import { useTitlesSelector } from "redux/order/reducer";

const mapWrapperId = "map_wrap_2_id";

export function useQualityImageCreator() {
  // const {
  //   height: mapWrapperHeight,
  //   width: mapWrapperWidth,
  // } = useElementDimensions("map_wrap_2_id");
  const mapTitles = useTitlesSelector();

  return async ({
    map,
    activeLayoutName,
    product,
    activeMapStyleName,
    options,
  }) => {
    return createFinalImage({
      originalMapObject: map,
      activeLayoutName,
      mapTitles: mapTitles,
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
