const axios = require('axios')

let isConnectionValidated = false

const validatePrintfulConnection = () => async (req, res, next) => {
    try {
        if (isConnectionValidated) {
            return next()
        }

        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_KEY_PRINTFUL}`
            }
        }

        // TODO: create axios instance to share for printful requests
        const testAuthorizationData = await axios.get(`https://api.printful.com/stores`, axiosConfig)

        if (testAuthorizationData.status === 200) {
            console.log('✅ Printful connection validated')
            isConnectionValidated = true
            return next()
        }
    } catch (e) {
        console.log('There is problem with PRINTFUL authorization, check ACCESS_KEY_PRINTFUL', {
            message: e.message
        })
    }
}

module.exports = {
    validatePrintfulConnection
}
