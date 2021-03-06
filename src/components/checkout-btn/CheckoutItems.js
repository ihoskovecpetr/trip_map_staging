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
import { setDiscountCode, setDiscountCodeAccepted } from "redux/order/actions";
import { VALID_DISCOUNT_CODES } from "@constants";
import { useTranslation } from "Hooks/useTranslation";
import { useGetCurrency } from "Hooks/useGetCurrency";

import {
  useTitlesSelector,
  useProductSelector,
  useActiveLayoutSelector,
  useDiscountSelector,
} from "redux/order/reducer";

export default function CheckoutItems({ dataPrintful, activeMapStyleName }) {
  const dispatch = useDispatch();
  const mapTitles = useTitlesSelector();
  const productRedux = useProductSelector();
  const activeLayoutNameRedux = useActiveLayoutSelector();
  const discount = useDiscountSelector();
  const discountPercentage = getDiscountPercentage(discount.code);
  const [discountInputOpen, setDiscountInputOpen] = useState(false);
  const [checkingCode, setCheckingCode] = useState(false);
  const t = useTranslation();
  const currency = useGetCurrency();

  useEffect(() => {
    setDiscountInputOpen(discount.code ? true : false);
  }, []);

  const productDescription = t(
    getVariantObject(productRedux.variantId)?.frameName
  );

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
            <RegularText>{t(productRedux.materialDesc)}</RegularText>
            <RegularText>
              {t("checkout.layoutAndColorsText", {
                activeLayoutNameRedux,
                activeMapStyleName,
              })}
            </RegularText>
          </span>
        </LineTextContainer>
        <StyledPriceSpan>
          <StyledSpan isCrossed={discount.codeAccepted && !checkingCode}>
            {priceWithDelivery
              ? getFormattedPrice({ amount: priceWithDelivery, currency })
              : t("checkout.loading")}
          </StyledSpan>
          <span>
            {discount.codeAccepted &&
              !checkingCode &&
              getFormattedPrice({ amount: priceDiscounted.netPrice, currency })}
          </span>
        </StyledPriceSpan>
      </CheckoutLine>
      <NewLine />

      <CheckoutLine>
        {/* <ImageContainer>
          <StyledImage src={deliveryTruck} />
        </ImageContainer> */}
        <LineTextContainer>
          <BoldText>{t("checkout.delivery")}</BoldText>
          <RegularText>
            {t("checkout.deliveryMessage", {
              from: dataPrintfulVariant?.shipping.minDeliveryDays,
              to: dataPrintfulVariant?.shipping.maxDeliveryDays,
            })}
          </RegularText>
        </LineTextContainer>
        <StyledPriceSpan>
          {getFormattedPrice({ amount: priceOfDelivery.netPrice, currency })}
        </StyledPriceSpan>
      </CheckoutLine>
      <NewLine />
      <NewLine />

      <CheckoutLine>
        <LineTextContainer>
          <BoldText>
            {t("checkout.haveCode")}
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
              {checkingCode ? "... " : discount.codeAccepted ? "??? " : "??? "}
              <StyledInput
                id="cupon_input"
                value={discount.code}
                onChange={typingDiscountCode}
                placeholder={t("checkout.yourDiscountCode")}
                onFocus={focusOnInput}
              />
            </span>
          )}
        </StyledDiscountCode>
      </CheckoutLine>

      <NewLine />

      <CheckoutLine>
        <LineTextContainer>
          <BoldText isCrossed={discount.codeAccepted && !checkingCode} isLarge>
            {t("checkout.total")}
          </BoldText>
          {discount.codeAccepted && !checkingCode && (
            <BoldText isLarge>
              {t("checkout.totalWithDiscount", {
                discountPercentage,
              })}
            </BoldText>
          )}
          <RegularText>{t("checkout.totalPriceText")}</RegularText>
        </LineTextContainer>
        <StyledPriceSpan isLargePrice>
          <StyledSpan isCrossed={discount.codeAccepted && !checkingCode}>
            {getFormattedPrice({ amount: priceWithDelivery, currency })}
          </StyledSpan>
          <span>
            {discount.codeAccepted &&
              !checkingCode &&
              getFormattedPrice({ amount: priceDiscounted.netPrice, currency })}
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
