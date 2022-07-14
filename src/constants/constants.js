const IS_CLIENT = typeof window !== 'undefined'

const IS_SERVER = typeof window === 'undefined'

const RUNTIME_PIXEL_RATIO = 2

const PIXEL_RATIO_SM = 1.7 // defining resolution of final map
const PIXEL_RATIO_MD = 2.5
const PIXEL_RATIO_LG = 3.5

const PRINT_CANVAS_BASE_PX = 1400 // defining how detailed will the map be

const TAX_PERCENTAGE = 21 // Tax I pay in price from printful
const GROSS_PROFIT_PERCENTAGE = 30

const BOTTOM_LAYOUT_SIZE = 1 / 8

const MOBILE_WIDTH_SIZE_PX = 768

const TAXES_KOEFICIENT = 1.2
const MARKUP_KOEFICIENT = 1.2

const INSIDE_FRAME_COVER_CM = 0.5
const OUTSIDE_FRAME_CM = 1.4

const LAY_SINGLE_FRAME_PDNG = 0.025
const LAY_DOUBLE_FRAME_PDNG = 0.015
const TRANSPARENT_PADDING = 0.015

const BOTTOM_BANNER = 0.09
const BOTTOM_BANNER_BIGGER = 0.1
const BLURRED_AREA_HEIGHT = 0.09
const TITLES_FONT_DEFAULT = 'RobotoMono_local'
const TITLES_DEFAULT = ['Italy summer 2021', '— Roma - Toscany - Naples —']

const FRAME_COLOR_WHITE = '#F5F5F5'
const FRAME_COLOR_BLACK = 'black'
const FRAME_COLOR_TRANSPARENT = 'transparent'

const DEFAULT_FONT_WEIGHT_BOLD = 400
const DEFAULT_FONT_WEIGHT_THIN = 300

const SIZE_NAMES = {
    '61X91cm': '61X91cm',
    '91X61cm': '91X61cm',
    '50X70cm': '50X70cm',
    '70X50cm': '70X50cm',
    '30X40cm': '30X40cm',
    '40X30cm': '40X30cm'
}

const FRAME_OPTION_NAMES = {
    NO_FRAME: 'steps.frame.withoutFrame',
    WHITE_FRAME: 'steps.frame.whiteFrame',
    BLACK_FRAME: 'steps.frame.blackFrame'
}

const ORIENTATIONS = { wide: 'wide', tall: 'tall' }

const SIZES = [
    {
        ratio: 30 / 40,
        name: '30 x 40',
        unit: 'cm',
        code: SIZE_NAMES['30X40cm'],
        height: 30,
        width: 40,
        orientation: ORIENTATIONS.wide,
        acceptableSizes: [SIZE_NAMES['30X40cm'], SIZE_NAMES['40X30cm']]
    },
    {
        ratio: 40 / 30,
        name: '40 x 30',
        unit: 'cm',
        code: SIZE_NAMES['40X30cm'],
        height: 40,
        width: 30,
        orientation: ORIENTATIONS.tall,
        acceptableSizes: [SIZE_NAMES['30X40cm'], SIZE_NAMES['40X30cm']]
    },

    {
        ratio: 50 / 70,
        name: '50 x 70',
        unit: 'cm',
        height: 50,
        width: 70,
        code: SIZE_NAMES['50X70cm'],
        orientation: ORIENTATIONS.wide,
        acceptableSizes: [SIZE_NAMES['50X70cm'], SIZE_NAMES['70X50cm']]
    },
    {
        ratio: 70 / 50,
        name: '70 x 50',
        unit: 'cm',
        height: 70,
        width: 50,
        code: SIZE_NAMES['70X50cm'],
        orientation: ORIENTATIONS.tall,
        acceptableSizes: [SIZE_NAMES['70X50cm'], SIZE_NAMES['50X70cm']]
    },
    {
        ratio: 61 / 91,
        name: '61 x 91',
        unit: 'cm',
        height: 61,
        width: 91,
        code: SIZE_NAMES['61X91cm'],
        orientation: ORIENTATIONS.wide,
        acceptableSizes: [SIZE_NAMES['61X91cm'], SIZE_NAMES['91X61cm']]
    },
    {
        ratio: 91 / 61,
        name: '91 x 61',
        unit: 'cm',
        height: 91,
        width: 61,
        code: SIZE_NAMES['91X61cm'],
        orientation: ORIENTATIONS.tall,
        acceptableSizes: [SIZE_NAMES['61X91cm'], SIZE_NAMES['91X61cm']]
    }
]

