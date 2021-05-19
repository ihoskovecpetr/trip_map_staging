// const uuid = require("uuid");
// const mongoose = require("mongoose");
// const axios = require("axios");
// const lookup = require("country-code-lookup");

// const Order = require("../../mongoModels/order.js");
// const { getIsProduction } = require("../../Lib/getIsProduction");

// const IS_PRODUCTION = getIsProduction();

// const API_KEY = IS_PRODUCTION
//   ? process.env.STRIPE_API_KEY
//   : process.env.STRIPE_API_KEY_TEST;

// const stripe = require("stripe")(API_KEY);

// const connectToMongoose = async () => {
//   try {
//     const data = await mongoose.connect(
//       `mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0.krtpb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     );

//     console.log("✅ Connected to DB");
//     return data;
//   } catch (err) {
//     console.error("❌ could not connect to DB ", { err });
//   }
// };

// const orderOnPrintful = async ({
//   tokenCard,
//   product,
//   imageObj,
//   countryCode,
// }) => {
//   try {
//     const axiosConfig = {
//       headers: {
//         Authorization: `Basic ${process.env.AUTH_KEY_PRINTFUL}`,
//       },
//     };

//     const body = {
//       recipient: {
//         name: tokenCard.name,
//         address1: tokenCard.address_line1,
//         city: tokenCard.address_city,
//         country_code: countryCode,
//         zip: tokenCard.address_zip,
//       },
//       items: [
//         {
//           variant_id: product.variantId,
//           quantity: 1,
//           files: [
//             {
//               url: imageObj.url,
//             },
//           ],
//         },
//       ],
//     };

//     const response = await axios.post(
//       "https://api.printful.com/orders",
//       {
//         ...body,
//       },
//       axiosConfig
//     );
//     if (response?.data?.result?.error === null) {
//       console.log("✅ 🚀 Successfully ordered via Printful");
//       return true;
//     }
//     console.log("❌ Printful API error ", {
//       respData: response.data,
//     });
//     return false;
//   } catch (e) {
//     console.error("❌ Printful error", JSON.stringify(e.response, null, 4));
//     return false;
//     throw e;
//   }
// };

// export default async (req, res) => {
//   switch (req.method) {
//     case "GET":
//       await connectToMongoose();

//       res.status(200).json({ post: 213, data: { xy: "GET dta" } });

//       break;
//     case "POST":
//       let error;
//       let status;
//       try {
//         await connectToMongoose();

//         const { product, token, imageObj } = req.body;

//         const countryCode = lookup.byCountry(token.card.address_country).iso2;

//         const customer = await stripe.customers.create({
//           email: token.email,
//           source: token.id,
//         });

//         const idempotencyKey = uuid.v4();
//         //create offer with this UUID

//         const newOrder = new Order({
//           idempotencyKey: idempotencyKey,
//           payer_name: token.card.name,
//           payer_email: token.email,
//           delivery_address_obj: {
//             line1: token.card.address_line1,
//             line2: token.card.address_line2,
//             city: token.card.address_city,
//             country: token.card.address_country,
//             country_code: countryCode,
//             postal_code: token.card.address_zip,
//           },
//           map_url: imageObj.url,
//           map_image_obj: imageObj,
//           map_height: 24, // TODO: use live data
//           map_width: 18, // TODO: use live data + add ratio
//           price: product.price,
//           order_state: "pending",
//         });

//         await newOrder.save();

//         await stripe.charges.create(
//           {
//             amount: product.price * 100, // TODO: Big.js
//             currency: "usd",
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `Purchase of the: ${product.name}`,
//             shipping: {
//               name: token.card.name,
//               address: {
//                 line1: token.card.address_line1,
//                 line2: token.card.address_line2,
//                 city: token.card.address_city,
//                 country: token.card.address_country,
//                 postal_code: token.card.address_zip,
//               },
//             },
//           },
//           {
//             idempotencyKey,
//           }
//         );

//         await Order.updateOne(
//           {
//             payer_email: token.email,
//             payer_name: token.card.name,
//             idempotencyKey,
//           },
//           {
//             $set: {
//               order_state: "paid",
//             },
//           }
//         );

//         const result = await orderOnPrintful({
//           tokenCard: token.card,
//           product,
//           imageObj,
//           countryCode,
//         });

//         status = result ? "success" : "failure";
//         res.status(402);
//       } catch (error) {
//         console.error("Error:", error);
//         status = error.message || "random failure";
//         res.status(402);
//       }

//       res.json({ error, status });

//       break;
//     default:
//       res.status(405).end(); //Method Not Allowed
//       break;
//   }
// };
