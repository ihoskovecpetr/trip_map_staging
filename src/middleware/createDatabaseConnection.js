const mongoose = require('mongoose')

const connect = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

const createDatabaseConnection = () => async (req, res, next) => {
    if (mongoose.connections[0].readyState) {
        return next()
    }

    mongoose.connection.on('error', e => {
        console.log('[MongoDB] Something went super wrong! Reconnecting', { e: e.message })
        setTimeout(() => {
            connect()
        }, 10000)
    })

    mongoose.connection.once('open', function () {
        console.log('✅ Connected successfully, callback')
    })

    try {
        await connect()

        console.log('✅ Created new connection to MongoDB')
        return next()
    } catch (err) {
        console.error('❌ could not connect to DB ', { err })
    }
}
module.exports = {
    connectDB: createDatabaseConnection
}
