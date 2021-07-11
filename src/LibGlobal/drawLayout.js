import { getCenteringLayoutDimensions } from "./getCenteringLayoutDimensions";

import {
  LAYOUT_STYLE_NAMES,
  VARIANTS_PRINTFUL,
  TITLES_FONT_DEFAULT,
  INSIDE_FRAME_COVER_CM,
  MAP_STYLES,
  PADDING_COLOR_OPTIONS,
  DEFAULT_FONT_WEIGHT_BOLD,
  DEFAULT_FONT_WEIGHT_THIN,
} from "../constants/constants";

import { getCurrentPixelRatio } from "./getCurrentPixelRatio";
import { getSizeOfTitle } from "./getSizeOfTitle";
import { getIsProduction } from "./getIsProduction";
import { IoIosReturnLeft } from "react-icons/io";

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
    activeMapStyleName,
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

  const mapStyleObject = MAP_STYLES[activeMapStyleName];

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
      paddingSize: paddingWidth * CURRENT_PIXEL_RATIO,
      layoutPaddingColorOption: layoutObj.paddingColor,
      inheritMapStyleColor: mapStyleObject.layoutColor,
      elWidth: width,
      elHeight: height,
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
    fillColor: mapStyleObject.layoutColor
      ? `#${mapStyleObject.layoutColor}`
      : undefined,
    mapStyleObject,
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
    isProductionPrint,
    textColor: mapStyleObject.textColor
      ? `#${mapStyleObject.textColor}`
      : "black",
  });

  if (activeLayoutName === LAYOUT_STYLE_NAMES.PURE) {
    // Nothing
  } else if (activeLayoutName === LAYOUT_STYLE_NAMES.BOTTOM_LINE) {
    ctx.beginPath();

    ctx.fillStyle = mapStyleObject.textColor
      ? `#${mapStyleObject.textColor}`
      : "black";

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
    ctx.strokeStyle = mapStyleObject.textColor
      ? `#${mapStyleObject.textColor}`
      : "black";

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
    drawFrameOverhang(ctx, elWidth, elHeight, insideFrameWidth, frameColor);
  }
}

function drawFrameOverhang(ctx, elWidth, elHeight, frWd, color) {
  // ctx.lineWidth = 7;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, frWd, elHeight + 2);
  ctx.fillRect(0, 0, elWidth, frWd + 2);

  ctx.fillRect(elWidth - frWd, 0, frWd + 2, elHeight);
  ctx.fillRect(0, elHeight - frWd, elWidth, frWd + 2);
  ctx.stroke();
}

function getPaddingColor(layoutColorOption, inheritMapStyleColor) {
  if (layoutColorOption === PADDING_COLOR_OPTIONS.transparent) {
    return "transparent";
  }
  if (inheritMapStyleColor) {
    return `#${inheritMapStyleColor}`;
  }
  return "white";
}

