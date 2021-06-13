/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";

import { VARIANTS_PRINTFUL, SIZES } from "../../constants/constants";
import CustomLoader from "../CustomLoader";

import { useGetDataPrintful } from "../../Hooks/useGetDataPrintful";
import { getPriceAlgorithm } from "../../LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { useIsMobile } from "../../Hooks/useIsMobile";

const priceAlgorithm = getPriceAlgorithm();

export default function Step5Size({ product, setProduct }) {
  const { isMobile } = useIsMobile();

  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );

  //TODO single size can have multiple vriants..could switch to different variant
  const findVariant = (newSize) => {
    const currentFrameName = VARIANTS_PRINTFUL.find(
      (variant) => variant.id === product.variantId
    )?.frameName;

    return VARIANTS_PRINTFUL.find(
      (variant) =>
        variant.sizeName === newSize && variant.frameName === currentFrameName
    );
  };

  const findNewSizeSameOrientation = (newSizeCode) =>
    SIZES.find(
      (size) =>
        size.acceptableSizes.includes(newSizeCode) &&
        size.orientation === product.sizeObject.orientation
    );

  const setNewSize = (sizeCode) => {
    const newVariant = findVariant(sizeCode);

    const newSizeObject = findNewSizeSameOrientation(sizeCode);

    setProduct((prev) => ({
      ...prev,
      sizeObject: newSizeObject,
      variantId: newVariant.id,
      price: dataPrintful[newVariant.id]?.price,
      priceWithDelivery: priceAlgorithm.getPriceWithDelivery(
        newVariant.id,
        dataPrintful
      ).netPrice,
      shippingCode: newVariant.shipping.codeCZ,
    }));
  };

  const sizesArray = VARIANTS_PRINTFUL.map((variant) => variant.sizeName);
  const arrSingleSizeNames = Array.from(new Set(sizesArray));

  const variantsPrintfulForSize = VARIANTS_PRINTFUL.filter((variant) => {
    const isVariantForOffer =
      product.sizeObject.acceptableSizes.includes(variant.sizeName) &&
      dataPrintful &&
      dataPrintful[variant.id]?.availableEU;
    return isVariantForOffer;
  });

  return (
    <div sx={styles.container}>
      {!isMobile && (
        <Text as="p" className="description" sx={styles.headingDesc}>
          Rozměry
        </Text>
      )}

      {variantsPrintfulForSize.length === 0 && (
        <div sx={styles.loaderWrap}>
          <CustomLoader />
        </div>
      )}

      <div sx={styles.sizeWrap}>
        {variantsPrintfulForSize.length > 0 &&
          dataPrintful &&
          arrSingleSizeNames.map((sizeNameLocal) => {
            const sizeObject = SIZES.find(
              (size) => size.code === sizeNameLocal
            );
            return (
              <div
                className={
                  product.sizeObject.acceptableSizes.includes(sizeNameLocal) &&
                  "active"
                }
                sx={styles.sizeItem}
                onClick={() => setNewSize(sizeNameLocal)}
              >
                <p sx={styles.itemDimensions}>{sizeObject?.name}</p>
                <p sx={styles.itemUnit}>[{sizeObject?.unit}]</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },
  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    margin: "20px 0",
    color: "grey",
    letterSpacing: "1.1px",
  },

  sizeWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  sizeItem: {
    margin: "10px",
    padding: "4px",
    // width: ["31%", "31%", "31%", "31%", "31%", "20%"],
    // margin: ["1%", "1%", "1%", "1%", "1%", "1%"],
    border: "1px solid transparent",
    cursor: "pointer",
    backgroundColor: "white",
    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
    "&.active": {
      border: "1px solid",
      borderColor: "cta_color",
      color: "black",
      transform: "scale(1.2)",
      boxShadow: "0 0 8px rgba(0,0,0,0.5)",
    },
    "&.disabled": {
      border: "0px",
      color: "lightGrey",
    },
  },
  itemDimensions: {
    margin: 0,
    paddingTop: "5px",
    display: "block",
    textAlign: "center",

    // width: "100%",
  },
  itemUnit: {
    margin: 0,
    display: "block",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "10px",
  },

  loaderWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    minHeight: "20vh",
    justifyContent: "center",
    alignItems: "center",
  },
};
