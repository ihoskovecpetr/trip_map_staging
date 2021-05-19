const axios = require("axios");

const getCurrencyRateToCZK = async ({ currency }) => {
  if (!["EUR", "USD"].includes(currency)) {
    throw "Unsupported currency";
  }

  const exchangeRateCZKToCurrency = await axios.get(
    `https://api.frankfurter.app/latest?amount=1&from=${currency}&to=CZK`
  );

  return exchangeRateCZKToCurrency.data.rates.CZK;
};

module.exports = {
  getCurrencyRateToCZK,
};
