const IS_CLIENT = typeof window !== "undefined";

const PIXEL_RATIO = 8; //  x / 96 (8 is the good value)

const TAX_PERCENTAGE = 21; // Tax I pay in price from printful
const GROSS_PROFIT_PERCENTAGE = 20;

const BOTTOM_LAYOUT_SIZE = 1 / 8;

const MOBILE_WIDTH_SIZE_PX = 768;

const TAXES_KOEFICIENT = 1.2;
const MARKUP_KOEFICIENT = 1.2;

const INSIDE_FRAME_COVER_CM = 0.5;
const OUTSIDE_FRAME_CM = 1.4;

const LAY_SINGLE_FRAME_PDNG = 0.025;
const LAY_DOUBLE_FRAME_PDNG = 0.015;
const TRANSPARENT_PADDING = 0.015;

const BOTTOM_BANNER = 0.09;
const BLURRED_AREA_HEIGHT = 0.09;
const TITLES_FONT_DEFAULT = "Garamond"; // "Robot"; //"Source Code Pro";
const TITLES_DEFAULT = ["New York", "— USA —"];

const FRAME_COLOR_WHITE = "#F5F5F5";
const FRAME_COLOR_BLACK = "black";
const FRAME_COLOR_TRANSPARENT = "transparent";

const DEFAULT_FONT_WEIGHT_BOLD = 800;
const DEFAULT_FONT_WEIGHT_THIN = 200;

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
    name: "30 x 40",
    unit: "cm",
    code: sizeNames["30X40cm"],
    height: 30,
    width: 40,
    orientation: ORIENTATIONS.wide,
    acceptableSizes: [sizeNames["30X40cm"], sizeNames["40X30cm"]],
  },
  {
    ratio: 40 / 30,
    name: "40 x 30",
    unit: "cm",
    code: sizeNames["40X30cm"],
    height: 40,
    width: 30,
    orientation: ORIENTATIONS.tall,
    acceptableSizes: [sizeNames["30X40cm"], sizeNames["40X30cm"]],
  },

  {
    ratio: 50 / 70,
    name: "50 x 70",
    unit: "cm",
    height: 50,
    width: 70,
    code: sizeNames["50X70cm"],
    orientation: ORIENTATIONS.wide,
    acceptableSizes: [sizeNames["50X70cm"], sizeNames["70X50cm"]],
  },
  {
    ratio: 70 / 50,
    name: "70 x 50",
    unit: "cm",
    height: 70,
    width: 50,
    code: sizeNames["70X50cm"],
    orientation: ORIENTATIONS.tall,
    acceptableSizes: [sizeNames["70X50cm"], sizeNames["50X70cm"]],
  },
  {
    ratio: 61 / 91,
    name: "61 x 91",
    unit: "cm",
    height: 61,
    width: 91,
    code: sizeNames["61X91cm"],
    orientation: ORIENTATIONS.wide,
    acceptableSizes: [sizeNames["61X91cm"], sizeNames["91X61cm"]],
  },
  {
    ratio: 91 / 61,
    name: "91 x 61",
    unit: "cm",
    height: 91,
    width: 61,
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
      price: 239,
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
      price: 239,
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
      price: 239,
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
      price: 239,
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
      price: 799,
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
      price: 799,
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
      price: 239,
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
      price: 799,
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
      price: 799,
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
  DOUBLE_BORDER: "Double Border",
};

const PADDING_COLOR_OPTIONS = {
  transparent: "transparent",
  white: "white",
  inherit: "inherit",
};

