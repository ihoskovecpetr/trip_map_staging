import { SIZES } from "../constants/constants";

export const getFlippedSizeObject = (product) => {
  const nextSize = product.sizeObject.acceptableSizes.find(
    (size) => size != product.sizeObject.code
  );

  console.log({
    nextSize,
    retrn: SIZES.find((size) => size.code === nextSize),
    SIZES,
  });

  const result = SIZES.find((size) => size.code === nextSize);

  return SIZES.find((size) => size.code === nextSize);
};
