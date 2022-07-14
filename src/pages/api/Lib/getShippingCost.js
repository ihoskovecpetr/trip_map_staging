import { Euro } from '@material-ui/icons'

const axios = require('axios')
const Big = require('big.js')

const { getExchangeRateFromTo } = require('./getExchangeRateFromTo')

const { VARIANTS_PRINTFUL } = require('../../../constants/constants')

const fetchPrintFullShippingPrice = async (body, axiosConfig) => {
    try {
        return await axios.post(`https://api.printful.com/shipping/rates`, body, axiosConfig)
    } catch (e) {
        console.error({ ShippingCostPrintfullError: e })
        throw e
    }
}

export const getShippingCost = async (variantId, currency) => {
    const axiosConfig = {
        headers: {
            'Authorization': `Basic ${process.env.AUTH_KEY_PRINTFUL}`,
            'Access-Control-Allow-Origin': '*'
        }
    }

    const body = {
        recipient: {
            address1: 'Krasné', // TODO: dumy address, change in case of sending out of CZ
            city: 'Tři Sekery',
            country_code: 'CZ',
            zip: 35301
        },
        items: [
            {
                quantity: 1,
                variant_id: variantId
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
