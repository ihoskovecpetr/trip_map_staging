const uuid = require("uuid");
const mongoose = require("mongoose");
const axios = require("axios");
const hbs = require("nodemailer-express-handlebars");

const Order = require("../../mongoModels/order.js");
const { getIsProduction } = require("../../LibGlobal/getIsProduction");
const smtpTransport = require("./Lib/newsEmailService.js");

const IS_PRODUCTION = getIsProduction();

const API_KEY = IS_PRODUCTION
  ? process.env.STRIPE_API_KEY
  : process.env.STRIPE_API_KEY_TEST;

const emailHeading = IS_PRODUCTION
  ? "TripMap Order 🚀"
  : "TEST_TripMap Order ❕";

const stripe = require("stripe")(API_KEY);

const smtpTransport0 = smtpTransport.getSmtpTransport();

smtpTransport0.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: "./",
      layoutsDir: "./",
      defaultLayout: "./src/pages/api/newsList.handlebars",
    },
    viewPath: "",
  })
);

const connectToMongoose = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to DB", { data });
    return data;
  } catch (err) {
    console.error("❌ could not connect to DB ", { err });
  }
};

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
      console.log("✅ 🚀 Successfully ordered via Printful", {
        result: response?.data?.result,
      });

      const mailOptions0 = {
        from: "Brekkie",
        to: "ihoskovecpetr@gmail.com",
        subject: emailHeading,
        template: "./src/pages/api/newsList",
        context: {
          // headlines: newHeadlines,
          // paragraph: "paragraph",
          dashboard_url_printful: response.data.result.dashboard_url,
        },
      };

      await smtpTransport0.sendMail(mailOptions0);
      smtpTransport0.close();

      return true;
    }
    console.log("❌ Printful API error ", {
      respData: response.data,
    });
    return false;
  } catch (e) {
    console.error("❌ Printful error", JSON.stringify(e, null, 4));
    return false;
    throw e;
  }
};

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        console.log("Hitting checkout-to-printful, await MONGO connection");

        await connectToMongoose();

        const sessionId = req.query.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log("Find data in MongoDB");
        const { clientProductObj, imageObj } = await Order.findOne({
          sessionId: sessionId,
        });

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
        const message = error.message || "random failure";
        res.status(402);
        res.json({ message, error });
      }

      break;

    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
