import { getIsVariantFramed } from "../Lib/getIsVariantFramed";
import { getLayoutObject } from "../Lib/getLayoutObject";
import { getBottomBannerHeightKoef } from "../Lib/getBottomBannerHeightKoef";

// import { PIXEL_RATIO } from "../constants/constants";
import { getCurrentPixelRatio } from "./getCurrentPixelRatio";

export const getCenteringFrameWidth = ({
  variantId,
  layout: layoutName,
  elWidth,
  elHeight,
}) => {
  let baseLongSize;

  const CURRENT_PIXEL_RATIO = getCurrentPixelRatio(variantId);

  if (elHeight > elWidth) {
    baseLongSize = elHeight;
  } else {
    baseLongSize = elWidth;
  }

  const bottomBannerHeightKoef = getBottomBannerHeightKoef(layoutName);
  const bottomBannerHeight =
    (baseLongSize * bottomBannerHeightKoef) / CURRENT_PIXEL_RATIO;

  const layoutObj = getLayoutObject(layoutName);

  // Layout padding is allways bigger than frame, so it can return regardless of presence of the frame
  if (layoutObj?.roundPdng) {
    return {
      paddingWidth: (baseLongSize * layoutObj.roundPdng) / CURRENT_PIXEL_RATIO, // this is baseSize!! count it back from this
      isPaddingFromFrame: false,
      paddingCoefficient: layoutObj.roundPdng,
      bottomBannerHeight,
      bottomBannerHeightKoef,
      isBannerBlur: layoutObj.isBannerBlur,
      layoutObj,
      baseLongSize,
    };
  }

  const variantFrameKoef = getIsVariantFramed(variantId).frameWidth;

  if (variantFrameKoef) {
    return {
      paddingWidth: (baseLongSize * variantFrameKoef) / CURRENT_PIXEL_RATIO,
      isPaddingFromFrame: true,
      paddingCoefficient: variantFrameKoef,
      bottomBannerHeight,
      bottomBannerHeightKoef,
      isBannerBlur: layoutObj.isBannerBlur,
      layoutObj,
      baseLongSize,
    };
  }

  return {
    paddingWidth: 0,
    paddingCoefficient: 0,
    bottomBannerHeight,
    bottomBannerHeightKoef,
    isBannerBlur: layoutObj.isBannerBlur,
    layoutObj,
    baseLongSize,
  };
};
