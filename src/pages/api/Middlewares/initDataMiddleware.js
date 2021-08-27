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

  console.log("initDataMiddleware_pass_reqURl", { reqUrrl: req.url, counter });

  counter++;
  await connectToMongoose();

  const cookieStoreId = req.cookies[REDUX_COOKIE_NAME];

  if (req && req.query && req.query.id) {
    const foundStore = await FullStore.findOne({
      storeId: req?.query.id,
    });
    const foundStoreWithout_id = { ...foundStore?._doc };

    delete foundStoreWithout_id._id;
    delete foundStoreWithout_id.createdAt;
    delete foundStoreWithout_id.updatedAt;

    if (foundStore) {
      if (foundStore && req?.query.id === cookieStoreId) {
        req.meta = {
          ...foundStoreWithout_id,
        };
      }

      if (foundStore && req?.query.id != cookieStoreId) {
        const newStoreId = v4();

        req.meta = {
          ...foundStoreWithout_id,
          storeId: newStoreId,
        };
      }
    }

    if (!foundStore && req?.query.id != cookieStoreId) {
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
      const foundStoreCookieDoc = { ...foundStoreCookie?._doc };
      delete foundStoreCookieDoc._id;
      delete foundStoreCookieDoc.createdAt;
      delete foundStoreCookieDoc.updatedAt;

      req.meta = {
        ...foundStoreCookieDoc,
      };
    } else {
      const newStoreId = v4();
      const newStore = new FullStore({
        storeId: newStoreId,
      });

      await newStore.save();

      req.meta = {
        storeId: newStoreId,
      };
    }
  }

  return next();
};

module.exports = initDataMiddleware;
