const uuid = require("uuid");
const mongoose = require("mongoose");
const axios = require("axios");
const lookup = require("country-code-lookup");

const Order = require("../../mongoModels/order.js");
const { getIsProduction } = require("../../Lib/getIsProduction");

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
    const data = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0.krtpb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log("✅ Connected to DB");
    return data;
  } catch (err) {
    console.error("❌ could not connect to DB ", { err });
    throw err;
  }
};

const test_shipping_code = ["shr_1Ip7NWKQWovk2rIhdfYl73aq"];
const test_shipping_code_czk = ["shr_1IqgqIKQWovk2rIhCDcikEM0"];

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        console.log("Hitting stripe-checkout, await MONGO connection");

        await connectToMongoose();

        console.log("✅ mongo connected ");

        const { product: clientProduct, token, imageObj } = req.body;

        console.log({ imageObj });

        const product = await stripe.products.create({
          name: clientProduct.name,
          images: [imageObj.url],
        });

        const price = await stripe.prices.create({
          unit_amount: clientProduct.price * 100, //TODO big.js
          currency: "czk",
          product: product.id,
        });

        const SHIPPING_RATE_CODE = IS_PRODUCTION
          ? [clientProduct.shippingCode]
          : test_shipping_code_czk;

        const BASE_DOMAIN = IS_PRODUCTION
          ? "http://www.tripmap.shop"
          : "http://localhost:3000";

        console.log({ SHIPPING_RATE_CODE });

        const session = await stripe.checkout.sessions.create(
          {
            cancel_url: BASE_DOMAIN + "/studio", //TODO get local address for redirect
            success_url:
              BASE_DOMAIN +
              "/api/checkout-to-printful?id={CHECKOUT_SESSION_ID}", //TODO get local address for redirect

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
          }
          // {
          //   idempotencyKey,
          // }
        );

        console.log({ session });

        const newOrder = new Order({
          sessionId: session.id,
          clientProductObj: clientProduct,
          imageObj: imageObj,
        });

        const savedOrderMongo = await newOrder.save();

        console.log({ savedOrderMongo });

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
