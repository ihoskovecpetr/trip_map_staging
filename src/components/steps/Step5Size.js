/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";

import { color } from "utils";
import CustomLoader from "../CustomLoader";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { useIsMobile } from "Hooks/useIsMobile";
import { useWebGLSize } from "Hooks/useWebGLSize";
import disabledAndroid from "assets/icons/devicesAndroidOblique.png";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";

import {
  VARIANTS_PRINTFUL,
  SIZES,
  SIZE_NAMES,
  FRAME_OPTION_NAMES,
} from "constants/constants";

const priceAlgorithm = getPriceAlgorithm();

export default function Step5Size({ product, setProduct }) {
  const { isMobile } = useIsMobile();
  const { isLargeSizeCapable } = useWebGLSize();

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

  const getNoFrameVariantForSize = (sizeName) => {
    return VARIANTS_PRINTFUL.find((variantObj) => {
      if (
        variantObj.frameName === FRAME_OPTION_NAMES.NO_FRAME &&
        variantObj.sizeName === sizeName
      ) {
        return true;
      }

      return false;
    });
  };

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

            const noFrameVariant = getNoFrameVariantForSize(sizeNameLocal);

            const isDisabledBtn =
              sizeNameLocal === SIZE_NAMES["61X91cm"] && !isLargeSizeCapable; // change it to !isLa..

            return (
              <MainItem>
                <StyledItem
                  active={product.sizeObject.acceptableSizes.includes(
                    sizeNameLocal
                  )}
                  isDisabled={isDisabledBtn}
                  onClick={() => !isDisabledBtn && setNewSize(sizeNameLocal)}
                >
                  <p sx={styles.itemDimensions}>
                    {sizeObject?.name}
                    <span sx={styles.itemUnit}> [ {sizeObject?.unit} ]</span>
                  </p>
                  {/* <p sx={styles.itemUnit}>[ {sizeObject?.unit} ]</p> */}
                  <p>
                    {`+
                    ${getFormattedPrice(
                      priceAlgorithm.getPriceWithoutDelivery(
                        noFrameVariant.id,
                        dataPrintful
                      ).netPrice
                    )}`}
                  </p>
                </StyledItem>
                <DevicesItem>
                  {!isDisabledBtn ? (
                    <StyledDoneIcon />
                  ) : (
                    <StyledDevicesImg src={disabledAndroid} />
                  )}
                </DevicesItem>
              </MainItem>
            );
          })}
      </ContainerSizes>

      {/* {!isMobile && <HeadingText>Dostupnost velikostí</HeadingText>}

      <ContainerSizes>
        {variantsPrintfulForSize.length > 0 &&
          dataPrintful &&
          arrSingleSizeNames.map((sizeNameLocal) => {
            const sizeObject = SIZES.find(
              (size) => size.code === sizeNameLocal
            );
            const isDisabledBtn =
              sizeNameLocal === SIZE_NAMES["61X91cm"] && isLargeSizeCapable; // change it to !isLa..

            return (
              <DevicesItem>
                {!isDisabledBtn ? (
                  <StyledDoneIcon />
                ) : (
                  <StyledDevicesImg src={disabledAndroid} />
                )}
              </DevicesItem>
            );
          })}
      </ContainerSizes> */}
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

const MainItem = styled.div`
  flex-basis: 30%;
`;

const StyledItem = styled.div`
  display: block;
  width: 100%;

  background-color: ${({ isDisabled }) => isDisabled && "rgba(0, 0, 0, 0.1)"};
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px 3px;
  color: ${({ active }) => active && color("cta_color")};
  cursor: pointer;

  & > p {
    padding: 0;
    color: ${({ isDisabled }) => (isDisabled ? "rgba(0, 0, 0, 0.1)" : "black")};
  }
`;

const DevicesItem = styled.div`
  flex-basis: 30%;
  width: 100%;
  margin-top: 5px;
  display: flex;
  justify-content: center;
`;

const StyledDoneIcon = styled(DoneIcon)`
  color: #01c301;
`;

const StyledDevicesImg = styled.img`
  width: 80%;
`;
