const uuid = require("uuid");
const mongoose = require("mongoose");
const axios = require("axios");
const Big = require("big.js");

const { getShippingRateCZ } = require("./Lib/getShippingRateCZ");
const { getCurrencyRateToCZK } = require("./Lib/getCurrencyRateToCZK");

const {
  TAXES_KOEFICIENT,
  MARKUP_KOEFICIENT,
} = require("../../constants/constants");

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      const axiosConfig = {
        headers: {
          Authorization: `Basic ${process.env.AUTH_KEY_PRINTFUL}`,
          "Access-Control-Allow-Origin": "*",
        },
      };

      const { variantIdsArr } = req.body;

      const promises = variantIdsArr.map((variantId) =>
        axios.get(
          `https://api.printful.com/products/variant/${variantId}`,
          axiosConfig
        )
      );

      const promisesShipping = variantIdsArr.map((variantId) =>
        getShippingRateCZ(variantId)
      ); //TODO: is there way how to query all in one request?

      const responses = await Promise.all(promises);
      const responsesShip = await Promise.all(promisesShipping);

      const exchangeRateUSDtoCZK = await getCurrencyRateToCZK({
        currency: "USD",
      });

      const finalResult = responses.reduce((acc, cur) => {
        const priceUSD = new Big(cur.data.result.variant.price);
        const priceCZK = priceUSD
          .times(exchangeRateUSDtoCZK)
          // .times(TAXES_KOEFICIENT)
          // .times(MARKUP_KOEFICIENT)
          .div(10)
          .add(1)
          .round(0)
          .times(10)
          .toString();

        const shippingVariantObj = responsesShip.find(
          (item) => item.variantId === cur.data.result.variant.id
        );

        const availableEU =
          cur.data.result.variant.availability_status.find(
            ({ region }) => region === "EU"
          ).status === "in_stock";

        return {
          ...acc,
          [cur.data.result.variant.id]: {
            price: priceCZK,
            url: cur.data.result.variant.image,
            currency: "CZK",
            availableEU: availableEU,
            shipping: shippingVariantObj,
          },
        };
      }, {});

      res.status(200).json({
        finalResult,
      });

      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
