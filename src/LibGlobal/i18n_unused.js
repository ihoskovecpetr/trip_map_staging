const NextI18Next = require("next-i18next").default;
const path = require("path");
const cookie = require("cookie");

const {
  IS_SERVER,
  KOA_LANGUAGE_COOKIE_ID,
  LOCALES,
} = require("constants/constants");

const serverDetector = {
  name: "server-detector",

  lookup(req) {
    if (!IS_SERVER || !req?.language) {
      return null;
    }

    return req.language;
  },
};

const browserDetector = {
  name: "browser-detector",

  lookup() {
    if (IS_SERVER) {
      return null;
    }

    return cookie.parse(window.document.cookie)[KOA_LANGUAGE_COOKIE_ID];
  },
};

const nextI18Next = new NextI18Next({
  otherLanguages: Object.values(LOCALES),
  defaultNS: "common",
  serverLanguageDetection: true,
  browserLanguageDetection: true,
  customDetectors: [serverDetector, browserDetector],
  defaultLanguage: LOCALES.FR,

  detection: {
    order: ["server-detector", "browser-detector"],
  },

  localePath: IS_SERVER
    ? path.resolve("./frontend/public/locales")
    : "/ami/locales",
});

module.exports = nextI18Next;