const SHIPMENT_CODES = {
    LARGE_FRAMED_CZK: 'shr_1JMby5CVDm94CHWQubmAtcSu',
    SMALL_FRAMED_OR_NO_FRAME_CZK: 'shr_1JMc02CVDm94CHWQejExsrb9'
}

const SHIPMENT_PRICES_CZK = {
    LARGE: 800,
    SMALL: 250
}

const SHIPMENT_PRICES_USD = {
    LARGE: 36,
    SMALL: 11
}

const VARIANTS_PRINTFUL = [
    {
        id: 8948,
        frameColor: FRAME_COLOR_TRANSPARENT,
        frameWidth: 0,
        frameOutsideKoef: 0,
        sizeName: SIZE_NAMES['30X40cm'],
        frameName: FRAME_OPTION_NAMES.NO_FRAME,
        PIXEL_RATIO: PIXEL_RATIO_SM,
        shipping: {
            CZK: {
                codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
                price: SHIPMENT_PRICES_CZK.SMALL,
                currency: 'CZK'
            },
            USD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            AUD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            EUR: {
                price: SHIPMENT_PRICES_USD.SMALL
            }
        }
    },
    {
        id: 9357,
        frameColor: FRAME_COLOR_BLACK,
        frameWidth: 0.01,
        frameOutsideKoef: 0.01,
        sizeName: SIZE_NAMES['30X40cm'],
        frameName: FRAME_OPTION_NAMES.BLACK_FRAME,
        PIXEL_RATIO: PIXEL_RATIO_SM,
        shipping: {
            CZK: {
                codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
                price: SHIPMENT_PRICES_CZK.SMALL,
                currency: 'CZK'
            },
            USD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            AUD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            EUR: {
                price: SHIPMENT_PRICES_USD.SMALL
            }
        }
    },
    {
        id: 10297,
        frameColor: FRAME_COLOR_WHITE,
        frameWidth: 0.01,
        frameOutsideKoef: 0.01,
        sizeName: SIZE_NAMES['30X40cm'],
        PIXEL_RATIO: PIXEL_RATIO_SM,
        frameName: FRAME_OPTION_NAMES.WHITE_FRAME,
        shipping: {
            CZK: {
                codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
                price: SHIPMENT_PRICES_CZK.SMALL,
                currency: 'CZK'
            },
            USD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            AUD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            EUR: {
                price: SHIPMENT_PRICES_USD.SMALL
            }
        }
    },

    {
        id: 8952,
        frameColor: FRAME_COLOR_TRANSPARENT,
        frameWidth: 0,
        frameOutsideKoef: 0,
        sizeName: SIZE_NAMES['50X70cm'],
        frameName: FRAME_OPTION_NAMES.NO_FRAME,
        PIXEL_RATIO: PIXEL_RATIO_MD,
        shipping: {
            CZK: {
                codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
                price: SHIPMENT_PRICES_CZK.SMALL,
                currency: 'CZK'
            },
            USD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            AUD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            EUR: {
                price: SHIPMENT_PRICES_USD.SMALL
            }
        }
    },
    {
        id: 9358,
        frameColor: FRAME_COLOR_BLACK,
        frameWidth: 0.01,
        frameOutsideKoef: 0.01,
        sizeName: SIZE_NAMES['50X70cm'],
        frameName: FRAME_OPTION_NAMES.BLACK_FRAME,
        PIXEL_RATIO: PIXEL_RATIO_MD,
        shipping: {
            CZK: {
                codeCZ: SHIPMENT_CODES.LARGE_FRAMED_CZK,
                price: SHIPMENT_PRICES_CZK.LARGE,
                currency: 'CZK'
            },
            USD: {
                price: SHIPMENT_PRICES_USD.LARGE
            },
            AUD: {
                price: SHIPMENT_PRICES_USD.LARGE
            },
            EUR: {
                price: SHIPMENT_PRICES_USD.LARGE
            }
        }
    },
    {
        id: 10298,
        frameColor: FRAME_COLOR_WHITE,
        frameWidth: 0.01,
        frameOutsideKoef: 0.01,
        sizeName: SIZE_NAMES['50X70cm'],
        frameName: FRAME_OPTION_NAMES.WHITE_FRAME,
        PIXEL_RATIO: PIXEL_RATIO_MD,
        shipping: {
            CZK: {
                codeCZ: SHIPMENT_CODES.LARGE_FRAMED_CZK,
                price: SHIPMENT_PRICES_CZK.LARGE,
                currency: 'CZK'
            },
            USD: {
                price: SHIPMENT_PRICES_USD.LARGE
            },
            AUD: {
                price: SHIPMENT_PRICES_USD.LARGE
            },
            EUR: {
                price: SHIPMENT_PRICES_USD.LARGE
            }
        }
    },

    {
        id: 8953,
        frameColor: FRAME_COLOR_TRANSPARENT,
        frameWidth: 0,
        frameOutsideKoef: 0,
        sizeName: SIZE_NAMES['61X91cm'],
        frameName: FRAME_OPTION_NAMES.NO_FRAME,
        PIXEL_RATIO: PIXEL_RATIO_LG,
        shipping: {
            CZK: {
                codeCZ: SHIPMENT_CODES.SMALL_FRAMED_OR_NO_FRAME_CZK,
                price: SHIPMENT_PRICES_CZK.SMALL,
                currency: 'CZK'
            },
            USD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            AUD: {
                price: SHIPMENT_PRICES_USD.SMALL
            },
            EUR: {
                price: SHIPMENT_PRICES_USD.SMALL
            }
        }
    },
    {
        id: 9359,
        frameColor: FRAME_COLOR_BLACK,
        frameWidth: 0.01,
        frameOutsideKoef: 0.01,
        sizeName: SIZE_NAMES['61X91cm'],
        frameName: FRAME_OPTION_NAMES.BLACK_FRAME,
        PIXEL_RATIO: PIXEL_RATIO_LG,
        shipping: {
            CZK: {
                codeCZ: SHIPMENT_CODES.LARGE_FRAMED_CZK,
                price: SHIPMENT_PRICES_CZK.LARGE,
                currency: 'CZK'
            },
            USD: {
                price: SHIPMENT_PRICES_USD.LARGE
            },
            AUD: {
                price: SHIPMENT_PRICES_USD.LARGE
            },
            EUR: {
                price: SHIPMENT_PRICES_USD.LARGE
            }
        }
    },
    {
        id: 10299,
        frameColor: FRAME_COLOR_WHITE,
        frameWidth: 0.01,
        frameOutsideKoef: 0.01,
        sizeName: SIZE_NAMES['61X91cm'],
        frameName: FRAME_OPTION_NAMES.WHITE_FRAME,
        PIXEL_RATIO: PIXEL_RATIO_LG,
        shipping: {
            CZK: {
                codeCZ: SHIPMENT_CODES.LARGE_FRAMED_CZK,
                price: SHIPMENT_PRICES_CZK.LARGE,
                currency: 'CZK'
            },
            USD: {
                price: SHIPMENT_PRICES_USD.LARGE
            },
            AUD: {
                price: SHIPMENT_PRICES_USD.LARGE
            },
            EUR: {
                price: SHIPMENT_PRICES_USD.LARGE
            }
        }
    }
]

