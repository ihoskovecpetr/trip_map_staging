const axios = require("axios");
const Big = require("big.js");

const { getCurrencyRateToCZK } = require("./getCurrencyRateToCZK");

const {
  TAXES_KOEFICIENT,
  MARKUP_KOEFICIENT,
  VARIANTS_PRINTFUL,
} = require("../../../constants/constants");

const getShippingRateCZ = async (variantId) => {
  const axiosConfig = {
    headers: {
      Authorization: `Basic ${process.env.AUTH_KEY_PRINTFUL}`,
      "Access-Control-Allow-Origin": "*",
    },
  };

  const body = {
    recipient: {
      address1: "Krasné",
      city: "Tři Sekery",
      country_code: "CZ",
      zip: 35301,
    },
    items: [
      {
        quantity: 1,
        variant_id: variantId,
      },
    ],
  };

  const response = await axios.post(
    `https://api.printful.com/shipping/rates`,
    body,
    axiosConfig
  );

  const exchangeRateCZKEUR = await getCurrencyRateToCZK({
    currency: "EUR",
  });

  const priceEUR = new Big(response.data.result[0].rate);
  const priceCZK = priceEUR
    .times(exchangeRateCZKEUR)
    // .times(TAXES_KOEFICIENT) // counting in price algorithm
    // .times(MARKUP_KOEFICIENT)
    .div(10)
    .add(1)
    .round(0)
    .times(10)
    .toString();

  const constantVariant = VARIANTS_PRINTFUL.find(
    (variant) => variant.id == variantId
  );

  const constantVariantPrice = constantVariant?.shipping.price;

  if (Number(constantVariantPrice) > Number(priceCZK)) {
    console.log("✅ it is OK, shipping cost Printfull is in limit");
  } else {
    console.log(
      "❌ Btw. PROBLEM, shipping cost Printfull is too high",
      constantVariantPrice,
      priceCZK,
      variantId,
      { raw: response.data.result[0] }
    );
  }

  return {
    ...response.data.result[0],
    rate: constantVariantPrice,
    currency: "CZK",
    variantId: variantId,
  };
};

module.exports = {
  getShippingRateCZ,
};
