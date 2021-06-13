import { VARIANTS_PRINTFUL } from "../constants/constants";

export const getVariantObject = (variantId) => {
  const variant = VARIANTS_PRINTFUL.find((vers) => vers.id === variantId);
  return variant ?? { frameColor: "red" };
};
