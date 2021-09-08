const IS_CLIENT = typeof window !== "undefined";

const IS_SERVER = typeof window === "undefined";

const RUNTIME_PIXEL_RATIO = 2;

const PIXEL_RATIO_SM = 1.7; // 1.7
const PIXEL_RATIO_MD = 2.5; // 2.8
const PIXEL_RATIO_LG = 3.5; // 4.2

const PRINT_CANVAS_BASE_PX = 1400; // 1400 //1024  2048;

const TAX_PERCENTAGE = 21; // Tax I pay in price from printful
const GROSS_PROFIT_PERCENTAGE = 30;

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
const TITLES_FONT_DEFAULT = "RobotoMono_local"; // // "NotoSansJP_local";
const TITLES_DEFAULT = ["Itálie červen/2021", "— Řím - Toskánsko - Neapol —"];

const FRAME_COLOR_WHITE = "#F5F5F5";
const FRAME_COLOR_BLACK = "black";
const FRAME_COLOR_TRANSPARENT = "transparent";

const DEFAULT_FONT_WEIGHT_BOLD = 400;
const DEFAULT_FONT_WEIGHT_THIN = 300;

const SIZE_NAMES = {
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
    code: SIZE_NAMES["30X40cm"],
    height: 30,
    width: 40,
    orientation: ORIENTATIONS.wide,
    acceptableSizes: [SIZE_NAMES["30X40cm"], SIZE_NAMES["40X30cm"]],
  },
  {
    ratio: 40 / 30,
    name: "40 x 30",
    unit: "cm",
    code: SIZE_NAMES["40X30cm"],
    height: 40,
    width: 30,
    orientation: ORIENTATIONS.tall,
    acceptableSizes: [SIZE_NAMES["30X40cm"], SIZE_NAMES["40X30cm"]],
  },

  {
    ratio: 50 / 70,
    name: "50 x 70",
    unit: "cm",
    height: 50,
    width: 70,
    code: SIZE_NAMES["50X70cm"],
    orientation: ORIENTATIONS.wide,
    acceptableSizes: [SIZE_NAMES["50X70cm"], SIZE_NAMES["70X50cm"]],
  },
  {
    ratio: 70 / 50,
    name: "70 x 50",
    unit: "cm",
    height: 70,
    width: 50,
    code: SIZE_NAMES["70X50cm"],
    orientation: ORIENTATIONS.tall,
    acceptableSizes: [SIZE_NAMES["70X50cm"], SIZE_NAMES["50X70cm"]],
  },
  {
    ratio: 61 / 91,
    name: "61 x 91",
    unit: "cm",
    height: 61,
    width: 91,
    code: SIZE_NAMES["61X91cm"],
    orientation: ORIENTATIONS.wide,
    acceptableSizes: [SIZE_NAMES["61X91cm"], SIZE_NAMES["91X61cm"]],
  },
  {
    ratio: 91 / 61,
    name: "91 x 61",
    unit: "cm",
    height: 91,
    width: 61,
    code: SIZE_NAMES["91X61cm"],
    orientation: ORIENTATIONS.tall,
    acceptableSizes: [SIZE_NAMES["61X91cm"], SIZE_NAMES["91X61cm"]],
  },
];

const SHIPMENT_CODES = {
  LARGE_FRAMED_CZK: "shr_1JMby5CVDm94CHWQubmAtcSu",
  SMALL_FRAMED_OR_NO_FRAME_CZK: "shr_1JMc02CVDm94CHWQejExsrb9",
};

const SHIPMENT_PRICES = {
  LARGE_CZK: 800,
  SMALL_CZK: 250,
};

