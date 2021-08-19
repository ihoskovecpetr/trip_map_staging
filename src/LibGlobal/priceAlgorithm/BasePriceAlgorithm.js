const Big = require("big.js");

// const { IS_PRODUCTION } = require("../constants");

module.exports = class BasePriceAlgorithm {
  constructor({ roundingPrecision }) {
    this.roundingPrecision = roundingPrecision;
  }

  add(values) {
    const initialValue = new Big(0);

    const targetValue = values.reduce(
      (acc, cur) => acc.plus(cur),
      initialValue
    );

    return Number(targetValue);
  }

  subtract(valuesArr) {
    const [baseInitialValue, ...restValues] = valuesArr;
    const initialValue = new Big(baseInitialValue);

    const targetValue = restValues.reduce(
      (acc, cur) => acc.minus(cur),
      initialValue
    );

    return Number(targetValue);
  }

  times(base, n) {
    const initialValue = new Big(base);

    return Number(initialValue.times(n));
  }

  divide(base, n) {
    const initialValue = new Big(base);

    return Number(initialValue.div(n));
  }

  // @see https://stackoverflow.com/a/11832950
  round(value, precision = this.roundingPrecision) {
    const precisionMultiple = Math.pow(10, precision);

    return (
      Math.round((value + Number.EPSILON) * precisionMultiple) /
      precisionMultiple
    );
  }

  getPrice(bareCostPrice, taxPercentage, profitPercentage) {
    const taxMultiplayer = this.add([1, this.divide(taxPercentage, 100)]);
    const profitMultilayer = this.add([1, this.divide(profitPercentage, 100)]);

    const costBase = this.times(bareCostPrice, taxMultiplayer);
    const costNet = this.times(costBase, taxMultiplayer);
    const priceNet = this.times(costNet, profitMultilayer);

    const polishedPrice = new Big(priceNet)
      .div(10)
      .add(1)
      .round(0)
      .times(10)
      .add(9)
      .toString();

    return {
      netPrice: this.round(Number(polishedPrice)),
    };
  }

  addPrices(prices) {
    const initialPrice = {
      netPrice: 0,
      basePrice: 0,
      tax: 0,
    };

    return prices.reduce(
      (acc, cur) => ({
        netPrice: this.add([acc.netPrice, cur.netPrice]),
        basePrice: this.add([acc.basePrice, cur.basePrice]),
        tax: this.add([acc.tax, cur.tax]),
      }),
      initialPrice
    );
  }

  subtractPrices(prices) {
    const [initialPrice, ...restPrices] = prices;

    const initialValue = {
      netPrice: new Big(initialPrice.netPrice),
      basePrice: new Big(initialPrice.basePrice),
      tax: new Big(initialPrice.tax),
    };

    const targetValue = restPrices.reduce((acc, cur) => {
      return {
        netPrice: acc.netPrice.minus(cur.netPrice),
        basePrice: acc.basePrice.minus(cur.basePrice),
        tax: acc.tax.minus(cur.tax),
      };
    }, initialValue);

    return {
      netPrice: Number(targetValue.netPrice),
      basePrice: Number(targetValue.basePrice),
      tax: Number(targetValue.tax),
    };
  }

  roundPrice(price, precision = this.roundingPrecision) {
    return {
      basePrice: this.round(price.basePrice, precision),
      netPrice: this.round(price.netPrice, precision),
      tax: this.round(price.tax, precision),
    };
  }

  getDiscountAmount(netPrices, discountPercentage, taxPercentage) {
    const initialValue = 0;

    return this.round(
      netPrices.reduce((acc, cur) => {
        const originalPrice = this.getPrice(cur, taxPercentage);

        const discountAmount =
          originalPrice.basePrice * (discountPercentage / 100);

        return this.add([acc, discountAmount]);
      }, initialValue)
    );
  }
};
