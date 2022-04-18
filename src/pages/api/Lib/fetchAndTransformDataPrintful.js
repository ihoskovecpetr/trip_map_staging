const axios = require("axios");
const { getShippingCost } = require("./getShippingCost");
const { getExchangeRateFromTo } = require("./getExchangeRateFromTo");
const {
  getPriceAlgorithm,
} = require("LibGlobal/priceAlgorithm/getPriceAlgorithm");
const Big = require("big.js");

const {
  TAX_PERCENTAGE,
  GROSS_PROFIT_PERCENTAGE,
} = require("constants/constants.js");

const fetchAndTransformDataPrintful = async (variantIdsArr, currency) => {
  try {
    const axiosConfig = {
      headers: {
        Authorization: `Basic ${process.env.AUTH_KEY_PRINTFUL}`,
        "Access-Control-Allow-Origin": "*",
      },
    };

    const priceAlgorithm = getPriceAlgorithm();

    const promisesProductCost = variantIdsArr.map((variantId) =>
      axios.get(
        `https://api.printful.com/products/variant/${variantId}`,
        axiosConfig
      )
    );

    const promisesShippingCost = variantIdsArr.map((variantId) =>
      getShippingCost(variantId, currency)
    ); //TODO: is there way how to query all in one request?

    const responsesProductCost = await Promise.all(promisesProductCost);
    const responsesShippingCost = await Promise.all(promisesShippingCost);

    console.log("go_get_exch_rate", { currency });

    const exchangeRateUSDtoCurrency = await getExchangeRateFromTo({
      from: "USD",
      to: currency,
    });

    const finalResult = responsesProductCost.reduce((acc, cur) => {
      try {
        const productCostUSD = new Big(cur.data.result.variant.price);

        const productCostCZK = productCostUSD
          .times(exchangeRateUSDtoCurrency)
          .round(0)
          .toString();

        const shippingVariantObj = responsesShippingCost.find(
          (item) => item.variantId === cur.data.result.variant.id
        );

        const availableEU =
          cur.data.result.variant.availability_status.find(
            ({ region }) => region === "EU"
          )?.status === "in_stock";

        const costWithShipping = priceAlgorithm.add([
          productCostCZK,
          shippingVariantObj.cost,
        ]);

        const priceWithDeliveryAndProfit = priceAlgorithm.getPrice(
          costWithShipping,
          TAX_PERCENTAGE,
          GROSS_PROFIT_PERCENTAGE
        );

        return {
          ...acc,
          [cur.data.result.variant.id]: {
            price: productCostCZK,
            // costProductWithDelivery: costWithShipping,
            priceWithDeliveryAndProfit: priceWithDeliveryAndProfit, // using this one
            url: cur.data.result.variant.image, // using this one
            currency: currency,
            availableEU: availableEU, // using this one
            available_regions_arr: cur.data.result.variant.availability_status
              .filter((item) => item.status === "in_stock")
              .map((obj) => obj.region),
            shipping: shippingVariantObj, // using this one
          },
        };
      } catch (e) {
        console.log({ error_in_reducer: e });
      }
    }, {});

    return finalResult;
  } catch (e) {
    console.log("TransformDataPrintful_Error", { e });
    throw e;
  }
};

module.exports = {
  fetchAndTransformDataPrintful,
};
