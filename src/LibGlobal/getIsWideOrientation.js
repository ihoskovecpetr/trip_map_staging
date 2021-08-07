import { ORIENTATIONS } from "constants/constants";

export const getIsWideOrientation = (product) => {
  return product?.sizeObject?.orientation === ORIENTATIONS.wide;
};
