const BasePriceAlgorithm = require("./BasePriceAlgorithm");
const { VALID_DISCOUNT_CODES } = require("constants/constants");
const { checkDiscountCode } = require("LibGlobal/checkDiscountCode");
const { getDiscountKoef } = require("LibGlobal/getDiscountKoef");

const DISCOUNT_KOEF = 0.9;
class DefaultPriceAlgorithm extends BasePriceAlgorithm {
  constructor({ roundingPrecision, taxPercentage, profitPercentage }) {
    super({ roundingPrecision, taxPercentage });
    this.taxPercentage = taxPercentage;
    this.profitPercentage = profitPercentage;
  }

  getPriceWithoutDelivery(variantId, dataPrintful) {
    const variantPrice = dataPrintful && dataPrintful[variantId]?.price;

    return this.getPrice(
      variantPrice ? variantPrice : 0,
      this.taxPercentage,
      this.profitPercentage
    );
  }

  getPriceWithoutDeliveryDiscounted(variantId, dataPrintful, discountCode) {
    const printfulVariantPrice = dataPrintful && dataPrintful[variantId]?.price;

    const isCodeAccepted = checkDiscountCode(discountCode);
    const discountKoef = getDiscountKoef(discountCode);
    const constPrice = printfulVariantPrice ? printfulVariantPrice : 0;

    const priceAfterDiscount = this.times(
      constPrice,
      isCodeAccepted ? discountKoef : 1
    );

    return this.getPrice(
      priceAfterDiscount,
      this.taxPercentage,
      this.profitPercentage
    );
  }

  getPriceOfDelivery(variantId, dataPrintful) {
    const shippingPrice =
      dataPrintful && dataPrintful[variantId]?.shipping.rate;

    return { netPrice: Number(shippingPrice) };
  }

  getPriceWithDelivery(variantId, dataPrintful) {
    const variantPrice = dataPrintful && dataPrintful[variantId]?.price;
    const shippingPrice =
      dataPrintful && dataPrintful[variantId]?.shipping.rate; // this is price with tax and profit

    const variantPriceObject = this.getPrice(
      variantPrice ? variantPrice : 0,
      this.taxPercentage,
      this.profitPercentage
    );

    const sumNetPricesWithDelivery = this.add([
      variantPriceObject.netPrice,
      shippingPrice ?? 0,
    ]);

    return { netPrice: sumNetPricesWithDelivery };
  }

  getPriceWithDeliveryDiscounted(variantId, dataPrintful, product) {
    const variantPrice = dataPrintful && dataPrintful[variantId]?.price;
    const shippingPrice =
      dataPrintful && dataPrintful[variantId]?.shipping.rate; // this is price with tax and profit

    const priceAfterDiscount = this.times(
      variantPrice ? variantPrice : 0,
      DISCOUNT_KOEF
    );

    const variantPriceObject = this.getPrice(
      priceAfterDiscount,
      this.taxPercentage,
      this.profitPercentage
    );

    const sumNetPricesWithDelivery = this.add([
      variantPriceObject.netPrice,
      shippingPrice ?? 0,
    ]);

    return { netPrice: sumNetPricesWithDelivery };
  }

  // getDefaultPrice(deal, appConfig) {
  //       const { configuration } = appConfig;

  //       return this.getPrice(
  //             this.subtract([
  //                   appConfig.car.netPrice,
  //                   configuration.promoAmount,
  //             ]),
  //             configuration.app.solJourney.taxPercentage
  //       );
  // }

  // getVehiclePrice(deal, appConfig) {
  //       return this.addPrices(
  //             [defaultPrice].concat(
  //                   optionPrices,
  //                   servicePrices,
  //                   accessoryPrices
  //             )
  //       );
  // }

  // getTotalPrice(deal, appConfig, options = {}) {
  //       const { isDeliveryIncluded, isRegistrationIncluded } = options;
  //       const { configuration } = appConfig;

  //       const vehiclePrice = this.getVehiclePrice(deal, appConfig);

  //       let targetPrice = vehiclePrice;

  //       if (isDeliveryIncluded && deal.userProfile.deliveryData.id) {
  //             const deliveryPrice = this.getPrice(
  //                   deal.userProfile.deliveryData.netPrice,
  //                   configuration.app.solJourney.taxPercentage
  //             );

  //             targetPrice = this.addPrices([targetPrice, deliveryPrice]);
  //       }

  //       const registrationSettings = getSelectedRegistrationConfiguration(
  //             deal.financeSimulation &&
  //                   deal.financeSimulation.vehicleRegistration,
  //             deal.financeSimulation.journey ||
  //                   deal.financeSimulation.journeyType,
  //             deal.businessModel,
  //             configuration
  //       );

  //       if (
  //             registrationSettings &&
  //             registrationSettings.enabled &&
  //             registrationSettings.includeInPrice &&
  //             registrationSettings.discountAmount &&
  //             isRegistrationIncluded &&
  //             deal.financeSimulation &&
  //             getIsVehicleRegistrationByCustomerSelected(
  //                   deal.financeSimulation.vehicleRegistration
  //             )
  //       ) {
  //             targetPrice = this.subtractPrices([
  //                   targetPrice,
  //                   this.getPrice(
  //                         registrationSettings.discountAmount,
  //                         configuration.app.solJourney.taxPercentage
  //                   ),
  //             ]);
  //       }

  //       return targetPrice;
  // }

  // getPackPrice(deal, appConfig) {
  //       return this.addPrices(
  //             deal.carConfiguration.options.map((option) =>
  //                   this.getPrice(
  //                         option.netPrice,
  //                         appConfig.configuration.app.solJourney
  //                               .taxPercentage
  //                   )
  //             )
  //       );
  // }

  // getPackPriceBeforeDiscount(deal, appConfig) {
  //       return this.addPrices(
  //             deal.carConfiguration.options
  //                   .filter(
  //                         (option) =>
  //                               option.type !== CUSTOMIZE_TYPES.ACCESSORIES
  //                   )
  //                   .map((option) =>
  //                         this.getPrice(
  //                               option.netPrice,
  //                               appConfig.configuration.app.solJourney
  //                                     .taxPercentage
  //                         )
  //                   )
  //       );
  // }

  // getVehiclePriceBeforeDiscount(deal, appConfig) {
  //       const { configuration } = appConfig;

  //       const netPrice = deal.carConfiguration.netPrice;
  //       const packPrice = this.getPackPriceBeforeDiscount(deal, appConfig);

  //       return this.getPrice(
  //             this.add([netPrice, packPrice.netPrice]),
  //             configuration.app.solJourney.taxPercentage
  //       );
  // }
}

module.exports = DefaultPriceAlgorithm;
