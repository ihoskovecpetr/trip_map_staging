/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { useDispatch } from "react-redux";

import { color, fontSize, fontWeight } from "utils";
import { getVariantObject } from "LibGlobal/getVariantObject";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import { checkDiscountCode } from "LibGlobal/checkDiscountCode";
import { getDiscountPercentage } from "LibGlobal/getDiscountPercentage";

import {
  useTitlesSelector,
  useProductSelector,
  useActiveLayoutSelector,
  useDiscountSelector,
} from "redux/order/reducer";

import { setDiscountCode, setDiscountCodeAccepted } from "redux/order/actions";

export default function CheckoutItems({ dataPrintful, activeMapStyleName }) {
  const dispatch = useDispatch();
  const mapTitles = useTitlesSelector();
  const productRedux = useProductSelector();
  const activeLayoutNameRedux = useActiveLayoutSelector();
  const discount = useDiscountSelector();
  const discountPercentage = getDiscountPercentage(discount.code);

  const [checkingCode, setCheckingCode] = useState(false);

  const productDescription = getVariantObject(productRedux.variantId)
    ?.frameName;

  const dataPrintfulVariant =
    dataPrintful && dataPrintful[productRedux.variantId];

  const priceAlgorithm = getPriceAlgorithm();

  const priceWithoutDelivery = priceAlgorithm.getPriceWithoutDelivery(
    productRedux.variantId,
    dataPrintful
  );

  const priceWithoutDeliveryDiscounted = priceAlgorithm.getPriceWithoutDeliveryDiscounted(
    productRedux.variantId,
    dataPrintful,
    discount.code
  );

  const priceOfDelivery = priceAlgorithm.getPriceOfDelivery(
    productRedux.variantId,
    dataPrintful
  );

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    productRedux.variantId,
    dataPrintful
  );

  const priceWithDeliveryAndDiscount = priceAlgorithm.getPriceWithDeliveryDiscounted(
    productRedux.variantId,
    dataPrintful
    // product
  );

  console.log({ priceWithDeliveryAndDiscount });

  const typingDiscountCode = (e) => {
    setCheckingCode(true);
    dispatch(setDiscountCode(e.target.value));
    dispatch(setDiscountCodeAccepted(checkDiscountCode(e.target.value)));

    setTimeout(() => {
      setCheckingCode(false);
    }, 1000);
  };

  return (
    <Container>
      <CheckoutLine>
        {/* <ImageContainer>{ImageComponent}</ImageContainer> */}
        <LineTextContainer>
          <BoldText>{`${productDescription} ${productRedux.sizeObject.code}`}</BoldText>
          <span>
            <GreyText>{`${mapTitles?.heading?.text} ${mapTitles?.subtitle?.text}`}</GreyText>
            <GreyText>{`${productRedux.materialDesc}`}</GreyText>
            <GreyText>{`${activeLayoutNameRedux} ${activeMapStyleName}`}</GreyText>
          </span>
        </LineTextContainer>
        <StyledPriceSpan>
          <StyledSpan isCrossed={discount.codeAccepted && !checkingCode}>
            {priceWithoutDelivery.netPrice
              ? getFormattedPrice(priceWithoutDelivery.netPrice)
              : "ZJIŠTUJI..."}
          </StyledSpan>
          <span>
            {discount.codeAccepted &&
              !checkingCode &&
              getFormattedPrice(priceWithoutDeliveryDiscounted.netPrice)}
          </span>
        </StyledPriceSpan>
      </CheckoutLine>
      <NewLine />

      <CheckoutLine>
        {/* <ImageContainer>
          <StyledImage src={deliveryTruck} />
        </ImageContainer> */}
        <LineTextContainer>
          <BoldText>{`Doprava`}</BoldText>

          <GreyText>{`Doručení proběhne ${dataPrintfulVariant?.shipping.minDeliveryDays} - ${dataPrintfulVariant?.shipping.maxDeliveryDays} dní od zaplacení`}</GreyText>
        </LineTextContainer>
        <StyledPriceSpan>
          {getFormattedPrice(priceOfDelivery.netPrice)}
        </StyledPriceSpan>
      </CheckoutLine>
      <NewLine />
      <NewLine />
      <CheckoutLine>
        <LineTextContainer>
          <BoldText>{`Slevový kupon`}</BoldText>
        </LineTextContainer>
        <StyledPriceSpan>
          <span>
            {checkingCode ? "... " : discount.codeAccepted ? "✅ " : "❌ "}
            <StyledInput value={discount.code} onChange={typingDiscountCode} />
          </span>
        </StyledPriceSpan>
      </CheckoutLine>

      <NewLine />

      <CheckoutLine>
        <LineTextContainer>
          <BoldText isCrossed={discount.codeAccepted}>{`Celkem`}</BoldText>
          {discount.codeAccepted && (
            <BoldText>{`Celkem po slevě ${discountPercentage} %`}</BoldText>
          )}
          <GreyText>{`Celková cena včetně dopravy a zpracování`}</GreyText>
        </LineTextContainer>
        <StyledPriceSpan>
          <StyledSpan isCrossed={discount.codeAccepted && !checkingCode}>
            {getFormattedPrice(priceWithDelivery.netPrice)}
          </StyledSpan>
          <span>
            {discount.codeAccepted &&
              !checkingCode &&
              getFormattedPrice(priceWithDeliveryAndDiscount.netPrice)}
          </span>
        </StyledPriceSpan>
      </CheckoutLine>
    </Container>
  );
}

const Container = styled.span`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
`;

const CheckoutLine = styled.span`
  display: flex;
  width: 100%;
  margin: 10px 0px;
  justify-content: space-between;
`;

const ImageContainer = styled.span`
  flex-grow: 1;
  flex-basis: 50%;
  display: flex;
  align-items: center;
`;

const StyledSpan = styled.span`
  text-decoration: ${({ isCrossed }) => (isCrossed ? "line-through" : "unset")};
  font-weight: ${({ isCrossed }) => isCrossed && fontWeight("regular")};
`;

const LineTextContainer = styled.span`
  flex-grow: 3;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BoldText = styled.p`
  display: inline-block;
  margin: 0;
  font-size: ${fontSize("sm")};
  text-align: left;
  text-decoration: ${({ isCrossed }) => (isCrossed ? "line-through" : "unset")};
`;

const GreyText = styled.p`
  color: ${color("muted")};
  margin: 0;
  line-height: 100%;
  width: 100%;
  word-wrap: break-word;
  font-size: ${fontSize("xs")};
  text-align: left;
`;

const StyledPriceSpan = styled.span`
  font-size: ${({ isLargePrice }) => (isLargePrice ? "1rem" : "0.8rem")};
  font-weight: 600;
  text-align: right;
  flex-grow: 1;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
`;

const NewLine = styled.div`
  height: 0.05rem;
  background-color: ${color("whitish_paper_blue")};
  width: 100%;
  margin-bottom: 2px;
`;

const StyledInput = styled.input`
  width: 70%;
`;
