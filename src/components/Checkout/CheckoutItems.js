/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { color, fontSize, fontWeight } from "utils";
import { getVariantObject } from "LibGlobal/getVariantObject";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import { isDiscountCodeValid } from "LibGlobal/isDiscountCodeValid";
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
  const [discountInputOpen, setDiscountInputOpen] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);

  useEffect(() => {
    setDiscountInputOpen(discount.code ? true : false);
  }, []);

  const productDescription = getVariantObject(productRedux.variantId)
    ?.frameName;

  const dataPrintfulVariant =
    dataPrintful && dataPrintful[productRedux.variantId];

  const priceAlgorithm = getPriceAlgorithm();

  const priceOfDelivery = priceAlgorithm.getPriceOfDelivery(
    productRedux.variantId,
    dataPrintful
  );

  const priceWithDelivery =
    dataPrintful?.[productRedux.variantId]?.priceWithDeliveryAndProfit
      .netPrice ?? 0;

  const priceDiscounted = priceAlgorithm.getDiscountedPrice(
    priceWithDelivery,
    discount.code
  );

  const typingDiscountCode = (e) => {
    setCheckingCode(true);
    dispatch(setDiscountCode(e.target.value));
    dispatch(setDiscountCodeAccepted(isDiscountCodeValid(e.target.value)));

    setTimeout(() => {
      setCheckingCode(false);
    }, 1000);
  };

  const changeDiscountInput = (e) => {
    setDiscountInputOpen(e.target.checked);

    if (!e.target.checked) {
      dispatch(setDiscountCode(""));
      dispatch(setDiscountCodeAccepted(false));
    }
  };

  const focusOnInput = (e) => {
    console.log("FOcusL ", e);

    const input = document.getElementById("cupon_input");

    input.placeholder = "";
  };

  return (
    <Container>
      <CheckoutLine>
        {/* <ImageContainer>{ImageComponent}</ImageContainer> */}
        <LineTextContainer>
          <BoldText>{`${productDescription} ${productRedux.sizeObject.code}`}</BoldText>
          <span>
            <RegularText>{`${mapTitles?.heading?.text} ${mapTitles?.subtitle?.text}`}</RegularText>
            <RegularText>{`${productRedux.materialDesc}`}</RegularText>
            <RegularText>{`${activeLayoutNameRedux} layout, ${activeMapStyleName} styl`}</RegularText>
          </span>
        </LineTextContainer>
        <StyledPriceSpan>
          <StyledSpan isCrossed={discount.codeAccepted && !checkingCode}>
            {priceWithDelivery
              ? getFormattedPrice(priceWithDelivery)
              : "ZJIŠTUJI..."}
          </StyledSpan>
          <span>
            {discount.codeAccepted &&
              !checkingCode &&
              getFormattedPrice(priceDiscounted.netPrice)}
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

          <RegularText>{`Doručení proběhne ${dataPrintfulVariant?.shipping.minDeliveryDays} - ${dataPrintfulVariant?.shipping.maxDeliveryDays} dnů po zaplacení`}</RegularText>
        </LineTextContainer>
        <StyledPriceSpan>
          {getFormattedPrice(priceOfDelivery.netPrice)}
        </StyledPriceSpan>
      </CheckoutLine>
      <NewLine />
      <NewLine />

      <CheckoutLine>
        <LineTextContainer>
          <BoldText>
            {`Mám slevový kód? `}
            <input
              type="checkbox"
              checked={discountInputOpen}
              onChange={changeDiscountInput}
            />
          </BoldText>
        </LineTextContainer>
        <StyledDiscountCode>
          {discountInputOpen && (
            <span>
              {checkingCode ? "... " : discount.codeAccepted ? "✅ " : "❌ "}
              <StyledInput
                id="cupon_input"
                value={discount.code}
                onChange={typingDiscountCode}
                placeholder="VÁŠ KÓD"
                onFocus={focusOnInput}
              />
            </span>
          )}
        </StyledDiscountCode>
      </CheckoutLine>

      <NewLine />

      <CheckoutLine>
        <LineTextContainer>
          <BoldText
            isCrossed={discount.codeAccepted && !checkingCode}
            isLarge
          >{`Celkem`}</BoldText>
          {discount.codeAccepted && !checkingCode && (
            <BoldText
              isLarge
            >{`Celkem po slevě ${discountPercentage}%`}</BoldText>
          )}
          <RegularText>{`Celková cena včetně dopravy a zpracování`}</RegularText>
        </LineTextContainer>
        <StyledPriceSpan isLargePrice>
          <StyledSpan isCrossed={discount.codeAccepted && !checkingCode}>
            {getFormattedPrice(priceWithDelivery)}
          </StyledSpan>
          <span>
            {discount.codeAccepted &&
              !checkingCode &&
              getFormattedPrice(priceDiscounted.netPrice)}
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

const StyledSpan = styled.span`
  text-decoration: ${({ isCrossed }) => (isCrossed ? "line-through" : "unset")};
  font-weight: ${({ isCrossed }) => isCrossed && fontWeight("regular")};
  color: ${({ isCrossed }) => (isCrossed ? color("muted") : "unset")};
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
  font-size: ${({ isLarge }) => (isLarge ? fontSize("md") : fontSize("sm"))};
  font-weight: ${fontWeight("bold")};
  text-align: left;
  text-decoration: ${({ isCrossed }) => (isCrossed ? "line-through" : "unset")};
  color: ${({ isCrossed }) => (isCrossed ? color("muted") : "unset")};
`;

const RegularText = styled.p`
  font-size: ${fontSize("xs")};
  font-weight: ${fontWeight("superLight")};
  text-align: left;
  margin: 0;
  line-height: 1.2;
  width: 100%;
  word-wrap: break-word;
`;

const StyledPriceSpan = styled.span`
  font-size: ${({ isLargePrice }) =>
    isLargePrice ? fontSize("md") : fontSize("sm")};
  font-weight: ${fontWeight("bold")};
  text-align: right;
  flex-grow: 1;
  flex-basis: 35%;
  display: flex;
  flex-direction: column;
`;

const StyledDiscountCode = styled.span`
  text-align: right;
  flex-grow: 1;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
`;

const NewLine = styled.div`
  height: 0.03rem;
  background-color: ${color("muted")};
  width: 100%;
  margin-bottom: 2px;
`;

const StyledInput = styled.input`
  width: 70%;
`;