function drawPaddingWrap({
  ctx,
  paddingSize,
  layoutPaddingColorOption,
  inheritMapStyleColor,
  elWidth,
  elHeight,
}) {
  ctx.beginPath();
  ctx.fillStyle = getPaddingColor(
    layoutPaddingColorOption,
    inheritMapStyleColor
  );
  ctx.fillRect(0, 0, paddingSize, elHeight);
  ctx.fillRect(0, 0, elWidth, paddingSize);
  ctx.fillRect(elWidth - paddingSize, 0, paddingSize, elHeight);
  ctx.fillRect(0, elHeight - paddingSize, elWidth, paddingSize);
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
  fillColor = "#ffffff",
  mapStyleObject,
}) {
  const extraBlurAreaKoef = isBannerBlur ? 1.4 : 1;

  var gradient = ctx.createLinearGradient(
    0,
    elHeight - padding - bannerHeight * extraBlurAreaKoef,
    0,
    elHeight - padding
  );

  // gradient.addColorStop(0, "rgba(255,255,255,0.0)");
  // gradient.addColorStop(0.1, "rgba(255,255,255,0.4)");
  // gradient.addColorStop(0.3, "rgba(255,255,255,0.6)");
  // gradient.addColorStop(0.4, "rgba(255,255,255,0.7)");
  // gradient.addColorStop(0.7, "rgba(255,255,255,0.9)");
  // gradient.addColorStop(1, "rgba(255,255,255,1)");

  gradient.addColorStop(0, `${fillColor}00`);
  gradient.addColorStop(0.1, `${fillColor}66`);
  gradient.addColorStop(0.3, `${fillColor}98`);
  gradient.addColorStop(0.4, `${fillColor}B2`);
  gradient.addColorStop(0.7, `${fillColor}E1`);
  gradient.addColorStop(1, `${fillColor}FF`);

  ctx.fillStyle = isBannerBlur ? gradient : `${fillColor}`;

  ctx.beginPath();

  if (activeLayoutName === LAYOUT_STYLE_NAMES.ISLAND_BOX) {
    let dynamicBannerWidth =
      getSizeOfTitle(heading?.text, subtitle?.text) * CURRENT_PIXEL_RATIO * 1.2;

    const MIN_WIDTH_BANER_KOEF = 0.2;

    if (dynamicBannerWidth < elWidth * MIN_WIDTH_BANER_KOEF) {
      dynamicBannerWidth = elWidth * MIN_WIDTH_BANER_KOEF;
    }

    ctx.fillRect(
      0 + (elWidth - dynamicBannerWidth) / 2,
      elHeight - padding - bannerHeight * extraBlurAreaKoef,
      dynamicBannerWidth,
      bannerHeight * extraBlurAreaKoef
    );

    drawFocusCorners({
      ctx,
      dynamicBannerWidth,
      bannerHeight,
      elWidth,
      elHeight,
      padding,
      extraBlurAreaKoef,
      lineColor: mapStyleObject.textColor
        ? `#${mapStyleObject.textColor}`
        : "black",
    });
  } else if (isPaddingFromFrame) {
    ctx.fillRect(
      0,
      elHeight - padding - bannerHeight * extraBlurAreaKoef,
      elWidth,
      bannerHeight * extraBlurAreaKoef + padding
    );
  } else {
    ctx.fillRect(
      padding - 1,
      elHeight - padding - bannerHeight * extraBlurAreaKoef,
      elWidth - padding * 2 + 2,
      bannerHeight * extraBlurAreaKoef + 1
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
  isProductionPrint,
  textColor = "black",
}) {
  // const headingCoef = elHeight === baseLngSide ? 0.06 : 0.077;
  // const subtitleCoef = elHeight === baseLngSide ? 0.0275 : 0.033;

  const IS_PRODUCTION = getIsProduction();

  if (IS_PRODUCTION && !isProductionPrint) {
    return;
  }

  const headingCoef = elHeight === baseLngSide ? 0.047 : 0.061;
  const subtitleCoef = elHeight === baseLngSide ? 0.015 : 0.018;

  const headingText =
    heading?.text && layoutObj.text.isVisible ? heading?.text : "";
  const subtitleText =
    subtitle?.text && layoutObj.text.isVisible ? subtitle?.text : "";

  ctx.textBaseline = "Alphabetic";

  ctx.fillStyle = textColor;
  ctx.font = `${DEFAULT_FONT_WEIGHT_BOLD} ${
    heading?.size * 0.001 * 3 * baseLngSide
  }px ${TITLES_FONT_DEFAULT}`;
  ctx.textAlign = layoutObj?.text.align ?? "center";

  ctx.fillText(
    headingText,
    elWidth * 0.5,
    elHeight * (1 - headingCoef) - paddingWidth * CURRENT_PIXEL_RATIO // paddingWidth * CURRENT_PIXEL_RATIO !important because paddingWidth is relative to longest side
  );

  ctx.fillStyle = textColor;
  ctx.font = `${DEFAULT_FONT_WEIGHT_THIN} ${
    subtitle?.size * 0.003 * baseLngSide
  }px ${TITLES_FONT_DEFAULT}`;
  ctx.textAlign = layoutObj?.text.align ?? "center";

  ctx.fillText(
    subtitleText,
    elWidth * 0.5,
    elHeight * (1 - subtitleCoef) - paddingWidth * CURRENT_PIXEL_RATIO // paddingWidth * CURRENT_PIXEL_RATIO !important because paddingWidth is relative to longest side
  );
}

function drawFocusCorners({
  ctx,
  dynamicBannerWidth,
  bannerHeight,
  elWidth,
  elHeight,
  padding,
  extraBlurAreaKoef,
  lineColor,
}) {
  // ctx.rect(
  //   0 + (elWidth - dynamicBannerWidth) / 2,
  //   elHeight - padding - bannerHeight * extraBlurAreaKoef,
  //   dynamicBannerWidth,
  //   bannerHeight * extraBlurAreaKoef
  // );
  ctx.stroke();
  const realBannerHeight = bannerHeight * extraBlurAreaKoef;
  const lineLength = realBannerHeight / 4;
  const leftTopX = 0 + (elWidth - dynamicBannerWidth) / 2;
  const leftTopY = elHeight - padding - realBannerHeight;

  //top-left
  ctx.beginPath();
  ctx.moveTo(leftTopX + lineLength, leftTopY);
  ctx.lineTo(leftTopX, leftTopY);
  ctx.lineTo(leftTopX, leftTopY + lineLength);

  //bottom-left
  ctx.moveTo(leftTopX, leftTopY + realBannerHeight - lineLength);
  ctx.lineTo(leftTopX, leftTopY + realBannerHeight);
  ctx.lineTo(leftTopX + lineLength, leftTopY + realBannerHeight);

  //bottom-right
  ctx.moveTo(
    leftTopX + dynamicBannerWidth,
    leftTopY + realBannerHeight - lineLength
  );
  ctx.lineTo(leftTopX + dynamicBannerWidth, leftTopY + realBannerHeight);
  ctx.lineTo(
    leftTopX + dynamicBannerWidth - lineLength,
    leftTopY + realBannerHeight
  );

  //top-right
  ctx.moveTo(leftTopX + dynamicBannerWidth - lineLength, leftTopY);
  ctx.lineTo(leftTopX + dynamicBannerWidth, leftTopY);
  ctx.lineTo(leftTopX + dynamicBannerWidth, leftTopY + lineLength);

  ctx.lineWidth = 1 * CURRENT_PIXEL_RATIO;
  ctx.strokeStyle = lineColor;
  ctx.stroke();
}

module.exports = {
  drawLayout,
};
