const DefaultPriceAlgorithm = require("./DefaultPriceAlgorithm");

const {
  TAX_PERCENTAGE,
  GROSS_PROFIT_PERCENTAGE,
} = require("../../constants/constants.js");

const getPriceAlgorithm = (country) => {
  console.log({ TAX_PERCENTAGE, GROSS_PROFIT_PERCENTAGE });
  switch (country) {
    default:
      return new DefaultPriceAlgorithm({
        roundingPrecision: 0,
        taxPercentage: TAX_PERCENTAGE,
        profitPercentage: GROSS_PROFIT_PERCENTAGE,
      });
  }
};

module.exports = getPriceAlgorithm;
