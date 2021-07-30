/** @jsx jsx */
import { useState } from "react";
import { jsx, Text } from "theme-ui";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";

import { color, fontWeight } from "utils";
import CustomLoader from "../CustomLoader";

import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getVariantObject } from "LibGlobal/getVariantObject";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import { useIsMobile } from "Hooks/useIsMobile";

import {
  getPriceAlgorithm,
  getBasePriceAlgorithm,
} from "LibGlobal/priceAlgorithm/getPriceAlgorithm";

import { VARIANTS_PRINTFUL, FRAME_OPTION_NAMES } from "constants/constants";

const priceAlgorithm = getPriceAlgorithm();

export default function Step6FinishVariant({ product, setProduct }) {
  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });
  const { isMobile } = useIsMobile();

  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );
  const basePriceAlgorithm = getBasePriceAlgorithm();

  const setNewFrame = (variantId, shippingCode) => {
    //TODO there has to be price, otherwise return?
    setProduct((prev) => ({
      ...prev,
      variantId: variantId,
      price: dataPrintful[variantId]?.price,
      priceWithDelivery: priceAlgorithm.getPriceWithDelivery(
        variantId,
        dataPrintful
      ).netPrice,
      shippingCode,
    }));
  };

  const variantsPrintfulForSize = VARIANTS_PRINTFUL.filter((variant) => {
    const isVariantForOffer =
      product.sizeObject.acceptableSizes.includes(variant.sizeName) &&
      dataPrintful &&
      dataPrintful[variant.id]?.availableEU;
    return isVariantForOffer;
  });

  const variantObjectNoFrame = variantsPrintfulForSize.find(
    (variant) => variant.frameName === FRAME_OPTION_NAMES.NO_FRAME
  );

  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>Rámování</HeadingText>}
      {variantsPrintfulForSize.length === 0 && (
        <div sx={styles.loaderWrap}>
          <CustomLoader />
        </div>
      )}
      {variantsPrintfulForSize.length > 0 && (
        <ContainerVariants>
          {variantsPrintfulForSize.map(({ id: variantId, shipping }) => (
            <ItemVariant
              active={product.variantId === variantId}
              onClick={() => setNewFrame(variantId, shipping.codeCZ)}
            >
              <div sx={styles.textsWrap}>
                <VariantDesc>
                  {getVariantObject(variantId)?.frameName}
                </VariantDesc>
              </div>
              <div sx={styles.imageWrap}>
                <img
                  sx={styles.variantImage}
                  src={dataPrintful[variantId]?.url}
                />
              </div>
              <div sx={styles.textsWrap}>
                <p sx={styles.variantPrice}>
                  {`+ 
                  ${getFormattedPrice(
                    basePriceAlgorithm.subtract([
                      priceAlgorithm.getPriceWithoutDelivery(
                        variantId,
                        dataPrintful
                      ).netPrice,
                      priceAlgorithm.getPriceWithoutDelivery(
                        variantObjectNoFrame.id,
                        dataPrintful
                      ).netPrice,
                    ])
                  )}`}
                </p>

                <p sx={styles.variantDelivery}>
                  {`+ ${getFormattedPrice(
                    priceAlgorithm.getPriceOfDelivery(variantId, dataPrintful)
                      .netPrice
                  )} doprava`}
                </p>
              </div>
            </ItemVariant>
          ))}
        </ContainerVariants>
      )}
      {!isMobile && (
        <ExtraPaddingTop>
          <HeadingText>Materiál pro tisk</HeadingText>
          <p sx={styles.materialDesc}>{product.materialDesc}</p>
        </ExtraPaddingTop>
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
  variantPrice: {
    margin: 0,
    color: "primary",
    fontWeight: 600,
    borderRadius: "2px",
    cursor: "pointer",
  },
  variantDesc: {
    color: "primary",
    lineHeight: 1.2,
    fontSize: "0.8rem",
    fontWeight: 500,
    paddingBottom: "5px",
    margin: 0,
  },
  variantDelivery: {
    color: "muted",
    m: 0,
    fontWeight: 600,
    fontSize: "0.6rem",
  },
};

const VariantDesc = styled.p`
  color: ${color("primary")};
  line-height: 1.2;
  font-size: 0.8rem;
  font-weight: ${fontWeight("bold")};
  padding-bottom: 5px;
  margin: 0;
`;

const ExtraPaddingTop = styled.span`
  padding-top: 10px;
`;

const HeadingText = styled.p`
  font-weight: 600;
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
  flex-basis: 30%;
  display: block;
  width: 4rem;
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px 3px;
  color: ${({ active }) => active && color("cta_color")};
  cursor: pointer;
  overflow: hidden;

  & > p {
    color: black;
  }
`;
