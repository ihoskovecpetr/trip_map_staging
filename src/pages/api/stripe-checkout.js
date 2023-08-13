const mongoose = require('mongoose')

const Order = require('../../mongoModels/order.js')
const { getIsProduction } = require('LibGlobal/utils.js')

const { getPriceAlgorithm } = require('LibGlobal/priceAlgorithm/getPriceAlgorithm.js')

const { fetchAndTransformDataPrintful } = require('pages/api/library/fetchAndTransformDataPrintfulX.js')

const { REDUX_COOKIE_NAME } = require('../../constants/constants.js')

const IS_PRODUCTION = getIsProduction()

const API_KEY = IS_PRODUCTION ? process.env.STRIPE_API_KEY : process.env.STRIPE_API_KEY_TEST

const stripe = require('stripe')(API_KEY)

const test_shipping_code_czk = ['shr_1JMc7WCVDm94CHWQTFxCa4yY']

const priceAlgorithm = getPriceAlgorithm()

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            try {
                const {
                    product: clientProduct,
                    imageObj,
                    checkoutShownPrices,
                    discountCode,
                    mapTitles,
                    storeId,
                    currency,
                    locale,
                    defaultLocale
                } = req.body

                const responsePrintful = await fetchAndTransformDataPrintful([clientProduct.variantId], currency)

                const netPriceWithDelivery =
                    responsePrintful?.[clientProduct.variantId]?.priceWithDeliveryAndProfit.netPrice

                const priceDiscounted = priceAlgorithm.getDiscountedPrice(netPriceWithDelivery, discountCode)

                if (priceDiscounted?.netPrice !== checkoutShownPrices.netPriceWithDelivery) {
                    console.log(
                        '❌ Prices coming from browser are wrong',
                        priceDiscounted?.netPrice,
                        checkoutShownPrices.netPriceWithDelivery
                    )
                    res.status(406)
                    return res.json({ error: '❌ Prices coming from browser are wrong' })
                } else {
                    console.log('💰✅ Prices coming from browser are correct')
                }

                const product = await stripe.products.create({
                    name: 'Custom maps',
                    images: [imageObj.url]
                })

                const price = await stripe.prices.create({
                    unit_amount: priceDiscounted.netPrice * 100,
                    currency: currency,
                    product: product.id
                })

                // const SHIPPING_RATE_CODE = IS_PRODUCTION
                //   ? [clientProduct.shippingCode]
                //   : test_shipping_code_czk;

                const BASE_DOMAIN = IS_PRODUCTION ? 'http://www.tripmap.org' : 'http://localhost:3000'

                const cookieStoreId = req.cookies[REDUX_COOKIE_NAME]

                const session = await stripe.checkout.sessions.create({
                    cancel_url: BASE_DOMAIN + `/studio?id=${cookieStoreId}`,
                    success_url: BASE_DOMAIN + '/api/checkout-success?id={CHECKOUT_SESSION_ID}',

                    locale: locale,
                    metadata: {},
                    mode: 'payment',
                    payment_method_options: {},
                    payment_method_types: ['card'],
                    // shipping_rates: SHIPPING_RATE_CODE,
                    shipping_address_collection: {
                        allowed_countries: ['CZ', 'SK', 'DE', 'US', 'AU'] //"PL",
                    },

                    line_items: [
                        {
                            price: price.id,
                            quantity: 1
                        }
                    ]
                })

                const newOrder = new Order({
                    sessionId: session.id,
                    clientProductObj: clientProduct,
                    imageObj: imageObj,
                    mapTitles,
                    storeId: storeId
                })

                await newOrder.save()

                return res.json({ id: session.id })
            } catch (error) {
                console.error('Stripe Error:', error)
                res.status(402)
                res.json({ error })
            }

            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}
