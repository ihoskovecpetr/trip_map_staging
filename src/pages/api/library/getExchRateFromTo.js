const axios = require('axios')

const getExchangeRateFromTo = async ({ from, to }) => {
    if (from === to) {
        return 1
    }

    if (!['EUR', 'USD', 'CZK', 'AUD'].includes(from)) {
        throw 'Unsupported currency in getExchangeRateFromTo'
    }

    if (!['EUR', 'USD', 'CZK', 'AUD'].includes(to)) {
        throw 'Unsupported currency in getExchangeRateFromTo'
    }

    const exchangeRate = await axios.get(`https://api.frankfurter.app/latest?amount=1&from=${from}&to=${to}`)

    return exchangeRate.data.rates[to]
}

module.exports = {
    getExchangeRateFromTo
}
