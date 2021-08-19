const axios = require("axios");
const { getShippingCostCZ } = require("./getShippingCostCZ");
const { getCurrencyRateToCZK } = require("./getCurrencyRateToCZK");
const {
  getPriceAlgorithm,
} = require("LibGlobal/priceAlgorithm/getPriceAlgorithm");
const Big = require("big.js");

const {
  TAX_PERCENTAGE,
  GROSS_PROFIT_PERCENTAGE,
} = require("constants/constants.js");

const fetchAndTransformDataPrintful = async (variantIdsArr, res) => {
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
      getShippingCostCZ(variantId)
    ); //TODO: is there way how to query all in one request?

    const responsesProductCost = await Promise.all(promisesProductCost);
    const responsesShippingCost = await Promise.all(promisesShippingCost);

    const exchangeRateUSDtoCZK = await getCurrencyRateToCZK({
      currency: "USD",
    });

    const finalResult = responsesProductCost.reduce((acc, cur) => {
      const productCostUSD = new Big(cur.data.result.variant.price);
      const productCostCZK = productCostUSD
        .times(exchangeRateUSDtoCZK)
        .div(10)
        .add(1)
        .round(0)
        .times(10)
        .toString();

      const shippingVariantObj = responsesShippingCost.find(
        (item) => item.variantId === cur.data.result.variant.id
      );

      const availableEU =
        cur.data.result.variant.availability_status.find(
          ({ region }) => region === "EU"
        ).status === "in_stock";

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
          costProductWithDelivery: costWithShipping,
          priceWithDeliveryAndProfit: priceWithDeliveryAndProfit,
          url: cur.data.result.variant.image,
          currency: "CZK",
          availableEU: availableEU,
          shipping: shippingVariantObj,
        },
      };
    }, {});

    return finalResult;
  } catch (e) {
    res.status(420).json({
      error: e,
    });
  }
};

module.exports = {
  fetchAndTransformDataPrintful,
};
