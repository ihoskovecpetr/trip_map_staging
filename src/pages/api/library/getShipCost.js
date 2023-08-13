const axios = require('axios')
const Big = require('big.js')

const { getExchangeRateFromTo } = require('./getExchRateFromTo')

const { VARIANTS_PRINTFUL } = require('../../../constants/constants')

const fetchPrintFullShippingPrice = async (body, axiosConfig) => {
    try {
        return await axios.post(`https://api.printful.com/shipping/rates`, body, axiosConfig)
    } catch (e) {
        console.error('printful.com/shipping/rates error: ', {
            message: e.message,
            body,
            keys: Object.keys(e),
            toJsou: e.toJSON(),
            response: e.response.data
        })
    }
}

export const getShippingCost = async (variantId, currency) => {
    // how to get store_id: https://www.reddit.com/r/printful/comments/u0oscd/two_question_about_the_printful_api/
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_KEY_PRINTFUL}`,
            'X-PF-Store-Id': '6139802'
        }
    }

    const body = {
        recipient: {
            address1: 'Krasné', // TODO: dumy address, change in case of sending out of CZ
            city: 'Tři Sekery',
            country_code: 'CZ',
            zip: 35301
        },
        store: 'TravelMap',
        items: [
            {
                quantity: 1,
                variant_id: variantId,
                store_id: 'dsf'
            }
        ]
    }

    //TODO: cache this call to redis
    const response = await fetchPrintFullShippingPrice(body, axiosConfig)

    const exchangeRateCurrencyFromEUR = await getExchangeRateFromTo({
        from: 'EUR',
        to: currency
    })

    const costPriceEUR = new Big(response.data.result[0].rate)
    const deliveryCostCurrency = costPriceEUR.times(exchangeRateCurrencyFromEUR).round(0).toString()

    const constantVariant = VARIANTS_PRINTFUL.find(variant => variant.id == variantId)

    const constantVariantPrice = constantVariant?.shipping[currency].price

    if (Number(constantVariantPrice) > Number(deliveryCostCurrency)) {
        console.log('✅ it is OK, shipping cost Printfull is in limit')
    } else {
        console.log(
            '❌ Btw. PROBLEM, shipping cost Printfull is too high',
            constantVariantPrice,
            deliveryCostCurrency,
            variantId,
            { raw: response.data.result[0] }
        )
    }

    return {
        ...response.data.result[0],
        rate: constantVariantPrice,
        currency: currency,
        variantId: variantId,
        cost: deliveryCostCurrency
    }
}
