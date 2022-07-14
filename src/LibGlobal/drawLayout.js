import { getCenteringLayoutDimensions } from './getCenteringLayoutDimensions'

import {
    LAYOUT_STYLE_NAMES,
    VARIANTS_PRINTFUL,
    TITLES_FONT_DEFAULT,
    INSIDE_FRAME_COVER_CM,
    MAP_STYLES,
    PADDING_COLOR_OPTIONS,
    DEFAULT_FONT_WEIGHT_BOLD,
    DEFAULT_FONT_WEIGHT_THIN
} from '../constants/constants'

// import { getCurrentPixelRatio } from "./getCurrentPixelRatio";
import { getSizeOfTitle } from './getSizeOfTitle'
import { getIsProduction } from './getIsProduction'
import { getLayoutColors } from './getLayoutColors'

// let CURRENT_PIXEL_RATIO;

export function drawLayout(
    ctx,
    { height, width, mapTitles, activeLayoutName, product, isProductionPrint, activeMapStyleName, localPixelRatio }
) {
    const elWidth = width
    const elHeight = height
    const lineWidth = height * 0.0035
    let baseLngSideRaw
    let insideFrameWidth
    let frameCoverCoefficient

    const mapStyleObject = MAP_STYLES[activeMapStyleName]

    const { textLayoutColor, fillLayoutColor } = getLayoutColors({
        product,
        mapStyleObject
    })

    const heading = mapTitles?.heading
    const subtitle = mapTitles?.subtitle

    const frameColor = VARIANTS_PRINTFUL.find(variant => variant.id === product.variantId).frameColor ?? 'red'

    if (height > width) {
        baseLngSideRaw = height
        frameCoverCoefficient = INSIDE_FRAME_COVER_CM / product.sizeObject.height
    } else {
        baseLngSideRaw = width
        frameCoverCoefficient = INSIDE_FRAME_COVER_CM / product.sizeObject.width
    }

    insideFrameWidth = baseLngSideRaw * frameCoverCoefficient //frameWidthKoef;

    const { paddingWidth, isPaddingFromFrame, bottomBannerHeight, isBannerBlur, layoutObj } =
        getCenteringLayoutDimensions({
            product: product,
            // variantId: product.variantId,
            layout: activeLayoutName,
            elWidth: width,
            elHeight: height
            // insideFrameWidth: insideFrameWidth,
        })

    if (!isPaddingFromFrame) {
        drawPaddingWrap({
            ctx,
            paddingSize: paddingWidth,
            layoutPaddingColorOption: layoutObj.paddingColor,
            inheritMapStyleColor: fillLayoutColor,
            elWidth: width,
            elHeight: height
        })
    }

    if (activeLayoutName !== LAYOUT_STYLE_NAMES.PURE) {
        drawBottomBox({
            ctx,
            padding: paddingWidth,
            bannerHeight: bottomBannerHeight,
            elWidth: width,
            elHeight: height,
            isBannerBlur,
            isPaddingFromFrame,
            mapTitles,
            activeLayoutName,
            localPixelRatio,
            fillLayoutColor,
            textLayoutColor,
            baseLngSideRaw
        })
    }

    drawText({
        ctx,
        paddingWidth: paddingWidth / localPixelRatio,
        elWidth: width,
        elHeight: height,
        baseLngSide: baseLngSideRaw,
        heading,
        subtitle,
        layoutObj,
        isProductionPrint,
        textColor: textLayoutColor,
        localPixelRatio
    })

    if (activeLayoutName === LAYOUT_STYLE_NAMES.PURE) {
        // Nothing
    } else if (activeLayoutName === LAYOUT_STYLE_NAMES.BOTTOM_LINE) {
        ctx.beginPath()

        ctx.fillStyle = textLayoutColor

        ctx.fillRect(
            0,
            elHeight - paddingWidth - bottomBannerHeight,
            elWidth,
            layoutObj.bannerTopLineHeightCoef * height // lineWidth
        )
        ctx.stroke()
    } else if (activeLayoutName === LAYOUT_STYLE_NAMES.BORDER_BOX) {
    } else if (activeLayoutName === LAYOUT_STYLE_NAMES.ISLAND_BOX) {
    } else if (activeLayoutName === LAYOUT_STYLE_NAMES.BORDER_BLUR) {
    } else if (activeLayoutName === LAYOUT_STYLE_NAMES.DOUBLE_BORDER) {
        ctx.lineWidth = 0.0015 * baseLngSideRaw
        ctx.strokeStyle = textLayoutColor

        const pdgDoubleKoefficient = 0.75

        const distanceStartXYInnerFrame = paddingWidth
        const distanceStartXYOuterFrame = paddingWidth * pdgDoubleKoefficient

        // inner border
        ctx.strokeRect(
            distanceStartXYInnerFrame,
            distanceStartXYInnerFrame,
            elWidth - distanceStartXYInnerFrame * 2,
            elHeight - distanceStartXYInnerFrame * 2
        )

        // outer border
        ctx.lineWidth = 0.003 * baseLngSideRaw
        ctx.strokeRect(
            distanceStartXYOuterFrame,
            distanceStartXYOuterFrame,
            elWidth - distanceStartXYOuterFrame * 2,
            elHeight - distanceStartXYOuterFrame * 2
        )
    }

    if (insideFrameWidth && !isProductionPrint) {
        drawFrameOverhang(ctx, elWidth, elHeight, insideFrameWidth, frameColor)
    }
}

