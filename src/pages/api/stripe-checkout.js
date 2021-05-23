const uuid = require("uuid");
const mongoose = require("mongoose");
const Big = require("big.js");

const Order = require("../../mongoModels/order.js");
const { getIsProduction } = require("../../LibGlobal/getIsProduction");
const {
  getPriceAlgorithm,
} = require("../../LibGlobal/priceAlgorithm/getPriceAlgorithm");

const {
  fetchAndTransformDataPrintful,
} = require("./Lib/fetchAndTransformDataPrintful");

const IS_PRODUCTION = getIsProduction();

const API_KEY = IS_PRODUCTION
  ? process.env.STRIPE_API_KEY
  : process.env.STRIPE_API_KEY_TEST;

const stripe = require("stripe")(API_KEY);

const connectToMongoose = async () => {
  try {
    console.log({
      MongoX: process.env.MONGO_user,
      c: process.env.MONGO_password,
      d: process.env.MONGO_DB_NAME,
    });

    const data = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Connected to DB");
    return data;
  } catch (err) {
    console.error("❌ could not connect to DB ", { err });
    throw err;
  }
};

const test_shipping_code = ["shr_1Ip7NWKQWovk2rIhdfYl73aq"];
const test_shipping_code_czk = ["shr_1IqgqIKQWovk2rIhCDcikEM0"];

const priceAlgorithm = getPriceAlgorithm();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        console.log("Hitting stripe-checkout, await MONGO connection");

        await connectToMongoose();

        console.log(
          "✅ mongo connected_connestions?",
          mongoose.connections[0].readyState
        );

        const {
          product: clientProduct,
          imageObj,
          checkoutShownPrices,
        } = req.body;

        const responsePrintful = await fetchAndTransformDataPrintful([
          clientProduct.variantId,
        ]);

        const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
          clientProduct.variantId,
          responsePrintful
        );
        const priceWithoutDelivery = priceAlgorithm.getPriceWithoutDelivery(
          clientProduct.variantId,
          responsePrintful
        );

        if (
          priceWithDelivery?.netPrice !==
          checkoutShownPrices.netPriceWithDelivery
        ) {
          console.log("❌ Prices coming from browser are wrong");
          return res.json({ error: "❌ Prices coming from browser are wrong" });
        } else {
          console.log("💰✅ Prices coming from browser are correct");
        }

        const product = await stripe.products.create({
          name: clientProduct.name,
          images: [imageObj.url],
        });

        const price = await stripe.prices.create({
          unit_amount: priceWithoutDelivery.netPrice * 100, //TODO big.js
          currency: "czk",
          product: product.id,
        });

        const SHIPPING_RATE_CODE = IS_PRODUCTION
          ? [clientProduct.shippingCode]
          : test_shipping_code_czk;

        const BASE_DOMAIN = IS_PRODUCTION
          ? "http://www.tripmap.shop"
          : "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
          cancel_url: BASE_DOMAIN + "/studio", //TODO get local address for redirect
          success_url:
            BASE_DOMAIN + "/api/checkout-to-printful?id={CHECKOUT_SESSION_ID}", //TODO get local address for redirect

          locale: "cs",
          metadata: {},
          mode: "payment",
          payment_method_options: {},
          payment_method_types: ["card"],
          shipping_rates: SHIPPING_RATE_CODE,
          shipping_address_collection: {
            allowed_countries: ["CZ", "PL", "DE"],
          },

          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
        });

        const newOrder = new Order({
          sessionId: session.id,
          clientProductObj: clientProduct,
          imageObj: imageObj,
        });

        await newOrder.save();

        return res.json({ id: session.id });
      } catch (error) {
        console.error("Error:", error);
        res.status(402);
        res.json({ error });
      }

      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
