const {
  getLanguageFromAcceptLanguageHeader,
} = require("../LibGlobal/getLanguageFromAcceptLanguageHeader");

class LanguageMiddleware {
  constructor(getConfig) {
    this.getConfig = getConfig;
  }

  getMiddleware() {
    return async (req, res, next) => {
      const language = getLanguageFromAcceptLanguageHeader(
        req.headers["accept-language"],
        ["cs", "en"]
      );

      res.language = language; //'en'
      next();
    };
  }
}

module.exports = LanguageMiddleware;
