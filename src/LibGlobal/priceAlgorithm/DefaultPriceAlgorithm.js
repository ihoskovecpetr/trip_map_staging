const BasePriceAlgorithm = require('./BasePriceAlgorithm')
const { isDiscountCodeValid } = require('LibGlobal/isDiscountCodeValid')
const { getDiscountKoef } = require('LibGlobal/getDiscountKoef')

class DefaultPriceAlgorithm extends BasePriceAlgorithm {
    constructor({ roundingPrecision, taxPercentage, profitPercentage }) {
        super({ roundingPrecision, taxPercentage })
        this.taxPercentage = taxPercentage
        this.profitPercentage = profitPercentage
    }

    getPriceOfDelivery(variantId, dataPrintful) {
        return { netPrice: 0 }
    }

    getDiscountedPrice(priceOriginal, discountCode) {
        const isCodeAccepted = isDiscountCodeValid(discountCode)
        const discountKoef = getDiscountKoef(discountCode)

        const discountedPrice = this.times(priceOriginal, isCodeAccepted ? discountKoef : 1)

        return { netPrice: this.round(discountedPrice, 0) }
    }
}

module.exports = DefaultPriceAlgorithm
