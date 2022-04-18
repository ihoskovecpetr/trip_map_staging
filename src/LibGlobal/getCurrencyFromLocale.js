import { LANGUAGE_CURRENCY_TABLE } from "constants/constants";

const getCurrencyFromLocale = (locale) => {
  if (LANGUAGE_CURRENCY_TABLE[locale]) {
    return LANGUAGE_CURRENCY_TABLE[locale];
  } else {
    console.error("no locale recognized, using default currency 'USD'");
    return "USD";
  }
};

module.exports = {
  getCurrencyFromLocale,
};
