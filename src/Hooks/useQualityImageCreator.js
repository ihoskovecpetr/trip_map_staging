import React from "react";

import { createFinalImage } from "LibGlobal/createFinalImage";
import { useTitlesSelector } from "redux/order/reducer";

const mapWrapperId = "map_wrap_2_id";

export function useQualityImageCreator() {
  const mapTitles = useTitlesSelector();

  return async ({
    map,
    activeLayoutName,
    product,
    activeMapStyleName,
    konvaRef,
    options,
  }) => {
    return createFinalImage({
      originalMapObject: map,
      activeLayoutName,
      mapTitles: mapTitles,
      product,
      activeMapStyleName,
      konvaRef,
      options: {
        height: document.getElementById(mapWrapperId)?.getBoundingClientRect()
          .height,
        width: document.getElementById(mapWrapperId)?.getBoundingClientRect()
          .width,
        ...options,
      },
    });
  };
}
