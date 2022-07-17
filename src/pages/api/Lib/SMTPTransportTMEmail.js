const { google } = require('googleapis')
const nodemailer = require('nodemailer')

const getSmtpTransport = async () => {
    const OAuth2 = google.auth.OAuth2

    const oauth2Client = new OAuth2(
        process.env.EMAIL_CLIENT_ID_TM, // ClientID
        process.env.EMAIL_CLIENT_SECRET_TM, // Client Secret
        'https://developers.google.com/oauthplayground' // Redirect URL
    )

    oauth2Client.setCredentials({
        refresh_token: process.env.EMAIL_REFRESH_TOKEN // process.env.EMAIL_REFRESH_TOKEN,
    })

    console.log({
        client_ID: process.env.EMAIL_CLIENT_ID_TM,
        secret: process.env.EMAIL_CLIENT_SECRET_TM,
        refresh: process.env.EMAIL_REFRESH_TOKEN
    })

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.log('Getting Access token Error', { err })
                reject()
            }
            resolve(token)
        })
    })

    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'tripmapshop@gmail.com',
            clientId: process.env.EMAIL_CLIENT_ID_TM,
            clientSecret: process.env.EMAIL_CLIENT_SECRET_TM,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
            accessToken: accessToken // accessToken,
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    return smtpTransport
}

exports.getSmtpTransport = getSmtpTransport