const LAYOUT_STYLE_NAMES = {
    PURE: 'Pure',
    ISLAND_BOX: 'Island Box',
    BOTTOM_BLUR: 'Bottom Blur',
    BOTTOM_LINE: 'Bottom line',
    BORDER_BOX: 'Border box',
    BORDER_BLUR: 'Border Blur',
    DOUBLE_BORDER: 'Double Border'
}

const PADDING_COLOR_OPTIONS = {
    transparent: 'transparent',
    white: 'white',
    inherit: 'inherit'
}

const LAYOUTS = [
    {
        name: LAYOUT_STYLE_NAMES.ISLAND_BOX,
        roundPdng: TRANSPARENT_PADDING,
        paddingColor: PADDING_COLOR_OPTIONS.transparent,
        bottomBannerHeight: BOTTOM_BANNER, // this is dynamic value
        isBannerBlur: false,
        text: {
            isVisible: true,
            align: 'center',
            title_font: 'Copperplate',
            subtitle_font: 'Copperplate'
        }
    },
    {
        name: LAYOUT_STYLE_NAMES.DOUBLE_BORDER,
        roundPdng: LAY_DOUBLE_FRAME_PDNG,
        paddingColor: PADDING_COLOR_OPTIONS.white,
        bottomBannerHeight: BLURRED_AREA_HEIGHT,
        isBannerBlur: true,
        text: {
            isVisible: true,
            align: 'center',
            title_font: 'AppleChapple',
            subtitle_font: 'Copperplate' //"Balthazar",
        }
    },

    {
        name: LAYOUT_STYLE_NAMES.BOTTOM_BLUR,
        roundPdng: null,
        paddingColor: PADDING_COLOR_OPTIONS.transparent,
        bottomBannerHeight: BLURRED_AREA_HEIGHT,
        isBannerBlur: true,
        text: {
            isVisible: true,
            align: 'center',
            title_font: 'Georgia',
            subtitle_font: 'Cochin'
        }
    },
    {
        name: LAYOUT_STYLE_NAMES.BOTTOM_LINE,
        roundPdng: null,
        paddingColor: PADDING_COLOR_OPTIONS.white,
        bottomBannerHeight: BOTTOM_BANNER_BIGGER,
        isBannerBlur: false,
        bannerTopLineHeightCoef: 0.0025,
        text: {
            isVisible: true,
            align: 'center',
            title_font: 'AmericanTypewriter',
            subtitle_font: 'AmericanTypewriter'
        }
    },
    {
        name: LAYOUT_STYLE_NAMES.BORDER_BOX,
        roundPdng: LAY_SINGLE_FRAME_PDNG,
        paddingColor: PADDING_COLOR_OPTIONS.white,
        bottomBannerHeight: BOTTOM_BANNER,
        isBannerBlur: true,
        text: {
            isVisible: true,
            align: 'center',
            title_font: 'Copperplate',
            subtitle_font: 'Copperplate'
        }
    },
    {
        name: LAYOUT_STYLE_NAMES.PURE,
        roundPdng: null,
        paddingColor: PADDING_COLOR_OPTIONS.white,
        bottomBannerHeight: null,
        isBannerBlur: false,
        text: {
            isVisible: false,
            align: 'center',
            title_font: '',
            subtitle_font: ''
        }
    }
]