function drawFrameOverhang(ctx, elWidth, elHeight, frWd, color) {
    // ctx.lineWidth = 7;
    ctx.fillStyle = color
    ctx.fillRect(0, 0, frWd, elHeight + 2)
    ctx.fillRect(0, 0, elWidth, frWd + 2)

    ctx.fillRect(elWidth - frWd, 0, frWd + 2, elHeight)
    ctx.fillRect(0, elHeight - frWd, elWidth, frWd + 2)
    ctx.stroke()
}

function getPaddingColor(layoutColorOption, inheritMapStyleColor) {
    if (layoutColorOption === PADDING_COLOR_OPTIONS.transparent) {
        return 'transparent'
    }
    if (inheritMapStyleColor) {
        return `${inheritMapStyleColor}`
    }
    return 'white'
}

function drawPaddingWrap({ ctx, paddingSize, layoutPaddingColorOption, inheritMapStyleColor, elWidth, elHeight }) {
    ctx.beginPath()
    ctx.fillStyle = getPaddingColor(layoutPaddingColorOption, inheritMapStyleColor)

    ctx.fillRect(0, 0, paddingSize, elHeight)
    ctx.fillRect(0, 0, elWidth, paddingSize)
    ctx.fillRect(elWidth - paddingSize, 0, paddingSize, elHeight)
    ctx.fillRect(0, elHeight - paddingSize, elWidth, paddingSize)
    ctx.stroke()
}

