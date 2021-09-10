const mongoose = require("mongoose");
const Big = require("big.js");

const Order = require("../../mongoModels/order.js");
const { getIsProduction } = require("../../LibGlobal/getIsProduction");

const {
  getPriceAlgorithm,
} = require("LibGlobal/priceAlgorithm/getPriceAlgorithm");

const {
  fetchAndTransformDataPrintful,
} = require("./Lib/fetchAndTransformDataPrintful");

const { REDUX_COOKIE_NAME } = require("../../constants/constants.js");

const IS_PRODUCTION = getIsProduction();

const API_KEY = IS_PRODUCTION
  ? process.env.STRIPE_API_KEY
  : process.env.STRIPE_API_KEY_TEST;

const stripe = require("stripe")(API_KEY);

const connectToMongoose = async () => {
  try {
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

const test_shipping_code_czk = ["shr_1JMc7WCVDm94CHWQTFxCa4yY"];

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
          discountCode,
          mapTitles,
          storeId,
        } = req.body;

        const responsePrintful = await fetchAndTransformDataPrintful([
          clientProduct.variantId,
        ]);

        const netPriceWithDeliv =
          responsePrintful?.[clientProduct.variantId]
            ?.priceWithDeliveryAndProfit.netPrice;

        const priceDiscounted = priceAlgorithm.getDiscountedPrice(
          netPriceWithDeliv,
          discountCode
        );

        if (
          priceDiscounted?.netPrice !== checkoutShownPrices.netPriceWithDelivery
        ) {
          console.log(
            "❌ Prices coming from browser are wrong",
            priceDiscounted?.netPrice,
            checkoutShownPrices.netPriceWithDelivery
          );
          res.status(406);
          res.json({ error: "❌ Prices coming from browser are wrong" });
        } else {
          console.log("💰✅ Prices coming from browser are correct");
        }

        const product = await stripe.products.create({
          name: clientProduct.name,
          images: [imageObj.url],
        });

        const price = await stripe.prices.create({
          unit_amount: priceDiscounted.netPrice * 100,
          currency: "czk",
          product: product.id,
        });

        const SHIPPING_RATE_CODE = IS_PRODUCTION
          ? [clientProduct.shippingCode]
          : test_shipping_code_czk;

        const BASE_DOMAIN = IS_PRODUCTION
          ? "http://www.tripmap.shop"
          : "http://localhost:3000";

        const cookieStoreId = req.cookies[REDUX_COOKIE_NAME];

        const session = await stripe.checkout.sessions.create({
          cancel_url: BASE_DOMAIN + `/studio?id=${cookieStoreId}`,
          success_url:
            BASE_DOMAIN + "/api/checkout-success?id={CHECKOUT_SESSION_ID}",

          locale: "cs",
          metadata: {},
          mode: "payment",
          payment_method_options: {},
          payment_method_types: ["card"],
          // shipping_rates: SHIPPING_RATE_CODE,
          shipping_address_collection: {
            allowed_countries: ["CZ"], //"PL", "DE"
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
          mapTitles,
          storeId: storeId,
        });

        await newOrder.save();

        return res.json({ id: session.id });
      } catch (error) {
        console.error("Stripe Error:", error);
        res.status(402);
        res.json({ error });
      }

      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
