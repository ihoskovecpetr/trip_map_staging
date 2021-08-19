/** @jsx jsx */
import { useState } from "react";
import { jsx, Text } from "theme-ui";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { color, fontWeight, fontSize } from "utils";
import CustomLoader from "../CustomLoader";

import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getVariantObject } from "LibGlobal/getVariantObject";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import { useIsMobile } from "Hooks/useIsMobile";
import { setProductAction } from "redux/order/actions";
import { useProductSelector } from "redux/order/reducer";

import {
  getPriceAlgorithm,
  getBasePriceAlgorithm,
} from "LibGlobal/priceAlgorithm/getPriceAlgorithm";

import { VARIANTS_PRINTFUL, FRAME_OPTION_NAMES } from "constants/constants";

const priceAlgorithm = getPriceAlgorithm();

export default function Step6FinishVariant() {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const productRedux = useProductSelector();

  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });

  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );
  const basePriceAlgorithm = getBasePriceAlgorithm();

  const setNewFrame = (variantId, shippingCode) => {
    const priceWithDelivery =
      dataPrintful?.[variantId]?.priceWithDeliveryAndProfit.netPrice ?? 0;

    dispatch(
      setProductAction({
        variantId: variantId,
        // price: dataPrintful[variantId]?.price,
        priceWithDelivery: priceWithDelivery,
        shippingCode,
      })
    );

    //TODO there has to be price, otherwise return?
  };

  const variantsPrintfulForSize = VARIANTS_PRINTFUL.filter((variant) => {
    const isVariantForOffer =
      productRedux.sizeObject.acceptableSizes.includes(variant.sizeName) &&
      dataPrintful &&
      dataPrintful[variant.id]?.availableEU;
    return isVariantForOffer;
  });

  const variantObjectNoFrame = variantsPrintfulForSize.find(
    (variant) => variant.frameName === FRAME_OPTION_NAMES.NO_FRAME
  );

  // const priceWithDeliveryNoFrame =
  //   dataPrintful?.[variantObjectNoFrame.id]?.priceWithDeliveryAndProfit
  //     .netPrice;

  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>7. Rámování</HeadingText>}
      {variantsPrintfulForSize.length === 0 && (
        <div sx={styles.loaderWrap}>
          <CustomLoader />
        </div>
      )}
      {variantsPrintfulForSize.length > 0 && (
        <ContainerVariants>
          {variantsPrintfulForSize.map(({ id: variantId, shipping }) => (
            <ItemWrap>
              <div sx={styles.textsWrap}>
                <VariantDesc>
                  {getVariantObject(variantId)?.frameName}
                </VariantDesc>
              </div>
              <ItemVariant
                active={productRedux.variantId === variantId}
                onClick={() => setNewFrame(variantId, shipping.codeCZ)}
              >
                <div sx={styles.imageWrap}>
                  <img
                    sx={styles.variantImage}
                    src={dataPrintful[variantId]?.url}
                  />
                </div>
              </ItemVariant>
              <div sx={styles.textsWrap}>
                <StyledPriceP active={productRedux.variantId === variantId}>
                  {`+ 
                  ${getFormattedPrice(
                    basePriceAlgorithm.subtract([
                      dataPrintful?.[variantId]?.priceWithDeliveryAndProfit
                        .netPrice ?? 0,
                      dataPrintful?.[variantObjectNoFrame.id]
                        ?.priceWithDeliveryAndProfit.netPrice ?? 0,
                    ])
                  )}`}
                </StyledPriceP>

                <StyledDeliveryPriceP
                  active={productRedux.variantId === variantId}
                >
                  {`(+ ${getFormattedPrice(
                    priceAlgorithm.getPriceOfDelivery(variantId, dataPrintful)
                      .netPrice
                  )} doprava)`}
                </StyledDeliveryPriceP>
              </div>
            </ItemWrap>
          ))}
        </ContainerVariants>
      )}

      {lightbox.open && (
        <Lightbox
          mainSrc={lightbox.activeSrc}
          onCloseRequest={() => setLightbox({ open: false })}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    padding: "10px 10px",
  },

  materialDesc: {
    textAlign: "left",
  },

  loaderWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    minHeight: "20vh",
    justifyContent: "center",
    alignItems: "center",
  },

  imageWrap: {
    position: "relative",
    // height: "80%",
    display: "flex",
    justifyContent: "center",
  },
  variantImage: {
    position: "relative",
    height: "170px",
  },
  textsWrap: {
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    textAlign: "left",
  },
};

const StyledDeliveryPriceP = styled.p`
  margin: 0;
  font-size: ${fontSize("xxs")};
  cursor: pointer;
  color: ${({ active }) => (active ? color("cta_color") : color("muted"))};
  font-weight: ${({ active }) => active && fontWeight("bold")};
  text-align: right;
`;

const StyledPriceP = styled.p`
  margin: 0;
  font-size: ${fontSize("sm")};
  font-weight: ${({ active }) => active && fontWeight("bold")};
  color: ${({ active }) => active && color("cta_color")};
  cursor: pointer;
  text-align: right;
`;

const VariantDesc = styled.p`
  color: ${color("primary")};
  line-height: 1.2;
  font-size: 0.8rem;
  font-weight: ${fontWeight("bold")};
  padding-bottom: 5px;
  margin: 0;
`;

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  display: block;
  width: 4rem;
`;

const HeadingText = styled.p`
  font-weight: ${fontWeight("bold")};
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const ContainerVariants = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ItemVariant = styled.div`
  color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: 0px 0px 0px 1px;
  color: ${({ active }) => active && color("cta_color")};
  cursor: pointer;
  overflow: hidden;

  & > p {
    color: black;
  }
`;