const LAYOUTS = [
  {
    name: LAYOUT_STYLE_NAMES.PURE,
    roundPdng: null,
    paddingColor: PADDING_COLOR_OPTIONS.white,
    bottomBannerHeight: null,
    isBannerBlur: false,
    text: {
      isVisible: false,
      align: "center",
    },
  },
  {
    name: LAYOUT_STYLE_NAMES.ISLAND_BOX,
    roundPdng: TRANSPARENT_PADDING,
    paddingColor: PADDING_COLOR_OPTIONS.transparent,
    bottomBannerHeight: BOTTOM_BANNER, // this is dynamic value
    isBannerBlur: false,
    text: {
      isVisible: true,
      align: "center",
    },
  },
  {
    name: LAYOUT_STYLE_NAMES.BOTTOM_BLUR,
    roundPdng: null,
    paddingColor: PADDING_COLOR_OPTIONS.transparent,
    bottomBannerHeight: BLURRED_AREA_HEIGHT,
    isBannerBlur: true,
    text: {
      isVisible: true,
      align: "center",
    },
  },
  {
    name: LAYOUT_STYLE_NAMES.BOTTOM_LINE,
    roundPdng: null,
    paddingColor: PADDING_COLOR_OPTIONS.white,
    bottomBannerHeight: BOTTOM_BANNER,
    isBannerBlur: false,
    text: {
      isVisible: true,
      align: "center",
    },
  },
  {
    name: LAYOUT_STYLE_NAMES.BORDER_BOX,
    roundPdng: LAY_SINGLE_FRAME_PDNG,
    paddingColor: PADDING_COLOR_OPTIONS.white,
    bottomBannerHeight: BOTTOM_BANNER,
    isBannerBlur: true,
    text: {
      isVisible: true,
      align: "center",
    },
  },
  // {
  //   name: LAYOUT_STYLE_NAMES.BORDER_BLUR,
  //   roundPdng: LAY_SINGLE_FRAME_PDNG,
  //   paddingColor: "white",
  //   bottomBannerHeight: BLURRED_AREA_HEIGHT,
  //   isBannerBlur: true,
  //   text: {
  //     isVisible: true,
  //     align: "center",
  //   },
  // },
  {
    name: LAYOUT_STYLE_NAMES.DOUBLE_BORDER,
    roundPdng: LAY_DOUBLE_FRAME_PDNG,
    paddingColor: PADDING_COLOR_OPTIONS.white,
    bottomBannerHeight: BLURRED_AREA_HEIGHT,
    isBannerBlur: true,
    text: {
      isVisible: true,
      align: "center",
    },
  },
];

const MAP_STYLES_NAMES = {
  BLACK_LAND: "Black Land",
  BLACK_WHITE: "Black White",
  DARK_BLUE_MONOCOLOR: "Dark Blue Monocolor",
  LOW_CONTRAST_GREEN: "Low Contrast Green",
  DOUBLE_BLUE: "Double Blue",
  SANDY_DARK: "Sandy Dark",
  WHITE_BLUE: "White Blue",
  SANDY_ORANGE_BLUE: "Sandy Orange Blue",
  WHITE_GREY: "White Grey",
  WHITE_BLUE_LOW_CONTRAST: "White Blue Low",
  // OLD_SANDY_BROWN: "Old Sandy Brown",
  // MUSTARD_BLUE: "Mustard Blue",
};

