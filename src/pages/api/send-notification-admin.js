const hbs = require('nodemailer-express-handlebars')

const { getIsProduction } = require('../../LibGlobal/getIsProduction')
const smtpTransportTMEmail = require('./Lib/SMTPTransportTMEmail.js')

const IS_PRODUCTION = getIsProduction()

const emailHeadingAdminNotice = IS_PRODUCTION ? 'PRODUCTION_' : 'TESTING_'

const sendErrorEmail = async ({ message }) => {
    try {
        const smtpTransportNotice = await smtpTransportTMEmail.getSmtpTransport()

        smtpTransportNotice.use(
            'compile',
            hbs({
                viewEngine: {
                    extName: '.handlebars',
                    partialsDir: './',
                    layoutsDir: './',
                    defaultLayout: './src/pages/api/noticeMessage.handlebars'
                },
                viewPath: ''
            })
        )

        await smtpTransportNotice.sendMail({
            from: 'Error while uploading map',
            to: process.env.EMAIL_RECIPIENT,
            subject: emailHeadingAdminNotice + message,
            template: './src/pages/api/noticeMessage',
            context: {
                // dashboard_url_printful: responsePrintful.data.result.dashboard_url
            }
        })

        smtpTransportNotice.close()

        return true
    } catch (e) {
        console.log('Error while mailing: ', { e })
        return false
    }
}

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            try {
                sendErrorEmail({
                    message: req.body.message
                })

                return res.json({ id: 'ok message sent' })
            } catch (error) {
                console.error('Error:', error)
                const message = error.message || 'random failure'
                res.status(402)
                res.json({ message, error })
            }

            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}
