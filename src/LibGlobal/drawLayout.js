import { getCenteringLayoutDimensions } from "./getCenteringLayoutDimensions";

import {
  LAYOUT_STYLE_NAMES,
  VARIANTS_PRINTFUL,
  FONT_TITLES,
  INSIDE_FRAME_COVER_CM,
} from "../constants/constants";

import { getCurrentPixelRatio } from "./getCurrentPixelRatio";
import { getSizeOfTitle } from "./getSizeOfTitle";

let CURRENT_PIXEL_RATIO;

export function drawLayout(
  ctx,
  {
    height,
    width,
    mapTitles,
    activeLayout: activeLayoutName,
    // frameWidthKoef,
    product,
    isProductionPrint,
  }
) {
  const elWidth = width;
  const elHeight = height;
  const blackLineWidth = height * 0.0035;
  let baseLngSide;
  // let whitePdg;
  // let whitePdgDouble;
  let insideFrameWidth;
  let frameCoverCoefficient;

  CURRENT_PIXEL_RATIO = getCurrentPixelRatio(product.variantId);

  const heading = mapTitles?.heading;
  const subtitle = mapTitles?.subtitle;
  const frameColor =
    VARIANTS_PRINTFUL.find((variant) => variant.id === product.variantId)
      .frameColor ?? "red";

  if (height > width) {
    baseLngSide = height;
    frameCoverCoefficient = INSIDE_FRAME_COVER_CM / product.sizeObject.height;
  } else {
    baseLngSide = width;
    frameCoverCoefficient = INSIDE_FRAME_COVER_CM / product.sizeObject.width;
  }

  insideFrameWidth = baseLngSide * frameCoverCoefficient; //frameWidthKoef;

  const {
    paddingWidth,
    isPaddingFromFrame,
    bottomBannerHeight,
    isBannerBlur,
    layoutObj,
  } = getCenteringLayoutDimensions({
    product: product,
    // variantId: product.variantId,
    layout: activeLayoutName,
    elWidth: width,
    elHeight: height,
    // insideFrameWidth: insideFrameWidth,
  });

  if (!isPaddingFromFrame) {
    drawPaddingWrap({
      ctx,
      padding: paddingWidth * CURRENT_PIXEL_RATIO,
      elWidth: width,
      elHeight: height,
      layoutObj,
    });
  }

  drawBottomBox({
    ctx,
    padding: paddingWidth * CURRENT_PIXEL_RATIO,
    bannerHeight: bottomBannerHeight * CURRENT_PIXEL_RATIO,
    elWidth: width,
    elHeight: height,
    isBannerBlur,
    isPaddingFromFrame,
    heading,
    subtitle,
    activeLayoutName,
    CURRENT_PIXEL_RATIO,
  });

  drawText({
    ctx,
    paddingWidth,
    elWidth: width,
    elHeight: height,
    baseLngSide,
    heading,
    subtitle,
    layoutObj,
  });

  if (activeLayoutName === LAYOUT_STYLE_NAMES.PURE) {
    // Nothing
  } else if (activeLayoutName === LAYOUT_STYLE_NAMES.BOTTOM_LINE) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(
      0,
      elHeight -
        paddingWidth * CURRENT_PIXEL_RATIO -
        bottomBannerHeight * CURRENT_PIXEL_RATIO,
      elWidth,
      blackLineWidth
    );
    ctx.stroke();
  } else if (activeLayoutName === LAYOUT_STYLE_NAMES.BORDER_BOX) {
  } else if (activeLayoutName === LAYOUT_STYLE_NAMES.ISLAND_BOX) {
  } else if (activeLayoutName === LAYOUT_STYLE_NAMES.BORDER_BLUR) {
  } else if (activeLayoutName === LAYOUT_STYLE_NAMES.DOUBLE_BORDER) {
    ctx.lineWidth = 0.0015 * baseLngSide;
    ctx.strokeStyle = "black";

    const pdgDoubleKoefficient = 0.75;

    const distanceStartXYInnerFrame = paddingWidth * CURRENT_PIXEL_RATIO;
    const distanceStartXYOuterFrame =
      paddingWidth * CURRENT_PIXEL_RATIO * pdgDoubleKoefficient;

    // inner border
    ctx.strokeRect(
      distanceStartXYInnerFrame,
      distanceStartXYInnerFrame,
      elWidth - distanceStartXYInnerFrame * 2,
      elHeight - distanceStartXYInnerFrame * 2
    );

    // outer border
    ctx.lineWidth = 0.003 * baseLngSide;

    ctx.strokeRect(
      distanceStartXYOuterFrame,
      distanceStartXYOuterFrame,
      elWidth - distanceStartXYOuterFrame * 2,
      elHeight - distanceStartXYOuterFrame * 2
    );
  }

  if (insideFrameWidth && !isProductionPrint) {
    drawFrame(ctx, elWidth, elHeight, insideFrameWidth, frameColor);
  }
}

