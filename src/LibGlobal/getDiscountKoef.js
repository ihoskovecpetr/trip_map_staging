import { VALID_DISCOUNT_CODES } from "../constants/constants";

export const getDiscountKoef = (checkedCode) => {
  const foundCode = VALID_DISCOUNT_CODES.find(
    ({ code }) => code === checkedCode
  );
  return foundCode ? foundCode.discountKoef : false;
};
