const mongoose = require("mongoose");
const { v4 } = require("uuid");

const FullStore = require("../../../mongoModels/fullStore.js");
const { REDUX_COOKIE_NAME } = require("../../../constants/constants.js");

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

let counter = 0;

const initDataMiddleware = () => async (req, res, next) => {
  if (
    req.url.includes("/_next/") ||
    req.url.includes("/api/") ||
    req.url.includes("/favicon.ico")
  ) {
    return next();
  }

  counter++;
  await connectToMongoose();

  const cookieStoreId = req.cookies[REDUX_COOKIE_NAME];

  if (req && req.query && req.query.id) {
    const foundStoreFromQuery = await FullStore.findOne({
      storeId: req.query.id,
    });

    if (foundStoreFromQuery) {
      const foundStoreWithout_secrets = { ...foundStoreFromQuery._doc };

      delete foundStoreWithout_secrets._id;
      delete foundStoreWithout_secrets.createdAt;
      delete foundStoreWithout_secrets.updatedAt;

      if (req && req.query.id === cookieStoreId) {
        req.meta = {
          ...foundStoreWithout_secrets,
        };
      }

      if (req && req.query.id != cookieStoreId) {
        const newStoreId0 = v4();

        const newStore = new FullStore({
          storeId: newStoreId0,
        });

        await newStore.save();

        // creating copy of shared store
        req.meta = {
          ...foundStoreWithout_secrets,
          storeId: newStoreId0,
        };
      }
    }

    if (!foundStoreFromQuery && req && req.query.id != cookieStoreId) {
      const newStoreId = v4();
      const newStore = new FullStore({
        storeId: newStoreId,
      });

      await newStore.save();

      req.meta = {
        storeId: newStoreId,
      };
    }
  } else {
    const foundStoreCookie = await FullStore.findOne({
      storeId: cookieStoreId,
    });

    if (foundStoreCookie) {
      const foundStoreCookieDoc = { ...foundStoreCookie._doc };
      delete foundStoreCookieDoc._id;
      delete foundStoreCookieDoc.createdAt;
      delete foundStoreCookieDoc.updatedAt;

      req.meta = {
        ...foundStoreCookieDoc,
      };
    } else {
      const newStoreId2 = v4();
      const newStore = new FullStore({
        storeId: newStoreId2,
      });

      await newStore.save();

      req.meta = {
        storeId: newStoreId2,
      };
    }
  }

  return next();
};

module.exports = initDataMiddleware;
