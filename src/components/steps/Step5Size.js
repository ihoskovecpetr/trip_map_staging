/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";

import { color, fontSize, fontWeight } from "utils";
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

  const getSizeIcon = (sizeName) => {
    switch (sizeName) {
      case SIZE_NAMES["30X40cm"]:
        return <SizeIconSmall />;
      case SIZE_NAMES["50X70cm"]:
        return <SizeIconMedium />;
      case SIZE_NAMES["61X91cm"]:
        return <SizeIconLarge />;
    }
  };

  return (
    <div sx={styles.container}>
      {!isMobile && (
        <HeadingText>
          6. Rozměry <UnitMark>[cm]</UnitMark>
        </HeadingText>
      )}

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
                  <SizeIconWrap>{getSizeIcon(sizeObject?.code)}</SizeIconWrap>
                  <p sx={styles.itemDimensions}>{sizeObject?.name}</p>
                </StyledItem>
                <StyledPriceP
                  active={product.sizeObject.acceptableSizes.includes(
                    sizeNameLocal
                  )}
                >
                  {`+
                    ${getFormattedPrice(
                      priceAlgorithm.getPriceWithoutDelivery(
                        noFrameVariant.id,
                        dataPrintful
                      ).netPrice
                    )}`}
                </StyledPriceP>
                <DevicesItem>
                  {isDisabledBtn && <StyledDevicesImg src={disabledAndroid} />}
                </DevicesItem>
              </MainItem>
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

  itemDimensions: {
    margin: 0,
    paddingTop: "5px",
    display: "block",
    textAlign: "center",
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

const UnitMark = styled.span`
  text-transform: uppercase;
  font-size: ${fontSize("xs")};
`;

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
  font-size: ${fontSize("sm")};
`;

const MainItem = styled.div`
  flex-basis: 30%;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: ${({ isDisabled }) => isDisabled && "rgba(0, 0, 0, 0.1)"};
  color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0px 0px 0px 1px;
  color: ${({ active }) => active && color("cta_color")};
  cursor: ${({ isDisabled }) => !isDisabled && "pointer"};

  & > p {
    padding: 0;
    color: ${({ isDisabled }) => (isDisabled ? "rgba(0, 0, 0, 0.1)" : "black")};
  }
`;
const StyledPriceP = styled.p`
  color: ${({ active }) => (active ? color("cta_color") : "grey")};
  font-weight: ${({ active }) => active && fontWeight("bold")};
  text-align: right;
  margin: 5px 0px;
`;

const DevicesItem = styled.div`
  flex-basis: 30%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledDoneIcon = styled(DoneIcon)`
  color: #01c301;
`;

const StyledDevicesImg = styled.img`
  width: 80%;
`;

const SizeIconWrap = styled.div`
  display: flex;
  flex-basis: 70px;
  justify-content: center;
  align-items: center;

  & > div {
    transform: scale(0.8);
  }
`;

const SizeIconSmall = styled.div`
  width: 40px;
  height: 30px;
  border: 2px solid rgba(0, 0, 0, 0.2);
`;

const SizeIconMedium = styled.div`
  width: 70px;
  height: 50px;
  border: 2px solid rgba(0, 0, 0, 0.2);
`;

const SizeIconLarge = styled.div`
  width: 91px;
  height: 61px;
  border: 2px solid rgba(0, 0, 0, 0.2);
`;