const MAP_STYLES_NAMES = {
    RED_BLUE: 'Red Blue',
    YELLOW_GREEN: 'Yellow Green',
    BLUE_YELLOW: 'Blue Yellow',
    GREEN_ORANGE: 'Green Orange',
    BLACK_LAND: 'Black Land',
    BLACK_WHITE: 'Black White',
    RED_WHITE: 'Red White',
    DOUBLE_BLUE: 'Double Blue',
    // GREY_BLUE: "Grey Blue",
    PALE_BLUE: 'Pale Blue',
    SANDY_DARK: 'Sandy Dark',
    WHITE_BLUE: 'White Blue'
    // SANDY_ORANGE_BLUE: "Sandy Orange Blue",
    // WHITE_BLUE_LOW_CONTRAST: "White Blue Low",
}

const MAP_STYLED_AND_FLIGHT_COLOR = {
    [MAP_STYLES_NAMES.RED_BLUE]: {
        colorMain: 'lightGrey',
        colorSecondary: 'white',
        colorText: '#000000',
        colorHalo: 'white'
    },
    [MAP_STYLES_NAMES.YELLOW_GREEN]: {
        colorMain: 'black',
        colorSecondary: 'white',
        colorText: 'black',
        colorHalo: '#e4bf45'
    },
    [MAP_STYLES_NAMES.BLUE_YELLOW]: {
        colorMain: '#a62703',
        colorSecondary: 'white',
        colorText: 'rgba(166, 39, 3, 1)',
        colorHalo: 'white'
    },
    [MAP_STYLES_NAMES.GREEN_ORANGE]: {
        colorMain: 'black',
        colorSecondary: 'white',
        colorText: '#000000',
        colorHalo: 'white'
    },
    [MAP_STYLES_NAMES.BLACK_LAND]: {
        colorMain: '#a62703',
        colorSecondary: 'white',
        colorText: 'black',
        colorHalo: 'white' // #a62703 but in rgba
    },
    [MAP_STYLES_NAMES.BLACK_WHITE]: {
        colorMain: '#a62703',
        colorSecondary: 'white',
        colorText: '#000000',
        colorHalo: 'white'
    },
    [MAP_STYLES_NAMES.RED_WHITE]: {
        colorMain: 'black',
        colorSecondary: 'white',
        colorText: '#000000',
        colorHalo: 'white'
    },
    [MAP_STYLES_NAMES.DOUBLE_BLUE]: {
        colorMain: 'black',
        colorSecondary: 'white',
        colorText: 'white',
        colorHalo: '#000000'
    },
    [MAP_STYLES_NAMES.PALE_BLUE]: {
        colorMain: 'black',
        colorSecondary: 'white',
        colorText: 'black',
        colorHalo: '#e6d398'
    },
    [MAP_STYLES_NAMES.SANDY_DARK]: {
        colorMain: 'black',
        colorSecondary: 'white',
        colorText: 'rgba(00,00,00,1)',
        colorHalo: 'white'
    },
    [MAP_STYLES_NAMES.WHITE_BLUE]: {
        colorMain: 'black',
        colorSecondary: 'white',
        colorText: 'rgba(00,00,00,1)',
        colorHalo: 'white'
    }
}

