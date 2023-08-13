const express = require('express')
const next = require('next')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
var cookieParser = require('cookie-parser')
const compression = require('compression')

const { connectDB } = require('./middleware/createDatabaseConnection')
const attachInitData = require('./middleware/attachInitData')
const LanguageMiddleware = require('./serverMiddlewares/languageMiddleware')
const { validatePrintfulConnection } = require('./middleware/validatePrintfulConnection')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

;(async () => {
    try {
        await app.prepare()
        const server = express()

        const languageMiddleware = new LanguageMiddleware({})

        server.use(compression())
        server.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301))
        server.use(connectDB())
        server.use(cookieParser())
        server.use(attachInitData())
        server.use(validatePrintfulConnection())

        server.use(languageMiddleware.getMiddleware())

        server.all('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, err => {
            if (err) throw err
            console.log(`> Ready on localhost:${port} - env: ${process.env.NODE_ENV ? 'dev' : 'prod'}`)
        })
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})()
