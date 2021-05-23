const uuid = require("uuid");
const mongoose = require("mongoose");
const axios = require("axios");

const Order = require("../../mongoModels/order.js");
const { getIsProduction } = require("../../LibGlobal/getIsProduction");

const IS_PRODUCTION = getIsProduction();

const API_KEY = IS_PRODUCTION
  ? process.env.STRIPE_API_KEY
  : process.env.STRIPE_API_KEY_TEST;

const stripe = require("stripe")(API_KEY);

// const connectToMongoose = async () => {
//   try {
//     const data = await mongoose.connect(
//       `mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0.krtpb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     );

//     console.log("✅ Connected to DB", { data });
//     return data;
//   } catch (err) {
//     console.error("❌ could not connect to DB ", { err });
//   }
// };

const orderOnPrintful = async ({ shipping, product, imageObj }) => {
  try {
    const axiosConfig = {
      headers: {
        Authorization: `Basic ${process.env.AUTH_KEY_PRINTFUL}`,
      },
    };

    const body = {
      recipient: {
        name: shipping.name,
        address1: shipping.address.line1,
        city: shipping.address.city,
        country_code: shipping.address.country,
        zip: shipping.address.postal_code,
      },
      items: [
        {
          variant_id: product.variantId,
          quantity: 1,
          files: [
            {
              url: imageObj.url,
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      "https://api.printful.com/orders",
      {
        ...body,
      },
      axiosConfig
    );

    if (response?.data?.result?.error === null) {
      console.log("✅ 🚀 Successfully ordered via Printful");
      return true;
    }
    console.log("❌ Printful API error ", {
      respData: response.data,
    });
    return false;
  } catch (e) {
    console.error("❌ Printful error", JSON.stringify(e.response, null, 4));
    return false;
    throw e;
  }
};

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        console.log("Hitting checkout-to-printful, await MONGO connection");

        // await connectToMongoose();

        const sessionId = req.query.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log("Find data in MongoDB");
        const { clientProductObj, imageObj } = await Order.findOne({
          sessionId: sessionId,
        });

        console.log("Data found from ORDER_MONGODB", { imageObj });

        if (!clientProductObj || !imageObj) {
          console.log("❌ Data not found in MongoDB");
        }

        const result = await orderOnPrintful({
          // tokenCard: token.card,
          shipping: session.shipping,
          product: clientProductObj,
          imageObj: imageObj,
        });

        if (result) {
          // res.status(200)
          res.redirect(`/congratulation?id=${sessionId}`);
          return;
        }
        return res.json({ id: "failed to order print" });

        // status = result ? "success" : "failure";
        // res.status(result ? 200 : 402);
      } catch (error) {
        console.error("Error:", error);
        status = error.message || "random failure";
        res.status(402);
        res.json({ error });
      }

      // res.json({ error, status });

      break;

    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
