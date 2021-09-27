import axios from "axios";

import { useQualityImageCreator } from "Hooks/useQualityImageCreator";
import { createUploadRequest } from "LibGlobal/createUploadRequest";

export function useSendSaveBlueprint() {
  const qualityImageCreator = useQualityImageCreator();

  return async ({
    map,
    snapMapInstance,
    activeLayoutName,
    product,
    activeMapStyleName,
  }) => {
    const finalImgSrc = await qualityImageCreator({
      map,
      snapMapInstance,
      activeLayoutName: activeLayoutName,
      product: product,
      activeMapStyleName,
      options: {
        isLowResolution: true,
      },
    });

    createUploadRequest(finalImgSrc, () => {}, axios);
  };
}