function drawBottomBox({
    ctx,
    padding,
    bannerHeight,
    elWidth,
    elHeight,
    isBannerBlur,
    isPaddingFromFrame,
    mapTitles,
    activeLayoutName,
    localPixelRatio,
    fillLayoutColor,
    textLayoutColor,
    baseLngSideRaw
}) {
    const extraBlurAreaKoef = isBannerBlur ? 1.4 : 1

    var gradient = ctx.createLinearGradient(
        0,
        elHeight - padding - bannerHeight * extraBlurAreaKoef,
        0,
        elHeight - padding
    )

    gradient.addColorStop(0, `${fillLayoutColor}00`)
    gradient.addColorStop(0.1, `${fillLayoutColor}66`)
    gradient.addColorStop(0.3, `${fillLayoutColor}98`)
    gradient.addColorStop(0.4, `${fillLayoutColor}B2`)
    gradient.addColorStop(0.7, `${fillLayoutColor}E1`)
    gradient.addColorStop(1, `${fillLayoutColor}FF`)

    ctx.fillStyle = isBannerBlur ? gradient : `${fillLayoutColor}`

    ctx.beginPath()

    if (activeLayoutName === LAYOUT_STYLE_NAMES.ISLAND_BOX) {
        const htmlLongSideLength = baseLngSideRaw / localPixelRatio

        let dynamicBannerWidth = getSizeOfTitle(mapTitles, htmlLongSideLength) * localPixelRatio * 1.1

        const MIN_WIDTH_BANER_KOEF = 0.2

        if (dynamicBannerWidth < elWidth * MIN_WIDTH_BANER_KOEF) {
            dynamicBannerWidth = elWidth * MIN_WIDTH_BANER_KOEF
        }

        ctx.fillRect(
            0 + (elWidth - dynamicBannerWidth) / 2,
            elHeight - padding - bannerHeight * extraBlurAreaKoef,
            dynamicBannerWidth,
            bannerHeight * extraBlurAreaKoef
        )

        drawFocusCorners({
            ctx,
            dynamicBannerWidth,
            bannerHeight,
            elWidth,
            elHeight,
            padding,
            extraBlurAreaKoef,
            lineColor: textLayoutColor,
            baseLngSideRaw
        })
    } else if (isPaddingFromFrame) {
        ctx.fillRect(
            0,
            elHeight - padding - bannerHeight * extraBlurAreaKoef,
            elWidth,
            bannerHeight * extraBlurAreaKoef + padding
        )
    } else {
        ctx.fillRect(
            padding - 1,
            elHeight - padding - bannerHeight * extraBlurAreaKoef,
            elWidth - padding * 2 + 2,
            bannerHeight * extraBlurAreaKoef + 1
        )
    }

    ctx.stroke()
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
    textColor,
    localPixelRatio
}) {
    const IS_PRODUCTION = getIsProduction()

    // if (IS_PRODUCTION && !isProductionPrint) {
    //   return;
    // }

    const headingCoef = elHeight === baseLngSide ? 0.047 : 0.061
    const subtitleCoef = elHeight === baseLngSide ? 0.015 : 0.018

    const headingText = heading?.text && layoutObj.text.isVisible ? heading?.text : ''
    const subtitleText = subtitle?.text && layoutObj.text.isVisible ? subtitle?.text : ''

    ctx.textBaseline = 'Alphabetic'

    const font = `${DEFAULT_FONT_WEIGHT_BOLD} ${heading?.size * 0.003 * baseLngSide}px ${
        layoutObj.text.title_font || TITLES_FONT_DEFAULT
    }`

    document.fonts.ready.then(() => {})

    ctx.fillStyle = textColor
    ctx.font = `${DEFAULT_FONT_WEIGHT_BOLD} ${heading?.size * 0.003 * baseLngSide}px ${
        layoutObj.text.title_font || TITLES_FONT_DEFAULT
    }`
    ctx.textAlign = layoutObj?.text.align ?? 'center'

    ctx.fillText(
        headingText,
        elWidth * 0.5,
        elHeight * (1 - headingCoef) - paddingWidth * localPixelRatio // paddingWidth * CURRENT_PIXEL_RATIO !important because paddingWidth is relative to longest side
    )

    ctx.fillStyle = textColor
    ctx.font = `${DEFAULT_FONT_WEIGHT_THIN} ${subtitle?.size * 0.003 * baseLngSide}px ${
        layoutObj.text.subtitle_font || TITLES_FONT_DEFAULT
    }`
    ctx.textAlign = layoutObj?.text.align ?? 'center'

    ctx.fillText(
        subtitleText,
        elWidth * 0.5,
        elHeight * (1 - subtitleCoef) - paddingWidth * localPixelRatio // paddingWidth * CURRENT_PIXEL_RATIO !important because paddingWidth is relative to longest side
    )
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
    baseLngSideRaw
}) {
    // ctx.rect(
    //   0 + (elWidth - dynamicBannerWidth) / 2,
    //   elHeight - padding - bannerHeight * extraBlurAreaKoef,
    //   dynamicBannerWidth,
    //   bannerHeight * extraBlurAreaKoef
    // );
    ctx.stroke()
    const realBannerHeight = bannerHeight * extraBlurAreaKoef
    const lineLength = realBannerHeight / 4
    const leftTopX = 0 + (elWidth - dynamicBannerWidth) / 2
    const leftTopY = elHeight - padding - realBannerHeight

    //top-left
    ctx.beginPath()
    ctx.moveTo(leftTopX + lineLength, leftTopY)
    ctx.lineTo(leftTopX, leftTopY)
    ctx.lineTo(leftTopX, leftTopY + lineLength)

    //bottom-left
    ctx.moveTo(leftTopX, leftTopY + realBannerHeight - lineLength)
    ctx.lineTo(leftTopX, leftTopY + realBannerHeight)
    ctx.lineTo(leftTopX + lineLength, leftTopY + realBannerHeight)

    //bottom-right
    ctx.moveTo(leftTopX + dynamicBannerWidth, leftTopY + realBannerHeight - lineLength)
    ctx.lineTo(leftTopX + dynamicBannerWidth, leftTopY + realBannerHeight)
    ctx.lineTo(leftTopX + dynamicBannerWidth - lineLength, leftTopY + realBannerHeight)

    //top-right
    ctx.moveTo(leftTopX + dynamicBannerWidth - lineLength, leftTopY)
    ctx.lineTo(leftTopX + dynamicBannerWidth, leftTopY)
    ctx.lineTo(leftTopX + dynamicBannerWidth, leftTopY + lineLength)

    ctx.lineWidth = 0.001 * baseLngSideRaw
    ctx.strokeStyle = lineColor
    ctx.stroke()
}

module.exports = {
    drawLayout
}
