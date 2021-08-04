import { VARIANTS_PRINTFUL } from "../constants/constants";

export const getCurrentPixelRatio = (variantId) => {
  const variantCurrent = VARIANTS_PRINTFUL.find(
    (variant) => variant.id === variantId
  );
  if (!variantCurrent?.PIXEL_RATIO) {
    alert("Missing pixel ratio for variant");
  }
  return variantCurrent?.PIXEL_RATIO;
};
