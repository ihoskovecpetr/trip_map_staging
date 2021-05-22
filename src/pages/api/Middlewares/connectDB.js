const mongoose = require("mongoose");

const connectDB = (handler) => async (req, res, next) => {
  console.log("connectDB_MiddlewareXX", {
    conects: mongoose.connections[0].readyState,
  });
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return next();
  }
  // // Use new db connection
  // await mongoose.connect(process.env.mongodburl, {
  //   useUnifiedTopology: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
  //   useNewUrlParser: true,
  // });
  // return handler(req, res);

  const connect = async () => {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_user}:${process.env.MONGO_password}@cluster0.krtpb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
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
