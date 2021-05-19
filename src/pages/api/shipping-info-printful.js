const { getShippingRateCZ } = require("./Lib/getShippingRateCZ");

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      console.log("shipping-info-printful variant: ", {
        reqQueryVariantId: req.query.variantId,
      });

      // const axiosConfig = {
      //   headers: {
      //     Authorization: `Basic ${process.env.AUTH_KEY_PRINTFUL}`,
      //     "Access-Control-Allow-Origin": "*",
      //   },
      // };

      // const body = {
      //   recipient: {
      //     address1: "Krasné",
      //     city: "Tři Sekery",
      //     country_code: "CZ",
      //     zip: 35301,
      //   },
      //   items: [
      //     {
      //       quantity: 1,
      //       variant_id: req.query.variantId,
      //     },
      //     {
      //       quantity: 1,
      //       variant_id: 2,
      //     },
      //   ],
      // };

      // const response = await axios.post(
      //   `https://api.printful.com/shipping/rates`,
      //   body,
      //   axiosConfig
      // );

      // console.log({
      //   responseSHIPCOST: response.data.result[0],
      //   responseSHIPCOST2: response.data.result[1],
      // });

      // const exchangeRateUSD = await exchangeRates()
      //   .latest()
      //   .base("EUR")
      //   .fetch();

      // const priceEUR = new Big(response.data.result[0].rate);
      // const priceCZK = priceEUR.times(exchangeRateUSD.CZK).round(0);

      // // {
      // // id: 'STANDARD',
      // // name: 'Flat Rate (Estimated delivery: May 25⁠–Jun 10) ',
      // // rate: '6.00',
      // // currency: 'EUR',
      // // minDeliveryDays: 6,
      // // maxDeliveryDays: 15
      // // }

      // const resultObj = {
      //   ...response.data.result[0],
      //   rate: priceCZK,
      //   currency: "CZK",
      // };

      // // const finalResult = responses.reduce((acc, resp) => {
      // //   return {
      // //     ...acc,
      // //     [resp.data.result.variant.id]: {
      // //       price: resp.data.result.variant.price * 1.0,
      // //       url: resp.data.result.variant.image,
      // //       currency: resp.data.result.product.currency,
      // //     },
      // //   };
      // // }, {});

      const resultObj = await getShippingRateCZ(req.query.variantId);

      res.status(200).json({
        result: resultObj,
      });

      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
