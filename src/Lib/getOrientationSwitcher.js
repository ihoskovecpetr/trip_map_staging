import { SIZES } from "../constants/constants";

export const orientationSwitcher = (product, setProduct) => {
  const nextSize = product.sizeObject.acceptableSizes.find(
    (size) => size != product.sizeObject.code
  );

  setProduct((prev) => ({
    ...prev,
    sizeObject: SIZES.find((size) => size.code === nextSize),
  }));
};
