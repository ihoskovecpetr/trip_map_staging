const IS_CLIENT = typeof window !== "undefined";

const PIXEL_RATIO = 8; //  x / 96 (8 is the good value)

const TAX_PERCENTAGE = 0;
const GROSS_PROFIT_PERCENTAGE = 20;

const BOTTOM_LAYOUT_SIZE = 1 / 8;

const MOBILE_WIDTH_SIZE_PX = 768;

const TAXES_KOEFICIENT = 1.2;
const MARKUP_KOEFICIENT = 1.2;

const LAY_SINGLE_FRAME_PDNG = 0.015;
const LAY_DOUBLE_FRAME_PDNG = 0.025;
const TRANSPARENT_PADDING = 0.025;

const BOTTOM_BANNER = 0.09;
const BLURRED_AREA_HEIGHT = 0.09;
const FONT_TITLES = "Source Code Pro";

const FRAME_COLOR_WHITE = "#F5F5F5";
const FRAME_COLOR_BLACK = "black";
const FRAME_COLOR_TRANSPARENT = "transparent";

const sizeNames = {
  "61X91cm": "61X91cm",
  "91X61cm": "91X61cm",
  "50X70cm": "50X70cm",
  "70X50cm": "70X50cm",
  "30X40cm": "30X40cm",
  "40X30cm": "40X30cm",
};

const FRAME_OPTION_NAMES = {
  NO_FRAME: "Bez rámu",
  WHITE_FRAME: "Bílý rám",
  BLACK_FRAME: "Černý rám",
};

const ORIENTATIONS = { wide: "wide", tall: "tall" };

const SIZES = [
  {
    ratio: 30 / 40,
    name: "30 x 40 cm",
    code: sizeNames["30X40cm"],
    orientation: ORIENTATIONS.wide,
    acceptableSizes: [sizeNames["30X40cm"], sizeNames["40X30cm"]],
  },
  {
    ratio: 40 / 30,
    name: "40 x 30 cm",
    code: sizeNames["40X30cm"],
    orientation: ORIENTATIONS.tall,
    acceptableSizes: [sizeNames["30X40cm"], sizeNames["40X30cm"]],
  },

  {
    ratio: 50 / 70,
    name: "50 x 70 cm",
    code: sizeNames["50X70cm"],
    orientation: ORIENTATIONS.wide,
    acceptableSizes: [sizeNames["50X70cm"], sizeNames["70X50cm"]],
  },
  {
    ratio: 70 / 50,
    name: "70 x 50 cm",
    code: sizeNames["70X50cm"],
    orientation: ORIENTATIONS.tall,
    acceptableSizes: [sizeNames["70X50cm"], sizeNames["50X70cm"]],
  },

  {
    ratio: 61 / 91,
    name: "61 x 91 cm",
    code: sizeNames["61X91cm"],
    orientation: ORIENTATIONS.wide,
    acceptableSizes: [sizeNames["61X91cm"], sizeNames["91X61cm"]],
  },
  {
    ratio: 91 / 61,
    name: "91 x 61 cm",
    code: sizeNames["91X61cm"],
    orientation: ORIENTATIONS.tall,
    acceptableSizes: [sizeNames["61X91cm"], sizeNames["91X61cm"]],
  },
];

const SHIPMENT_RATES = {
  LARGE_FRAMED_CZK: "shr_1Is8E8KQWovk2rIh8PYbZlYn",
  SMALL_FRAMED_OR_NO_FRAME_CZK: "shr_1Is8D6KQWovk2rIh5C1Hbd66",
};

