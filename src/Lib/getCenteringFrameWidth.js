import { getIsVariantFramed } from "../Lib/getIsVariantFramed";
import { getLayoutObject } from "../Lib/getLayoutObject";
import { getBottomBannerHeightKoef } from "../Lib/getBottomBannerHeightKoef";

import { INSIDE_FRAME_COVER_CM } from "../constants/constants";
import { getCurrentPixelRatio } from "./getCurrentPixelRatio";

export const getCenteringFrameWidth = ({
  product,
  // variantId,
  layout: layoutName,
  elWidth,
  elHeight,
  // insideFrameWidth,
}) => {
  let baseLongSize;
  let frameCoverCoefficient;

  console.log({ product });

  const CURRENT_PIXEL_RATIO = getCurrentPixelRatio(product?.variantId);

  if (elHeight > elWidth) {
    baseLongSize = elHeight;
    frameCoverCoefficient = INSIDE_FRAME_COVER_CM / product?.sizeObject.height;
  } else {
    baseLongSize = elWidth;
    frameCoverCoefficient = INSIDE_FRAME_COVER_CM / product?.sizeObject.width;
  }

  const insideFrameWidth = baseLongSize * frameCoverCoefficient;

  const bottomBannerHeightKoef = getBottomBannerHeightKoef(layoutName);
  const bottomBannerHeight =
    (baseLongSize * bottomBannerHeightKoef) / CURRENT_PIXEL_RATIO;

  const layoutObj = getLayoutObject(layoutName);

  console.log({
    insideFrameWidth,
    only_layout: baseLongSize * layoutObj.roundPdng,
  });

  // Layout padding is allways bigger than frame, so it can return regardless of presence of the frame
  if (layoutObj?.roundPdng) {
    return {
      paddingWidth:
        (baseLongSize * layoutObj.roundPdng + insideFrameWidth) /
        CURRENT_PIXEL_RATIO, // this is baseSize!! count it back from this
      isPaddingFromFrame: false,
      bottomBannerHeight,
      bottomBannerHeightKoef,
      isBannerBlur: layoutObj.isBannerBlur,
      layoutObj,
      baseLongSize,
    };
  }

  const variantFrameKoef = getIsVariantFramed(product?.variantId); // TODO redo to

  //Layout pagging has to be always larger than frame

  if (variantFrameKoef) {
    return {
      paddingWidth: insideFrameWidth / CURRENT_PIXEL_RATIO,
      isPaddingFromFrame: true,
      bottomBannerHeight,
      bottomBannerHeightKoef,
      isBannerBlur: layoutObj.isBannerBlur,
      layoutObj,
      baseLongSize,
    };
  }

  console.log("RETURN DEFAUTL VALUE");

  return {
    paddingWidth: 0,
    bottomBannerHeight,
    bottomBannerHeightKoef,
    isBannerBlur: layoutObj.isBannerBlur,
    layoutObj,
    baseLongSize,
  };
};
