const mongoose = require("mongoose");

const connectDB = (handler) => async (req, res, next) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return next();
  }

  const connect = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  };

  mongoose.connection.on("error", (e) => {
    console.log("[MongoDB] Something went super wrong! Reconnecting", e);
    setTimeout(() => {
      connect();
    }, 10000);
  });

  try {
    console.log("Going_to_connect_MONGO: ", {
      MongoX: process.env.MONGO_user,
      c: process.env.MONGO_password,
      d: process.env.MONGO_DB_NAME,
    });
    connect();

    console.log("✅ Created connection to DB");
    return next();
    // return data;
  } catch (err) {
    console.error("❌ could not connect to DB ", { err });
    throw err;
  }
};
module.exports = {
  connectDB,
};