const MAP_STYLES = {
    [MAP_STYLES_NAMES.RED_WHITE]: {
        mapId: 'ckxtokn82uotr14lghmcns585', // "cksk4tz3xa8zs18rhk21fgll2",
        url: 'mapbox://styles/ihoskovecpetr/ckxtokn82uotr14lghmcns585',
        waterColor: 'e8e7e3',
        landColor: 'bc002d',
        roadsColor: 'ffffff',
        layoutColor: 'ffffff',
        textColor: 'bc002d'
    },
    [MAP_STYLES_NAMES.WHITE_BLUE]: {
        mapId: 'ckxnqrvzk3cpx15mqrggucyjf', // "ckmzzsrsl0naa17o3ki2xzuoj",
        url: 'mapbox://styles/ihoskovecpetr/ckxnqrvzk3cpx15mqrggucyjf',
        waterColor: '30bcf3',
        landColor: 'f7f5de',
        roadsColor: '000000',
        layoutColor: 'f7f5de',
        textColor: '000000'
    },

    [MAP_STYLES_NAMES.SANDY_DARK]: {
        mapId: 'ckxsnza8nkgzg15mpvjf98g10', // "ckrazk0zr02dg17pnd1rv62m3",
        url: 'mapbox://styles/ihoskovecpetr/ckxsnza8nkgzg15mpvjf98g10',
        waterColor: '054057',
        landColor: 'e2dd7e',
        roadsColor: '000000',
        layoutColor: 'e2dd7e',
        textColor: '000000'
    },
    [MAP_STYLES_NAMES.PALE_BLUE]: {
        mapId: 'ckxsuluh5tw2o14jmkl7u4137', // "ckollex8z78ly18mu9jmefwnz",
        url: 'mapbox://styles/ihoskovecpetr/ckxsuluh5tw2o14jmkl7u4137',
        waterColor: '5e96c9',
        landColor: 'e6d398',
        roadsColor: 'ffffff', //f1eae5
        layoutColor: 'e6d398',
        textColor: '5e96c9'
    },
    [MAP_STYLES_NAMES.BLACK_WHITE]: {
        mapId: 'ckxsnq8z6ixu214udfflq07z9',
        url: 'mapbox://styles/ihoskovecpetr/ckxsnq8z6ixu214udfflq07z9',
        waterColor: 'e8e7e3',
        landColor: 'ffffff',
        roadsColor: '080808',
        layoutColor: 'ffffff',
        textColor: '080808'
    },
    [MAP_STYLES_NAMES.BLACK_LAND]: {
        mapId: 'ckxto4m1k27ic14ljj1950dmb',
        url: 'mapbox://styles/ihoskovecpetr/ckxto4m1k27ic14ljj1950dmb',
        waterColor: 'f8f8f7',
        landColor: '050505',
        roadsColor: 'f1f2f3',
        layoutColor: '050505',
        textColor: 'f1f2f3'
    },
    [MAP_STYLES_NAMES.DOUBLE_BLUE]: {
        mapId: 'ckxtnwnvu50jx14mo7du0nfmo',
        url: 'mapbox://styles/ihoskovecpetr/ckxtnwnvu50jx14mo7du0nfmo',
        waterColor: '405cb0',
        landColor: '20439d',
        roadsColor: 'e0e4f0',
        layoutColor: '20439d',
        textColor: 'e0e4f0'
    },
    [MAP_STYLES_NAMES.RED_BLUE]: {
        mapId: 'ckxnqqjt2owwo15lumitjtlkp',
        url: 'mapbox://styles/petrhoskovec/ckxnqqjt2owwo15lumitjtlkp',
        waterColor: '1babc8',
        landColor: '4c060d',
        roadsColor: 'f1eae5',
        layoutColor: '4c060d',
        textColor: 'f1eae5'
    },

    [MAP_STYLES_NAMES.YELLOW_GREEN]: {
        mapId: 'ckxso7bgiiym915t904s3ra3i', //"ckrg4j3qq51gs17nrk7hy8s64",
        url: 'mapbox://styles/ihoskovecpetr/ckxso7bgiiym915t904s3ra3i',
        waterColor: '159874',
        landColor: 'e4bf45',
        roadsColor: 'f1eae5',
        layoutColor: 'e4bf45',
        textColor: '000000'
    },
    [MAP_STYLES_NAMES.BLUE_YELLOW]: {
        mapId: 'ckxtoyjzze3dy15scteudvvxg',
        url: 'mapbox://styles/ihoskovecpetr/ckxtoyjzze3dy15scteudvvxg',
        waterColor: 'f7d02f',
        landColor: '313d64',
        roadsColor: 'f1eae5',
        layoutColor: '313d64',
        textColor: 'f7d02f'
    },
    [MAP_STYLES_NAMES.GREEN_ORANGE]: {
        mapId: 'ckxtpfoavdojk14qlwu7crwsc',
        url: 'mapbox://styles/ihoskovecpetr/ckxtpfoavdojk14qlwu7crwsc',
        waterColor: 'ea9264',
        landColor: '265b60',
        roadsColor: 'f1eae5',
        layoutColor: '265b60',
        textColor: 'ea9264'
    }
}

