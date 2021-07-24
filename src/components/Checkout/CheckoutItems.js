/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import { color, fontSize } from "utils";
import { getVariantObject } from "LibGlobal/getVariantObject";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import deliveryTruck from "assets/icons/delivery-truck.png";

export default function ProductSummary({
  product,
  mapTitles,
  dataPrintful,
  ImageComponent,
  activeLayoutName,
  activeMapStyleName,
}) {
  const productDescription = getVariantObject(product.variantId)?.frameName;
  const dataPrintfulVariant = dataPrintful && dataPrintful[product.variantId];

  const priceAlgorithm = getPriceAlgorithm();

  const priceWithoutDelivery = priceAlgorithm.getPriceWithoutDelivery(
    product.variantId,
    dataPrintful
  );

  const priceOfDelivery = priceAlgorithm.getPriceOfDelivery(
    product.variantId,
    dataPrintful
  );

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    product.variantId,
    dataPrintful
  );

  return (
    <Container>
      <CheckoutLine>
        <ImageContainer>{ImageComponent}</ImageContainer>
        <LineTextContainer>
          <BoldText>{`${productDescription} ${product.sizeObject.code}`}</BoldText>
          <GreyText>{`${mapTitles?.heading?.text} ${mapTitles?.subtitle?.text}`}</GreyText>
          <GreyText>{`${product.materialDesc}`}</GreyText>
          <GreyText>{`${activeLayoutName} ${activeMapStyleName}`}</GreyText>
        </LineTextContainer>
        <StyledPriceSpan>
          {priceWithoutDelivery.netPrice
            ? getFormattedPrice(priceWithoutDelivery.netPrice)
            : "ZJIŠTUJI..."}
        </StyledPriceSpan>
      </CheckoutLine>
      <NewLine />

      <CheckoutLine>
        <ImageContainer>
          <StyledImage src={deliveryTruck} />
        </ImageContainer>
        <LineTextContainer>
          <BoldText>{`Doprava`}</BoldText>

          <GreyText>{`Doručení proběhne ${dataPrintfulVariant?.shipping.minDeliveryDays} - ${dataPrintfulVariant?.shipping.maxDeliveryDays} dní od zaplacení`}</GreyText>
        </LineTextContainer>
        <StyledPriceSpan>
          {getFormattedPrice(priceOfDelivery.netPrice)}
        </StyledPriceSpan>
      </CheckoutLine>
      <NewLine />

      <CheckoutLine>
        <LineTextContainer>
          <BoldText>{`Celkem`}</BoldText>

          <GreyText>{`Celková cena včetně dopravy a zpracování`}</GreyText>
        </LineTextContainer>
        <StyledPriceSpan>
          {getFormattedPrice(priceWithDelivery.netPrice)}
        </StyledPriceSpan>
      </CheckoutLine>
    </Container>
  );
}

const Container = styled.span`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const CheckoutLine = styled.span`
  display: flex;
  width: 100%;
  margin: 10px 2px;
  justify-content: space-between;
`;

const ImageContainer = styled.span`
  flex-grow: 1;
  flex: 0 0 25%;

  display: flex;
  align-items: center;
`;

const LineTextContainer = styled.span`
  flex-grow: 3;
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BoldText = styled.p`
  color: ${color("primary")};
  margin: 0;
  font-size: ${fontSize("sm")};
`;

const StyledImage = styled.img`
  height: 80px;
  width: 80px;
`;

const GreyText = styled.p`
  color: ${color("muted")};
  margin: 0;
  line-height: 100%;
  width: 100%;
  word-wrap: break-word;
  font-size: ${fontSize("xs")};
`;

const StyledPriceSpan = styled.span`
  font-size: ${({ isLargePrice }) => (isLargePrice ? "1rem" : "0.8rem")};
  font-weight: 600;
  text-align: right;
  flex-grow: 1;
  flex: 0 0 25%;
`;

const DetailItemWrap = styled.div`
  text-align: left;
  width: 100%;
  margin-top: 0.2rem;
`;

const ItemName = styled.p`
  font-size: 0.6rem;
  font-weight: 600;
  color: grey;
  text-transform: uppercase;
`;

const NewLine = styled.div`
  height: 0.05rem;
  background-color: ${color("whitish_paper_blue")};
  width: 100%;
`;
const styles = {
  leftColumn: {
    width: "100%",
  },
  costsWrap: {
    borderTop: "1px solid lightGrey",
    borderBottom: "1px solid lightGrey",
    py: "5px",
  },
  itemText: {
    color: "primary",
    textTransform: "uppercase",
    fontWeight: 500,
    // letterSpacing: "1.px",
  },
};