function drawFrame(ctx, elWidth, elHeight, frWd, color) {
  // ctx.lineWidth = 7;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, frWd, elHeight);
  ctx.fillRect(0, 0, elWidth, frWd);
  ctx.fillRect(elWidth - frWd, 0, frWd, elHeight);
  ctx.fillRect(0, elHeight - frWd, elWidth, frWd);
  ctx.stroke();
}

function drawPaddingWrap({ ctx, padding, elWidth, elHeight, layoutObj }) {
  ctx.beginPath();
  ctx.fillStyle = layoutObj.paddingColor;
  ctx.fillRect(0, 0, padding, elHeight);
  ctx.fillRect(0, 0, elWidth, padding);
  ctx.fillRect(elWidth - padding, 0, padding, elHeight);
  ctx.fillRect(0, elHeight - padding, elWidth, padding);
  ctx.stroke();
}

function drawBottomBox({
  ctx,
  padding,
  bannerHeight,
  elWidth,
  elHeight,
  isBannerBlur,
  isPaddingFromFrame,
  heading,
  subtitle,
  activeLayoutName,
  CURRENT_PIXEL_RATIO,
}) {
  const extraBlueAreaKoef = isBannerBlur ? 1.4 : 1;

  var gradient = ctx.createLinearGradient(
    0,
    elHeight - padding - bannerHeight * extraBlueAreaKoef,
    0,
    elHeight - padding
  );

  gradient.addColorStop(0, "rgba(255,255,255,0.1)");
  gradient.addColorStop(0.1, "rgba(255,255,255,0.4)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.6)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.7)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.9)");
  gradient.addColorStop(1, "rgba(255,255,255,1)");

  ctx.fillStyle = isBannerBlur ? gradient : "white";

  ctx.beginPath();

  if (activeLayoutName === LAYOUT_STYLE_NAMES.ISLAND_BOX) {
    console.log("heading.text, subtitle.text: ", heading?.text, subtitle?.text);
    let dynamicBannerWidth =
      getSizeOfTitle(heading?.text, subtitle?.text) * CURRENT_PIXEL_RATIO * 1.2;
    if (dynamicBannerWidth < elWidth * 0.2) {
      dynamicBannerWidth = elWidth * 0.2;
    }

    ctx.fillRect(
      0 + (elWidth - dynamicBannerWidth) / 2,
      elHeight - padding - bannerHeight * extraBlueAreaKoef,
      dynamicBannerWidth,
      bannerHeight * extraBlueAreaKoef
    );
  } else if (isPaddingFromFrame) {
    ctx.fillRect(
      0,
      elHeight - padding - bannerHeight * extraBlueAreaKoef,
      elWidth,
      bannerHeight * extraBlueAreaKoef + padding
    );
  } else {
    ctx.fillRect(
      padding - 1,
      elHeight - padding - bannerHeight * extraBlueAreaKoef,
      elWidth - padding * 2 + 2,
      bannerHeight * extraBlueAreaKoef + 1
    );
  }

  ctx.stroke();
}

function drawText({
  ctx,
  paddingWidth,
  elWidth,
  elHeight,
  baseLngSide,
  heading,
  subtitle,
  layoutObj,
}) {
  // const headingCoef = elHeight === baseLngSide ? 0.06 : 0.077;
  // const subtitleCoef = elHeight === baseLngSide ? 0.0275 : 0.033;

  const headingCoef = elHeight === baseLngSide ? 0.047 : 0.061;
  const subtitleCoef = elHeight === baseLngSide ? 0.015 : 0.018;

  const headingText =
    heading?.text && layoutObj.text.isVisible ? heading?.text : "";
  const subtitleText =
    subtitle?.text && layoutObj.text.isVisible ? subtitle?.text : "";

  ctx.textBaseline = "Alphabetic";

  ctx.fillStyle = "black";
  ctx.font = `${heading?.size * 0.001 * 3 * baseLngSide}px ${FONT_TITLES}`;
  ctx.textAlign = layoutObj?.text.align ?? "center";
  ctx.fillText(
    headingText,
    elWidth * 0.5,
    elHeight * (1 - headingCoef) - paddingWidth * CURRENT_PIXEL_RATIO // paddingWidth * CURRENT_PIXEL_RATIO !important because paddingWidth is relative to longest side
  );
  ctx.fillStyle = "black";
  ctx.font = `100 ${subtitle?.size * 0.003 * baseLngSide}px ${FONT_TITLES}`;
  ctx.textAlign = layoutObj?.text.align ?? "center";
  ctx.fillText(
    subtitleText,
    elWidth * 0.5,
    elHeight * (1 - subtitleCoef) - paddingWidth * CURRENT_PIXEL_RATIO // paddingWidth * CURRENT_PIXEL_RATIO !important because paddingWidth is relative to longest side
  );
}

module.exports = {
  drawLayout,
};