const TITLE_NAMES = {
    TITLE: 'heading',
    SUBTITLE: 'subtitle'
}

const FAKE_DIV_IDS = {
    heading: 'fake_heading_div',
    subtitle: 'fake_subtitle_div'
}

const VALID_DISCOUNT_CODES = [
    { code: 'SUMMER2022', discountKoef: 0.9 },
    { code: 'RODINNAPOUTA', discountKoef: 0.5 },
    { code: 'TESTERBUNNY', discountKoef: 0.7 }
]

const REDUX_COOKIE_NAME = 'reduxStoreCookie'

const LABEL_SIZE_KOEF = 0.009

const PATHS = {
    studio: '/studio'
}

const OFFICIAL_EMAIL = 'tripmapshopinfo@gmail.com'

const TAB_STEPS = [
    { full: '__null__', short: 'null' },
    { full: 'step.variants.full', short: 'step.variants.short' },
    { full: 'step.location.full', short: 'step.location.short' },
    { full: 'step.orientation.full', short: 'step.orientation.short' },
    { full: 'step.titles.full', short: 'step.titles.short' },
    { full: 'step.layout.full', short: 'step.layout.short' },
    { full: 'step.layoutColor.full', short: 'step.layoutColor.short' },
    { full: 'step.colors.full', short: 'step.colors.short' },
    { full: 'step.size.full', short: 'step.size.short' },
    { full: 'step.framing.full', short: 'step.framing.short' },
    { full: 'step.material.full', short: 'step.material.short' },
    { full: 'step.checkout.full', short: 'step.checkout.short' }
]

const LANGUAGE_CURRENCY_TABLE = {
    'en': 'USD',
    'cs': 'CZK',
    'en-AU': 'AUD'
}

const LOCALE_TO_LANGUAGE_SHORTCUT = {
    en: 'ENG',
    cs: 'CZ'
}

const AVAILABLE_CURRENCIES = ['EUR', 'USD', 'CZK', 'AUD']
const AVAILABLE_REGIONS = ['EU', 'US', 'AU'] // JP, UK, EU_LV, EU_ES
const AVAILABLE_DESTINATIONS = [
    { country: 'Europe', region: 'EU' },
    { country: 'USA', region: 'US' },
    { country: 'Australia', region: 'AU' }
]
// JP, UK, EU_LV, EU_ES

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
    PATHS,
    OFFICIAL_EMAIL,
    TAB_STEPS,
    LANGUAGE_CURRENCY_TABLE,
    LOCALE_TO_LANGUAGE_SHORTCUT,
    AVAILABLE_CURRENCIES,
    AVAILABLE_REGIONS,
    AVAILABLE_DESTINATIONS
}
