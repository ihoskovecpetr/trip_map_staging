const { v4 } = require('uuid')

const fullStoreModel = require('../mongoModels/fullStore.js')
const { REDUX_COOKIE_NAME } = require('../constants/constants.js')

const initDataMiddleware = () => async (req, res, next) => {
    if (req.url.includes('/_next/') || req.url.includes('/api/') || req.url.includes('/favicon.ico')) {
        return next()
    }

    // Let pass only on first request before rendering first page (i guess)

    const cookieStoreId = req.cookies[REDUX_COOKIE_NAME]

    if (req && req.query && req.query.id) {
        const foundStoreFromQuery = await fullStoreModel.findOne({
            storeId: req.query.id
        })

        if (foundStoreFromQuery) {
            const foundStoreWithout_secrets = { ...foundStoreFromQuery._doc } // this

            delete foundStoreWithout_secrets._id
            delete foundStoreWithout_secrets.createdAt
            delete foundStoreWithout_secrets.updatedAt

            if (req && req.query.id === cookieStoreId) {
                console.log('Cookie_same_as_ID')
                req.meta = {
                    ...foundStoreWithout_secrets
                }
            }

            if (req && req.query.id != cookieStoreId) {
                const newStoreId0 = v4()

                const newStore = new fullStoreModel({
                    storeId: newStoreId0
                })

                await newStore.save()

                // creating copy of shared store
                req.meta = {
                    ...foundStoreWithout_secrets,
                    storeId: newStoreId0
                }
            }
        }

        if (!foundStoreFromQuery && req && req.query.id != cookieStoreId) {
            const newStoreId = v4()
            const newStore = new fullStoreModel(
                {
                    storeId: newStoreId
                },
                { strict: false }
            )

            await newStore.save()

            req.meta = {
                storeId: newStoreId
            }
        }
    } else {
        const foundStoreCookie = await fullStoreModel.findOne({
            storeId: cookieStoreId
        })

        if (foundStoreCookie) {
            const foundStoreCookieDoc = { ...foundStoreCookie._doc }
            delete foundStoreCookieDoc._id
            delete foundStoreCookieDoc.createdAt
            delete foundStoreCookieDoc.updatedAt

            req.meta = foundStoreCookieDoc
        } else {
            const newStoreId2 = v4()
            const newStore = new fullStoreModel(
                {
                    storeId: newStoreId2
                },
                { strict: false }
            )

            await newStore.save()

            req.meta = {
                storeId: newStoreId2
            }
        }
    }

    return next()
}

module.exports = initDataMiddleware
