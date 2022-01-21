const parser = require("accept-language-parser");

const getLanguageFromAcceptLanguageHeader = (
  acceptLanguageHeader,
  supportedLanguages
) => {
  const targetLanguage = supportedLanguages.find((language) => {
    return parser
      .parse(acceptLanguageHeader)
      .some((match) => language.startsWith(match.code));
  });

  return targetLanguage || null;
};

module.exports = { getLanguageFromAcceptLanguageHeader };
