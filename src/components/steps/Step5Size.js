/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";

import { color } from "utils";

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
      {!isMobile && <HeadingText>Rozměry</HeadingText>}

      {variantsPrintfulForSize.length === 0 && (
        <div sx={styles.loaderWrap}>
          <CustomLoader />
        </div>
      )}

      <ContainerSizes>
        {variantsPrintfulForSize.length > 0 &&
          dataPrintful &&
          arrSingleSizeNames.map((sizeNameLocal) => {
            const sizeObject = SIZES.find(
              (size) => size.code === sizeNameLocal
            );

            return (
              <StyledItem
                active={product.sizeObject.acceptableSizes.includes(
                  sizeNameLocal
                )}
                onClick={() => setNewSize(sizeNameLocal)}
              >
                <p sx={styles.itemDimensions}>{sizeObject?.name}</p>
                <p sx={styles.itemUnit}>[ {sizeObject?.unit} ]</p>
              </StyledItem>
            );
          })}
      </ContainerSizes>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    padding: "10px 10px",
  },
  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    marginTop: "20px",
    color: "grey",
    letterSpacing: "1.1px",
  },

  itemDimensions: {
    margin: 0,
    paddingTop: "5px",
    display: "block",
    textAlign: "center",
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
    height: "60px",
    justifyContent: "center",
    alignItems: "center",
  },
};

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const ContainerSizes = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledItem = styled.div`
  flex-basis: 30%;
  display: block;
  width: 4rem;
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px 3px;
  color: ${({ active }) => active && color("cta_color")};
  cursor: pointer;

  & > p {
    color: black;
  }
`;