const VARIANTS_PRINTFUL = [
  {
    id: 8948,
    frameColor: FRAME_COLOR_TRANSPARENT,
    frameWidth: 0,
    frameOutsideKoef: 0,
    sizeName: sizeNames["30X40cm"],
    frameName: FRAME_OPTION_NAMES.NO_FRAME,
    PIXEL_RATIO: 4,
    shipping: {
      codeCZ: SHIPMENT_RATES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: 169,
      currency: "CZK",
    },
  },
  {
    id: 9357,
    frameColor: FRAME_COLOR_BLACK,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: sizeNames["30X40cm"],
    frameName: FRAME_OPTION_NAMES.BLACK_FRAME,
    PIXEL_RATIO: 4,
    shipping: {
      codeCZ: SHIPMENT_RATES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: 169,
      currency: "CZK",
    },
  },
  {
    id: 10297,
    frameColor: FRAME_COLOR_WHITE,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: sizeNames["30X40cm"],
    PIXEL_RATIO: 4,
    frameName: FRAME_OPTION_NAMES.WHITE_FRAME,
    shipping: {
      codeCZ: SHIPMENT_RATES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: 169,
      currency: "CZK",
    },
  },

  {
    id: 8952,
    frameColor: FRAME_COLOR_TRANSPARENT,
    frameWidth: 0,
    frameOutsideKoef: 0,
    sizeName: sizeNames["50X70cm"],
    frameName: FRAME_OPTION_NAMES.NO_FRAME,
    PIXEL_RATIO: 6,
    shipping: {
      codeCZ: SHIPMENT_RATES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: 169,
      currency: "CZK",
    },
  },
  {
    id: 9358,
    frameColor: FRAME_COLOR_BLACK,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: sizeNames["50X70cm"],
    frameName: FRAME_OPTION_NAMES.BLACK_FRAME,
    PIXEL_RATIO: 6,
    shipping: {
      codeCZ: SHIPMENT_RATES.LARGE_FRAMED_CZK,
      price: 569,
      currency: "CZK",
    },
  },
  {
    id: 10298,
    frameColor: FRAME_COLOR_WHITE,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: sizeNames["50X70cm"],
    frameName: FRAME_OPTION_NAMES.WHITE_FRAME,
    PIXEL_RATIO: 6,
    shipping: {
      codeCZ: SHIPMENT_RATES.LARGE_FRAMED_CZK,
      price: 569,
      currency: "CZK",
    },
  },

  {
    id: 8953,
    frameColor: FRAME_COLOR_TRANSPARENT,
    frameWidth: 0,
    frameOutsideKoef: 0,
    sizeName: sizeNames["61X91cm"],
    frameName: FRAME_OPTION_NAMES.NO_FRAME,
    PIXEL_RATIO: 8,
    shipping: {
      codeCZ: SHIPMENT_RATES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: 169,
      currency: "CZK",
    },
  },
  {
    id: 9359,
    frameColor: FRAME_COLOR_BLACK,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: sizeNames["61X91cm"],
    frameName: FRAME_OPTION_NAMES.BLACK_FRAME,
    PIXEL_RATIO: 8,
    shipping: {
      codeCZ: SHIPMENT_RATES.LARGE_FRAMED_CZK,
      price: 569,
      currency: "CZK",
    },
  },
  {
    id: 10299,
    frameColor: FRAME_COLOR_WHITE,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: sizeNames["61X91cm"],
    frameName: FRAME_OPTION_NAMES.WHITE_FRAME,
    PIXEL_RATIO: 8,
    shipping: {
      codeCZ: SHIPMENT_RATES.LARGE_FRAMED_CZK,
      price: 569,
      currency: "CZK",
    },
  },
];

const LAYOUT_STYLE_NAMES = {
  PURE: "Pure",
  ISLAND_BOX: "Island Box",
  BOTTOM_BLUR: "Bottom Blur",
  BOTTOM_LINE: "Bottom line",
  BORDER_BOX: "Border box",
  BORDER_BLUR: "Border Blur",
  DOUBLE_BORDER_BLUR: "Double Border Blur",
};

const LAYOUTS = [
  {
    name: LAYOUT_STYLE_NAMES.PURE,
    roundPdng: null,
    paddingColor: "white",
    bottomBanner: null,
    isBannerBlur: false,
    text: {
      isVisible: false,
      align: "center",
    },
  },
  {
    name: LAYOUT_STYLE_NAMES.ISLAND_BOX,
    roundPdng: TRANSPARENT_PADDING,
    paddingColor: "transparent",
    bottomBanner: BOTTOM_BANNER,
    isBannerBlur: false,
    text: {
      isVisible: true,
      align: "center",
    },
  },
  {
    name: LAYOUT_STYLE_NAMES.BOTTOM_BLUR,
    roundPdng: 0,
    paddingColor: "white",
    bottomBanner: BLURRED_AREA_HEIGHT,
    isBannerBlur: true,
    text: {
      isVisible: true,
      align: "center",
    },
  },
  {
    name: LAYOUT_STYLE_NAMES.BOTTOM_LINE,
    roundPdng: null,
    paddingColor: "white",
    bottomBanner: BOTTOM_BANNER,
    isBannerBlur: false,
    text: {
      isVisible: true,
      align: "center",
    },
  },
  {
    name: LAYOUT_STYLE_NAMES.BORDER_BOX,
    roundPdng: null,
    paddingColor: "white",
    bottomBanner: BOTTOM_BANNER,
    isBannerBlur: false,
    text: {
      isVisible: true,
      align: "center",
    },
  },
  // {
  //   name: LAYOUT_STYLE_NAMES.BORDER_BLUR,
  //   roundPdng: LAY_SINGLE_FRAME_PDNG,
  //   paddingColor: "white",
  //   bottomBanner: BLURRED_AREA_HEIGHT,
  //   isBannerBlur: true,
  //   text: {
  //     isVisible: true,
  //     align: "center",
  //   },
  // },
  {
    name: LAYOUT_STYLE_NAMES.DOUBLE_BORDER_BLUR,
    roundPdng: LAY_DOUBLE_FRAME_PDNG,
    paddingColor: "white",
    bottomBanner: BLURRED_AREA_HEIGHT,
    isBannerBlur: true,
    text: {
      isVisible: true,
      align: "center",
    },
  },
];

