const uuid = require("uuid");
const mongoose = require("mongoose");
const axios = require("axios");
const hbs = require("nodemailer-express-handlebars");

const Order = require("../../mongoModels/order.js");
const { getIsProduction } = require("../../LibGlobal/getIsProduction");
const smtpTransportTMEmail = require("./Lib/SMTPTransportTMEmail.js");
const { getVariantObject } = require("LibGlobal/getVariantObject");
const { getFormattedPrice } = require("LibGlobal/getFormattedPrice");
const {
  getPriceAlgorithm,
} = require("LibGlobal/priceAlgorithm/getPriceAlgorithm");

const IS_PRODUCTION = getIsProduction();

const priceAlgorithm = getPriceAlgorithm();

const API_KEY = IS_PRODUCTION
  ? process.env.STRIPE_API_KEY
  : process.env.STRIPE_API_KEY_TEST;

const emailHeadingAdminNotice = IS_PRODUCTION
  ? "PRODUCTION_TripMap Order 🚀"
  : "TEST_TripMap Order";

const emailHeadingCustomer = IS_PRODUCTION
  ? "PRODUCTION_TripMap Order Confirmation 🚀"
  : "TEST_TripMap Order Confirmation";

const stripe = require("stripe")(API_KEY);

const axiosConfig = {
  headers: {
    Authorization: `Basic ${process.env.AUTH_KEY_PRINTFUL}`,
  },
};

const smtpTransportNotice = smtpTransportTMEmail.getSmtpTransport();
const smtpTransportCustommer = smtpTransportTMEmail.getSmtpTransport();

smtpTransportNotice.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: "./",
      layoutsDir: "./",
      defaultLayout: "./src/pages/api/orderAdminNotice.handlebars",
    },
    viewPath: "",
  })
);

smtpTransportCustommer.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: "./",
      layoutsDir: "./",
      defaultLayout: "./src/pages/api/orderCustommerConfirmation.handlebars",
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
    return data;
  } catch (err) {
    console.error("❌ could not connect to DB ", { err });
  }
};

const orderOnPrintful = async ({ shipping, product, imageObj }) => {
  try {
    const responsePrintful = await axios.post(
      "https://api.printful.com/orders",
      {
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
      },
      axiosConfig
    );

    if (responsePrintful?.data?.result?.error === null) {
      console.log("✅ 🚀 Successfully ordered via Printful", {
        result: responsePrintful?.data?.result,
      });
    }
    console.log("❌ Printful API error ", {
      respData: responsePrintful.data,
    });

    return responsePrintful;
  } catch (e) {
    console.error("❌ checkout-to-printful error", JSON.stringify(e, null, 4));
    throw e;
  }
};

const sendEmailsHandler = async ({
  session,
  responsePrintful,
  product,
  mapTitles,
}) => {
  try {
    console.log({ getHighSession: session });

    const productDescription = getVariantObject(product.variantId)?.frameName;

    const promises = [
      smtpTransportNotice.sendMail({
        from: "Brekkie",
        to: process.env.EMAIL_RECIPIENT,
        subject: emailHeadingAdminNotice,
        template: "./src/pages/api/orderAdminNotice",
        context: {
          dashboard_url_printful: responsePrintful.data.result.dashboard_url,
        },
      }),
      smtpTransportCustommer.sendMail({
        from: "No",
        to: session.customer_details.email,
        subject: emailHeadingCustomer,
        template: "./src/pages/api/orderCustommerConfirmation",
        context: {
          // dashboard_url_printful: responsePrintful.data.result.dashboard_url,
          product: product,
          productDescription,
          mapTitles,
          sessionId: session.id,
          sessionAmountTotal: getFormattedPrice(
            priceAlgorithm.divide(session.amount_total, 100) ?? 0
          ),
        },
        attachments: [
          {
            // path: path.join(__dirname, '../PDF/pozdrav.pdf'), // <= Here
            path: `./src/pages/api/docs/Obchodni-podminky.pdf`,
            contentType: "application/pdf",
          },
          {
            path: `./src/pages/api/docs/Podminky-ochrany-osobnich-udaju-GDPR.pdf`,
            contentType: "application/pdf",
          },
          {
            path: `./src/pages/api/docs/Reklamace-odstoupeni-od-smlouvy.pdf`,
            contentType: "application/pdf",
          },
          {
            filename: `Formulář-odstoupení-od-smlouvy.pdf'`,
            path: `./src/pages/api/docs/Odstoupeni-od-smlouvy.pdf`,
            contentType: "application/pdf",
          },
        ],
      }),
    ];

    const [resp, respCustommer] = await Promise.all(promises);

    smtpTransportNotice.close();
    smtpTransportCustommer.close();

    console.log(`✅ Sent email to ${process.env.EMAIL_RECIPIENT}`, {
      resp,
      respCustommer,
    });

    return true;
  } catch (e) {
    console.log("Error while mailing: ", { e });
    return false;
  }
};

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      try {
        await connectToMongoose();

        const sessionId = req.query.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const { clientProductObj, imageObj, mapTitles } = await Order.findOne({
          sessionId: sessionId,
        });

        if (!clientProductObj || !imageObj) {
          console.log("❌ Data not found in MongoDB");
        }

        const responsePrintful = await orderOnPrintful({
          shipping: session.shipping,
          product: clientProductObj,
          imageObj: imageObj,
        });

        sendEmailsHandler({
          session,
          responsePrintful,
          product: clientProductObj,
          mapTitles,
        });

        if (responsePrintful) {
          res.redirect(`/congratulation?id=${sessionId}`);
          return;
        }
        return res.json({ id: "failed to order print" });
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