const MAP_STYLES = {
  [MAP_STYLES_NAMES.WHITE_GREY]: {
    url: "mapbox://styles/petrhoskovec/ckmzzqlni0n5j17pbfvgf27n9",
    waterColor: "",
    landColor: "",
    roadsColor: "",
  },
  // "WhiteGrey",
  // "assets/MAPS_MAPBOX/WhiteGrey/style.json",
  [MAP_STYLES_NAMES.WHITE_BLUE_LOW_CONTRAST]:
    // "WhiteBlueLowContrast(ckolm2l7k23ck18mwrl2jkgcg)",
    // "assets/MAPS_MAPBOX/WhiteBlueLowContrast(ckolm2l7k23ck18mwrl2jkgcg)/style.json",
    {
      url: "mapbox://styles/petrhoskovec/ckolm2l7k23ck18mwrl2jkgcg",
      waterColor: "",
      landColor: "",
      roadsColor: "",
    },
  [MAP_STYLES_NAMES.WHITE_BLUE]:
    // "WhiteBlue(ckmzzsrsl0naa17o3ki2xzuoj)",
    // "assets/MAPS_MAPBOX/WhiteBlue(ckmzzsrsl0naa17o3ki2xzuoj)/style.json",
    {
      url: "mapbox://styles/petrhoskovec/ckmzzsrsl0naa17o3ki2xzuoj",
      waterColor: "30bcf3",
      landColor: "f7f5de",
      roadsColor: "7891ab",
      layoutColor: "f7f5de",
      textColor: "7891ab",
    },
  [MAP_STYLES_NAMES.MUSTARD_BLUE]:
    // "MustardBlueLowContrast(ckolmiq3f4u9217p9v8fmln15)",
    // "assets/MAPS_MAPBOX/MustardBlueLowContrast(ckolmiq3f4u9217p9v8fmln15)/style.json",
    {
      url: "mapbox://styles/petrhoskovec/ckolmiq3f4u9217p9v8fmln15",
      waterColor: "32728b",
      landColor: "cbc057",
      roadsColor: "567495",
      layoutColor: "cbc057",
      textColor: "32728b",
    },
  // [MAP_STYLES_NAMES.DARK_BLUE]:
  // "assets/MAPS_MAPBOX/WhiteGrey/style.json",
  // "mapbox://styles/petrhoskovec/ckmzyuv5w0mat17n5ybl7hxxl",
  [MAP_STYLES_NAMES.SANDY_DARK]:
    // "SandyDark(ckmzz4z6y0mgx17s4lw0zeyho)",
    // "assets/MAPS_MAPBOX/SandyDark(ckmzz4z6y0mgx17s4lw0zeyho)/style.json",
    {
      url: "mapbox://styles/petrhoskovec/ckmzz4z6y0mgx17s4lw0zeyho",
      waterColor: "054057",
      landColor: "e2dd7e",
      roadsColor: "878f97",
      layoutColor: "e2dd7e",
      textColor: "054057",
    },
  // [MAP_STYLES_NAMES.OLD_SANDY_BROWN]:
  //   {
  //     url: "mapbox://styles/petrhoskovec/ckn0f7lbu12je17s4itrmuuh5",
  //     waterColor: "",
  //     landColor: "",
  //     roadsColor: "",
  //   },

  [MAP_STYLES_NAMES.SANDY_ORANGE_BLUE]:
    // "SandyOrangeBlue(ckn0ffdn112v017jxv6ei1jnu)",
    // "assets/MAPS_MAPBOX/SandyOrangeBlue(ckn0ffdn112v017jxv6ei1jnu)/style.json",
    {
      url: "mapbox://styles/petrhoskovec/ckn0ffdn112v017jxv6ei1jnu",
      waterColor: "",
      landColor: "",
      roadsColor: "",
      layoutColor: "",
      textColor: "",
    },
  [MAP_STYLES_NAMES.LOW_CONTRAST_GREEN]:
    // "LowContrastGreenBlue(ckollex8z78ly18mu9jmefwnz)",
    // "assets/MAPS_MAPBOX/LowContrastGreenBlue(ckollex8z78ly18mu9jmefwnz)/style.json",
    {
      url: "mapbox://styles/petrhoskovec/ckollex8z78ly18mu9jmefwnz",
      waterColor: "5e96c9",
      landColor: "e6d398",
      roadsColor: "", //f1eae5
      layoutColor: "e6d398",
      textColor: "5e96c9",
    },
  [MAP_STYLES_NAMES.BLACK_WHITE]:
    // "BlackWhite(ckpbeqdof7li518ojkwwaqrfh)",
    {
      url: "mapbox://styles/petrhoskovec/ckpbeqdof7li518ojkwwaqrfh",
      waterColor: "e8e7e3",
      landColor: "ffffff",
      roadsColor: "6d7378",
      layoutColor: "ffffff",
      textColor: "6d7378",
    },
  [MAP_STYLES_NAMES.BLACK_LAND]:
    // "BlackLand(ckpbgjjxd0phz17nzanvcr6y4)",
    {
      url: "mapbox://styles/petrhoskovec/ckpbgjjxd0phz17nzanvcr6y4",
      waterColor: "f8f8f7",
      landColor: "050505",
      roadsColor: "f1f2f3",
      layoutColor: "050505",
      textColor: "f1f2f3",
    },
  [MAP_STYLES_NAMES.DARK_BLUE_MONOCOLOR]:
    // "BlackLand(ckpbgjjxd0phz17nzanvcr6y4)",
    {
      url: "mapbox://styles/petrhoskovec/ckqexs85d1dev18pgpujhjwne",
      waterColor: "162930",
      landColor: "707070",
      roadsColor: "d5d2d2",
      layoutColor: "707070",
      textColor: "d5d2d2",
    },
  [MAP_STYLES_NAMES.DOUBLE_BLUE]:
    // "BlackLand(ckpbgjjxd0phz17nzanvcr6y4)",
    {
      url: "mapbox://styles/petrhoskovec/ckqzcrfq0b9am18pddrl61dto",
      waterColor: "405cb0",
      landColor: "20439d",
      roadsColor: "e0e4f0",
      layoutColor: "20439d",
      textColor: "e0e4f0",
    },
};

const FAKE_DIV_IDS = {
  heading: "fake_heading_div",
  subtitle: "fake_subtitle_div",
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
  INSIDE_FRAME_COVER_CM,
  OUTSIDE_FRAME_CM,
  BLURRED_AREA_HEIGHT,
  TITLES_FONT_DEFAULT,
  TITLES_DEFAULT,
  DEFAULT_FONT_WEIGHT_BOLD,
  DEFAULT_FONT_WEIGHT_THIN,
  BOTTOM_BANNER,
  LAY_SINGLE_FRAME_PDNG,
  LAY_DOUBLE_FRAME_PDNG,
  SIZES,
  FRAME_OPTION_NAMES,
  ORIENTATIONS,
  VARIANTS_PRINTFUL,
  LAYOUT_STYLE_NAMES,
  PADDING_COLOR_OPTIONS,
  LAYOUTS,
  MAP_STYLES_NAMES,
  MAP_STYLES,
  FAKE_DIV_IDS,
};
