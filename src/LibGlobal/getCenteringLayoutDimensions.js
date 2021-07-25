import { getLayoutObject } from "./getLayoutObject";
import { getBottomBannerHeightKoef } from "./getBottomBannerHeightKoef";
import { getCurrentPixelRatio } from "./getCurrentPixelRatio";

import { INSIDE_FRAME_COVER_CM } from "../constants/constants";

export const getCenteringLayoutDimensions = ({
  product,
  layout: layoutName,
  elWidth,
  elHeight,
}) => {
  let baseLongSize;
  let frameCoverCoefficient;

  // const CURRENT_PIXEL_RATIO = getCurrentPixelRatio(product?.variantId);

  if (elHeight > elWidth) {
    baseLongSize = elHeight;
    frameCoverCoefficient = INSIDE_FRAME_COVER_CM / product?.sizeObject.height;
  } else {
    baseLongSize = elWidth;
    frameCoverCoefficient = INSIDE_FRAME_COVER_CM / product?.sizeObject.width;
  }

  // const framedVariantObject = getVariantObject(product?.variantId); // TODO redo to

  const insideFrameWidth = baseLongSize * frameCoverCoefficient;
  const bottomBannerHeightKoef = getBottomBannerHeightKoef(layoutName);
  const bottomBannerHeight = baseLongSize * bottomBannerHeightKoef;

  const layoutObj = getLayoutObject(layoutName);

  // Layout padding is allways bigger than frame, so it can return regardless of presence of the frame
  if (layoutObj?.roundPdng) {
    return {
      paddingWidth: baseLongSize * layoutObj.roundPdng + insideFrameWidth,
      isPaddingFromFrame: false,
      bottomBannerHeight,
      bottomBannerHeightKoef,
      isBannerBlur: layoutObj.isBannerBlur,
      layoutObj,
      baseLongSize,
    };
  }

  return {
    paddingWidth: insideFrameWidth,
    isPaddingFromFrame: true,
    bottomBannerHeight,
    bottomBannerHeightKoef,
    isBannerBlur: layoutObj.isBannerBlur,
    layoutObj,
    baseLongSize,
  };
};
