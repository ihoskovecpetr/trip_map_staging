const express = require("express");
const next = require("next");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;
var cookieParser = require("cookie-parser");

const { connectDB } = require("./pages/api/Middlewares/connectDB");
const initDataMiddleware = require("./pages/api/Middlewares/initDataMiddleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();

    console.log("Running_server.js");
    server.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
    server.use("api/*", connectDB());
    server.use(cookieParser());
    server.use(initDataMiddleware());

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(
        `> Ready on localhost:${port} - env: ${
          process.env.NODE_ENV ? "dev" : "prod"
        }`
      );
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
