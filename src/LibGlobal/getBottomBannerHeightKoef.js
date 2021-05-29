import { LAYOUTS } from "../constants/constants";

export const getBottomBannerHeightKoef = (layoutName) => {
  const layoutObj = LAYOUTS.find((variant) => variant.name === layoutName);
  return layoutObj.bottomBannerHeight ?? false;
};
