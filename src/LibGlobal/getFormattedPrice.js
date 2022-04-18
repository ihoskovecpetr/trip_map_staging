const formatNumber = require("number-format.js");

const NON_BREAKING_SPACE = "\u00A0";

const CODE = "CZK";
// const SYMBOL = "€";
const FORMAT = "$ ### ### ###.##";

const getFormattedPrice = ({
  amount,
  format = FORMAT,
  // currencySymbol = SYMBOL,
  currency = CODE,
}) => {
  const regex = /#.#*(?=[^#]*$)/;
  const replacer = "0";

  const modifiedFormat = format.replace(regex, (match) => {
    if (Number.isInteger(amount)) {
      return match.replace("#", replacer);
    }

    return match.replace(/#/g, replacer);
  });

  const formatWithProperCurrency = currency
    ? modifiedFormat.replace("$", currency)
    : modifiedFormat;

  return formatNumber(formatWithProperCurrency, amount).replace(
    /\s/g,
    NON_BREAKING_SPACE
  );
};

module.exports = { getFormattedPrice };
