import { VARIANTS_PRINTFUL } from "../constants/constants";

export const getVersionDescription = (versionId) => {
  const singleVariant = VARIANTS_PRINTFUL.find(
    (variant) => variant.id === versionId
  );

  return singleVariant?.frameName;
};
