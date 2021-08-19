const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const getSmtpTransport = () => {
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID_TM, // ClientID
    process.env.EMAIL_CLIENT_SECRET_TM, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token:
      "1//048DFwZVJ27fCCgYIARAAGAQSNwF-L9IrrCQgemx9ABp-iFU9hS4aySZXDDr7pkaQBJLRmMhS63SiJBeqtl_P42jtTkliQ1gU3ug", // process.env.EMAIL_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "tripmapshop@gmail.com",
      clientId: process.env.EMAIL_CLIENT_ID_TM,
      clientSecret: process.env.EMAIL_CLIENT_SECRET_TM,
      refreshToken:
        "1//048DFwZVJ27fCCgYIARAAGAQSNwF-L9IrrCQgemx9ABp-iFU9hS4aySZXDDr7pkaQBJLRmMhS63SiJBeqtl_P42jtTkliQ1gU3ug", // process.env.EMAIL_REFRESH_TOKEN,
      accessToken: accessToken, // accessToken,
    },
  });

  return smtpTransport;
};

exports.getSmtpTransport = getSmtpTransport;
