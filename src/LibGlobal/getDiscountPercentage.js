import { VALID_DISCOUNT_CODES } from "../constants/constants";
import { getBasePriceAlgorithm } from "./priceAlgorithm/getPriceAlgorithm";

export const getDiscountPercentage = (checkedCode) => {
  const basePriceAlgorithm = getBasePriceAlgorithm();

  const foundCode = VALID_DISCOUNT_CODES.find(
    ({ code }) => code === checkedCode
  );

  if (!foundCode) {
    return false;
  }

  const discountKoef = basePriceAlgorithm.subtract([
    1,
    foundCode?.discountKoef,
  ]);

  const discountPercentage = basePriceAlgorithm.times(discountKoef, 100);

  return discountPercentage;
};