const MAP_STYLES_NAMES = {
  WHITE_GREY: "White Grey",
  OLD_SANDY_GREY: "Old Sandy Grey",
  WHITE_LIGHT_BLUE: "White Light Blue",
  WHITE_BLUE: "White Blue",
  SANDY_ORANGE_BLUE: "Sandy Orange Blue",
  LOW_CONTRAST_GREEN: "Low Contrast Green",
  MUSTARD_BLUE: "Mustard Blue",
  SANDY_DARK: "Sandy Dark",
};

const MAP_STYLES = {
  [MAP_STYLES_NAMES.WHITE_GREY]:
    "mapbox://styles/petrhoskovec/ckmzzqlni0n5j17pbfvgf27n9",
  [MAP_STYLES_NAMES.WHITE_LIGHT_BLUE]:
    "mapbox://styles/petrhoskovec/ckolm2l7k23ck18mwrl2jkgcg",
  [MAP_STYLES_NAMES.WHITE_BLUE]:
    "mapbox://styles/petrhoskovec/ckmzzsrsl0naa17o3ki2xzuoj",
  [MAP_STYLES_NAMES.MUSTARD_BLUE]:
    "mapbox://styles/petrhoskovec/ckolmiq3f4u9217p9v8fmln15",
  // "mapbox://styles/petrhoskovec/ckmzytwvh0m7117nzc9jvdotq",
  [MAP_STYLES_NAMES.DARK_BLUE]:
    "mapbox://styles/petrhoskovec/ckmzyuv5w0mat17n5ybl7hxxl",
  [MAP_STYLES_NAMES.SANDY_DARK]:
    "mapbox://styles/petrhoskovec/ckmzz4z6y0mgx17s4lw0zeyho",
  [MAP_STYLES_NAMES.OLD_SANDY_GREY]:
    "mapbox://styles/petrhoskovec/ckn0f7lbu12je17s4itrmuuh5",

  [MAP_STYLES_NAMES.SANDY_ORANGE_BLUE]:
    "mapbox://styles/petrhoskovec/ckn0ffdn112v017jxv6ei1jnu",
  [MAP_STYLES_NAMES.LOW_CONTRAST_GREEN]:
    "mapbox://styles/petrhoskovec/ckollex8z78ly18mu9jmefwnz",
  // "mapbox://styles/petrhoskovec/ckn0g6q5c13qd17pesvzalp62",
};

module.exports = {
  IS_CLIENT,
  PIXEL_RATIO,
  TAX_PERCENTAGE,
  GROSS_PROFIT_PERCENTAGE,
  BOTTOM_LAYOUT_SIZE,
  MOBILE_WIDTH_SIZE_PX,
  TAXES_KOEFICIENT,
  MARKUP_KOEFICIENT,
  BLURRED_AREA_HEIGHT,
  FONT_TITLES,
  BOTTOM_BANNER,
  LAY_SINGLE_FRAME_PDNG,
  LAY_DOUBLE_FRAME_PDNG,
  SIZES,
  FRAME_OPTION_NAMES,
  ORIENTATIONS,
  VARIANTS_PRINTFUL,
  LAYOUT_STYLE_NAMES,
  LAYOUTS,
  MAP_STYLES_NAMES,
  MAP_STYLES,
};
