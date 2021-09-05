import React from "react";

import { createFinalImage } from "LibGlobal/createFinalImage";
// import { useElementDimensions } from "Hooks/useElementDimensions";
import { useTitlesSelector } from "redux/order/reducer";

const mapWrapperId = "map_wrap_2_id";

export function useQualityImageCreator() {
  const mapTitles = useTitlesSelector();

  return async ({
    map,
    snapMapInstance,
    activeLayoutName,
    product,
    activeMapStyleName,
    options,
  }) => {
    console.log("useQualityImageCreator_", { snapMapInstance });
    return createFinalImage({
      originalMapObject: map,
      snapMapInstance,
      activeLayoutName,
      mapTitles: mapTitles,
      product,
      activeMapStyleName,
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
