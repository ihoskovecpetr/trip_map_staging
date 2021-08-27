const mongoose = require("mongoose");
const FullStore = require("../../mongoModels/fullStore.js");
const { REDUX_COOKIE_NAME } = require("../../constants/constants.js");
const { v4 } = require("uuid");

const connectToMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Connected to DB");
    return;
  } catch (err) {
    console.error("❌ could not connect to DB ", { err });
    throw err;
  }
};

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      const { reduxStore, storeId } = req.body;

      try {
        await connectToMongoose();

        const updatedStore = await FullStore.findOneAndUpdate(
          {
            storeId: storeId,
          },
          { ...reduxStore },
          { new: true }
        );

        if (updatedStore) {
          res.status(200).json({
            ok: "UPDATED",
            storeId: storeId,
            updatedStore,
          });
        } else {
          res.status(200).json({
            ok: "NOT_UPDATED",
          });
        }
      } catch (e) {
        console.error("save_redux_store Error: ", { e });
        res.status(500).json({
          e,
        });
      }

      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
