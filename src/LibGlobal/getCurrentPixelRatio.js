import { VARIANTS_PRINTFUL, PIXEL_RATIO } from "../constants/constants";

export const getCurrentPixelRatio = (variantId) => {
  const variantCurrent = VARIANTS_PRINTFUL.find(
    (variant) => variant.id === variantId
  );
  return variantCurrent?.PIXEL_RATIO ?? PIXEL_RATIO;
};