const VARIANTS_PRINTFUL = [
  {
    id: 8948,
    frameColor: FRAME_COLOR_TRANSPARENT,
    frameWidth: 0,
    frameOutsideKoef: 0,
    sizeName: SIZE_NAMES["30X40cm"],
    frameName: FRAME_OPTION_NAMES.NO_FRAME,
    PIXEL_RATIO: PIXEL_RATIO_SM,
    shipping: {
      codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: SHIPMENT_PRICES.SMALL_CZK,
      currency: "CZK",
    },
  },
  {
    id: 9357,
    frameColor: FRAME_COLOR_BLACK,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: SIZE_NAMES["30X40cm"],
    frameName: FRAME_OPTION_NAMES.BLACK_FRAME,
    PIXEL_RATIO: PIXEL_RATIO_SM,
    shipping: {
      codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: SHIPMENT_PRICES.SMALL_CZK,
      currency: "CZK",
    },
  },
  {
    id: 10297,
    frameColor: FRAME_COLOR_WHITE,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: SIZE_NAMES["30X40cm"],
    PIXEL_RATIO: PIXEL_RATIO_SM,
    frameName: FRAME_OPTION_NAMES.WHITE_FRAME,
    shipping: {
      codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: SHIPMENT_PRICES.SMALL_CZK,
      currency: "CZK",
    },
  },

  {
    id: 8952,
    frameColor: FRAME_COLOR_TRANSPARENT,
    frameWidth: 0,
    frameOutsideKoef: 0,
    sizeName: SIZE_NAMES["50X70cm"],
    frameName: FRAME_OPTION_NAMES.NO_FRAME,
    PIXEL_RATIO: PIXEL_RATIO_MD,
    shipping: {
      codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: SHIPMENT_PRICES.SMALL_CZK,
      currency: "CZK",
    },
  },
  {
    id: 9358,
    frameColor: FRAME_COLOR_BLACK,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: SIZE_NAMES["50X70cm"],
    frameName: FRAME_OPTION_NAMES.BLACK_FRAME,
    PIXEL_RATIO: PIXEL_RATIO_MD,
    shipping: {
      codeCZ: SHIPMENT_CODES.LARGE_FRAMED_CZK,
      price: SHIPMENT_PRICES.LARGE_CZK,
      currency: "CZK",
    },
  },
  {
    id: 10298,
    frameColor: FRAME_COLOR_WHITE,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: SIZE_NAMES["50X70cm"],
    frameName: FRAME_OPTION_NAMES.WHITE_FRAME,
    PIXEL_RATIO: PIXEL_RATIO_MD,
    shipping: {
      codeCZ: SHIPMENT_CODES.LARGE_FRAMED_CZK,
      price: SHIPMENT_PRICES.LARGE_CZK,
      currency: "CZK",
    },
  },

  {
    id: 8953,
    frameColor: FRAME_COLOR_TRANSPARENT,
    frameWidth: 0,
    frameOutsideKoef: 0,
    sizeName: SIZE_NAMES["61X91cm"],
    frameName: FRAME_OPTION_NAMES.NO_FRAME,
    PIXEL_RATIO: PIXEL_RATIO_LG,
    shipping: {
      codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
      price: SHIPMENT_PRICES.SMALL_CZK,
      currency: "CZK",
    },
  },
  {
    id: 9359,
    frameColor: FRAME_COLOR_BLACK,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: SIZE_NAMES["61X91cm"],
    frameName: FRAME_OPTION_NAMES.BLACK_FRAME,
    PIXEL_RATIO: PIXEL_RATIO_LG,
    shipping: {
      codeCZ: SHIPMENT_CODES.LARGE_FRAMED_CZK,
      price: SHIPMENT_PRICES.LARGE_CZK,
      currency: "CZK",
    },
  },
  {
    id: 10299,
    frameColor: FRAME_COLOR_WHITE,
    frameWidth: 0.01,
    frameOutsideKoef: 0.01,
    sizeName: SIZE_NAMES["61X91cm"],
    frameName: FRAME_OPTION_NAMES.WHITE_FRAME,
    PIXEL_RATIO: PIXEL_RATIO_LG,
    shipping: {
      codeCZ: SHIPMENT_CODES.LARGE_FRAMED_CZK,
      price: SHIPMENT_PRICES.LARGE_CZK,
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
];

const MAP_STYLES_NAMES = {
  RED_BLUE: "Red Blue",
  YELLOW_GREEN: "Yellow Green",
  BLUE_YELLOW: "Blue Yellow",
  GREEN_ORANGE: "Green Orange",
  BLACK_LAND: "Black Land",
  BLACK_WHITE: "Black White",
  RED_WHITE: "Red White",
  DOUBLE_BLUE: "Double Blue",
  // GREY_BLUE: "Grey Blue",
  PALE_BLUE: "Pale Blue",
  SANDY_DARK: "Sandy Dark",
  WHITE_BLUE: "White Blue",
  // SANDY_ORANGE_BLUE: "Sandy Orange Blue",
  // WHITE_BLUE_LOW_CONTRAST: "White Blue Low",
};

const MAP_STYLED_AND_FLIGHT_COLOR = {
  [MAP_STYLES_NAMES.RED_BLUE]: "lightGrey",
  [MAP_STYLES_NAMES.YELLOW_GREEN]: "black",
  [MAP_STYLES_NAMES.BLUE_YELLOW]: "#a62703",
  [MAP_STYLES_NAMES.GREEN_ORANGE]: "black",
  [MAP_STYLES_NAMES.BLACK_LAND]: "#a62703",
  [MAP_STYLES_NAMES.BLACK_WHITE]: "#a62703",
  [MAP_STYLES_NAMES.RED_WHITE]: "black",
  [MAP_STYLES_NAMES.DOUBLE_BLUE]: "black",
  [MAP_STYLES_NAMES.PALE_BLUE]: "black",
  [MAP_STYLES_NAMES.SANDY_DARK]: "black",
  [MAP_STYLES_NAMES.WHITE_BLUE]: "black",
};

const MAP_STYLES = {
  // [MAP_STYLES_NAMES.WHITE_GREY]: {
  //   url: "mapbox://styles/petrhoskovec/ckmzzqlni0n5j17pbfvgf27n9",
  //   waterColor: "",
  //   landColor: "",
  //   roadsColor: "",
  // },
  // [MAP_STYLES_NAMES.WHITE_BLUE_LOW_CONTRAST]: {
  //   url: "mapbox://styles/petrhoskovec/ckolm2l7k23ck18mwrl2jkgcg",
  //   waterColor: "",
  //   landColor: "",
  //   roadsColor: "",
  // },
  [MAP_STYLES_NAMES.RED_WHITE]: {
    url: "mapbox://styles/petrhoskovec/cksk4tz3xa8zs18rhk21fgll2",
    waterColor: "e8e7e3",
    landColor: "bc002d",
    roadsColor: "ffffff",
    layoutColor: "ffffff",
    textColor: "bc002d",
  },
  [MAP_STYLES_NAMES.WHITE_BLUE]: {
    url: "mapbox://styles/petrhoskovec/ckmzzsrsl0naa17o3ki2xzuoj",
    waterColor: "30bcf3",
    landColor: "f7f5de",
    roadsColor: "7891ab",
    layoutColor: "f7f5de",
    textColor: "7891ab",
  },
  [MAP_STYLES_NAMES.MUSTARD_BLUE]: {
    url: "mapbox://styles/petrhoskovec/ckolmiq3f4u9217p9v8fmln15",
    waterColor: "32728b",
    landColor: "cbc057",
    roadsColor: "567495",
    layoutColor: "cbc057",
    textColor: "32728b",
  },
  [MAP_STYLES_NAMES.SANDY_DARK]: {
    url: "mapbox://styles/petrhoskovec/ckrazk0zr02dg17pnd1rv62m3",
    waterColor: "054057",
    landColor: "e2dd7e",
    roadsColor: "000000",
    layoutColor: "e2dd7e",
    textColor: "000000",
  },
  // [MAP_STYLES_NAMES.OLD_SANDY_BROWN]:
  //   {
  //     url: "mapbox://styles/petrhoskovec/ckn0f7lbu12je17s4itrmuuh5",
  //     waterColor: "",
  //     landColor: "",
  //     roadsColor: "",
  //   },

  // [MAP_STYLES_NAMES.SANDY_ORANGE_BLUE]: {
  //   url: "mapbox://styles/petrhoskovec/ckn0ffdn112v017jxv6ei1jnu",
  //   waterColor: "",
  //   landColor: "",
  //   roadsColor: "",
  //   layoutColor: "",
  //   textColor: "",
  // },
  [MAP_STYLES_NAMES.PALE_BLUE]: {
    url: "mapbox://styles/petrhoskovec/ckollex8z78ly18mu9jmefwnz",
    waterColor: "5e96c9",
    landColor: "e6d398",
    roadsColor: "", //f1eae5
    layoutColor: "e6d398",
    textColor: "5e96c9",
  },
  [MAP_STYLES_NAMES.BLACK_WHITE]: {
    url: "mapbox://styles/petrhoskovec/ckpbeqdof7li518ojkwwaqrfh",
    waterColor: "e8e7e3",
    landColor: "ffffff",
    roadsColor: "080808",
    layoutColor: "ffffff",
    textColor: "080808",
  },
  [MAP_STYLES_NAMES.BLACK_LAND]: {
    url: "mapbox://styles/petrhoskovec/ckpbgjjxd0phz17nzanvcr6y4",
    waterColor: "f8f8f7",
    landColor: "050505",
    roadsColor: "f1f2f3",
    layoutColor: "050505",
    textColor: "f1f2f3",
  },
  // [MAP_STYLES_NAMES.GREY_BLUE]: {
  //   url: "mapbox://styles/petrhoskovec/ckqexs85d1dev18pgpujhjwne",
  //   waterColor: "162930",
  //   landColor: "707070",
  //   roadsColor: "d5d2d2",
  //   layoutColor: "707070",
  //   textColor: "d5d2d2",
  // },
  [MAP_STYLES_NAMES.DOUBLE_BLUE]: {
    url: "mapbox://styles/petrhoskovec/ckqzcrfq0b9am18pddrl61dto",
    waterColor: "405cb0",
    landColor: "20439d",
    roadsColor: "e0e4f0",
    layoutColor: "20439d",
    textColor: "e0e4f0",
  },
  [MAP_STYLES_NAMES.RED_BLUE]: {
    url: "mapbox://styles/petrhoskovec/ckrazzkcv02t718phiw9msazt",
    waterColor: "1babc8",
    landColor: "4c060d",
    roadsColor: "f1eae5",
    layoutColor: "4c060d",
    textColor: "f1eae5",
  },

  [MAP_STYLES_NAMES.YELLOW_GREEN]: {
    url: "mapbox://styles/petrhoskovec/ckrg4j3qq51gs17nrk7hy8s64",
    waterColor: "159874",
    landColor: "e4bf45",
    roadsColor: "f1eae5",
    layoutColor: "159874",
    textColor: "e4bf45",
  },
  [MAP_STYLES_NAMES.BLUE_YELLOW]: {
    url: "mapbox://styles/petrhoskovec/ckrg7588l54ax19nz2gomz4ba",
    waterColor: "f7d02f",
    landColor: "313d64",
    roadsColor: "f1eae5",
    layoutColor: "313d64",
    textColor: "f7d02f",
  },
  [MAP_STYLES_NAMES.GREEN_ORANGE]: {
    url: "mapbox://styles/petrhoskovec/ckrg4r3n10lu818qj2niijwri",
    waterColor: "ea9264",
    landColor: "265b60",
    roadsColor: "f1eae5",
    layoutColor: "265b60",
    textColor: "ea9264",
  },
};

const TITLE_NAMES = {
  TITLE: "heading",
  SUBTITLE: "subtitle",
};

const FAKE_DIV_IDS = {
  heading: "fake_heading_div",
  subtitle: "fake_subtitle_div",
};

const VALID_DISCOUNT_CODES = [{ code: "AU65", discountKoef: 0.9 }];

const REDUX_COOKIE_NAME = "reduxStoreCookie";

const LABEL_SIZE_KOEF = 0.012;

module.exports = {
  IS_CLIENT,
  IS_SERVER,
  RUNTIME_PIXEL_RATIO,
  PIXEL_RATIO_SM,
  PIXEL_RATIO_MD,
  PIXEL_RATIO_LG,
  PRINT_CANVAS_BASE_PX,
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
  SIZE_NAMES,
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
  MAP_STYLED_AND_FLIGHT_COLOR,
  TITLE_NAMES,
  FAKE_DIV_IDS,
  VALID_DISCOUNT_CODES,
  REDUX_COOKIE_NAME,
  LABEL_SIZE_KOEF,
};
