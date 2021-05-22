import { LAYOUTS } from "../constants/constants";

export const getLayoutObject = (layoutName) => {
  const layoutObj = LAYOUTS.find((variant) => variant.name === layoutName);
  return layoutObj ?? false;
};
