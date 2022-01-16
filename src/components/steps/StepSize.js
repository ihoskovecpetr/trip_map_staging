/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";
import { useDispatch } from "react-redux";

import { color, fontSize, fontWeight } from "utils";
import CustomLoader from "../CustomLoader";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { useIsMobile } from "Hooks/useIsMobile";
import { useIsSizeWebGLSizeCapable } from "Hooks/useIsSizeWebGLCapable";
import disabledAndroid from "assets/icons/devicesAndroidOblique.png";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import { setProductAction } from "redux/order/actions";
import { useProductSelector } from "redux/order/reducer";
import HeadingText from "./atoms/HeadingText";
import StepContainer from "./atoms/StepContainer";
import { TAB_STEPS } from "@constants";

import {
  VARIANTS_PRINTFUL,
  SIZES,
  SIZE_NAMES,
  FRAME_OPTION_NAMES,
} from "constants/constants";

export default function Step5Size({ index }) {
  const { isMobile } = useIsMobile();
  const { isLargeSizeCapable, isMidSizeCapable } = useIsSizeWebGLSizeCapable();
  const dispatch = useDispatch();
  const productRedux = useProductSelector();

  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );

  //TODO single size can have multiple vriants..could switch to different variant
  const findVariant = (newSize) => {
    const currentFrameName = VARIANTS_PRINTFUL.find(
      (variant) => variant.id === productRedux.variantId
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
        size.orientation === productRedux.sizeObject.orientation
    );

  const setNewSize = (sizeCode) => {
    const newVariant = findVariant(sizeCode);

    const newSizeObject = findNewSizeSameOrientation(sizeCode);

    const priceWithDelivery =
      dataPrintful?.[productRedux.variantId]?.priceWithDeliveryAndProfit
        .netPrice ?? 0;

    dispatch(
      setProductAction({
        sizeObject: newSizeObject,
        variantId: newVariant.id,
        // price: dataPrintful[newVariant.id]?.price,
        priceWithDelivery: priceWithDelivery,
        shippingCode: newVariant.shipping.codeCZ,
      })
    );
  };

  const sizesArray = VARIANTS_PRINTFUL.map((variant) => variant.sizeName);
  const arrSingleSizeNames = Array.from(new Set(sizesArray));

  const variantsPrintfulForSize = VARIANTS_PRINTFUL.filter((variant) => {
    const isVariantForOffer =
      productRedux.sizeObject.acceptableSizes.includes(variant.sizeName) &&
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

  const getSizeIcon = (sizeName, active) => {
    console.log({ active });
    switch (sizeName) {
      case SIZE_NAMES["30X40cm"]:
        return <SizeIconSmall active={active} />;
      case SIZE_NAMES["50X70cm"]:
        return <SizeIconMedium active={active} />;
      case SIZE_NAMES["61X91cm"]:
        return <SizeIconLarge active={active} />;
    }
  };

  return (
    <StepContainer isMobile={isMobile}>
      {/* {!isMobile && ( */}
      <HeadingText isMobile={isMobile}>
        {index}. {TAB_STEPS[index].full}
      </HeadingText>
      {/* )} */}

      {variantsPrintfulForSize.length === 0 && (
        <div sx={styles.loaderWrap}>
          <CustomLoader />
        </div>
      )}

      <ContainerSizes>
        {variantsPrintfulForSize.length > 0 &&
          dataPrintful &&
          arrSingleSizeNames.map((sizeNameLocal, index) => {
            const sizeObject = SIZES.find(
              (size) => size.code === sizeNameLocal
            );

            const noFrameVariant = getNoFrameVariantForSize(sizeNameLocal);

            const printFulVariantObj = dataPrintful?.[noFrameVariant.id];
            const priceWithDeliveryNoFrame =
              printFulVariantObj?.priceWithDeliveryAndProfit.netPrice ?? 0;

            const isDisabledBtn =
              (sizeNameLocal === SIZE_NAMES["61X91cm"] &&
                (isMobile || !isLargeSizeCapable)) ||
              (sizeNameLocal === SIZE_NAMES["50X70cm"] && !isMidSizeCapable); // change it to !isLa..
            // const isDisabledBtn = sizeNameLocal === SIZE_NAMES["61X91cm"];

            if (isDisabledBtn) {
              return;
            }
            return (
              <MainItem key={index}>
                <StyledItem
                  active={productRedux.sizeObject.acceptableSizes.includes(
                    sizeNameLocal
                  )}
                  key={index}
                  isDisabled={isDisabledBtn}
                  onClick={() => !isDisabledBtn && setNewSize(sizeNameLocal)}
                >
                  <SizeIconWrap>
                    {getSizeIcon(
                      sizeObject?.code,
                      productRedux.sizeObject.acceptableSizes.includes(
                        sizeNameLocal
                      )
                    )}
                  </SizeIconWrap>
                  <SizeName
                    active={productRedux.sizeObject.acceptableSizes.includes(
                      sizeNameLocal
                    )}
                  >
                    {sizeObject?.name}
                  </SizeName>
                </StyledItem>
                <StyledPriceP
                  active={productRedux.sizeObject.acceptableSizes.includes(
                    sizeNameLocal
                  )}
                >
                  {`(${getFormattedPrice(priceWithDeliveryNoFrame)})`}
                </StyledPriceP>
                <DevicesItem>
                  {isDisabledBtn && <StyledDevicesImg src={disabledAndroid} />}
                </DevicesItem>
              </MainItem>
            );
          })}
      </ContainerSizes>
    </StepContainer>
  );
}

const styles = {
  loaderWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    height: "60px",
    justifyContent: "center",
    alignItems: "center",
  },
};

const SizeName = styled.p`
  margin: 0;
  padding-top: 5px;
  display: block;
  text-align: center;
  color: ${({ active }) => (active ? "black" : "grey")};
  font-weight: ${({ active }) => active && fontWeight("bold")};
`;

const ContainerSizes = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: ${fontSize("sm")};
  padding: 0px;
`;

const MainItem = styled.div`
  flex-basis: 30%;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  background-color: ${({ isDisabled }) => isDisabled && "lightGrey"};
  color: rgba(0, 0, 0, 0.1);
  // border-radius: 4px;
  // box-shadow: 0px 0px 0px 1px;
  // color: ${({ active }) => active && color("cta_color")};
  cursor: ${({ isDisabled }) => !isDisabled && "pointer"};

  & > p {
    padding: 0;
    color: ${({ isDisabled }) => (isDisabled ? "rgba(0, 0, 0, 0.1)" : "black")};
  }
`;
const StyledPriceP = styled.p`
  color: ${({ active }) => (active ? "black" : "grey")};
  font-weight: ${({ active }) => active && fontWeight("bold")};
  text-align: center;
  margin: 5px 0px;
`;

const DevicesItem = styled.div`
  flex-basis: 30%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
  border: ${({ active }) => (active ? "5px" : "2px")} solid rgba(0, 0, 0, 0.4);
  border-color: ${({ active }) => active && color("cta_color")};
`;

const SizeIconMedium = styled.div`
  width: 70px;
  height: 50px;
  border: ${({ active }) => (active ? "5px" : "2px")} solid rgba(0, 0, 0, 0.4);
  border-color: ${({ active }) => active && color("cta_color")};
`;

const SizeIconLarge = styled.div`
  width: 91px;
  height: 61px;
  border: ${({ active }) => (active ? "5px" : "2px")} solid rgba(0, 0, 0, 0.4);
  border-color: ${({ active }) => active && color("cta_color")};
`;
