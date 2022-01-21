import React from "react";
import styled from "styled-components";
import { color } from "utils";
import Big from "big.js";
import { VALID_DISCOUNT_CODES } from "@constants";

export default function DiscountBanner() {
  const discKoef = new Big(VALID_DISCOUNT_CODES[0].discountKoef);
  const discountPercentage = discKoef.sub(1).times(-100).toString();

  return (
    <BannerContainer>
      <StyledParagraph>
        Sleva {discountPercentage}% s kodem:{"  "}
        <b>{VALID_DISCOUNT_CODES[0].code}</b>, Doprava zdarma!
      </StyledParagraph>
    </BannerContainer>
  );
}

const BannerContainer = styled.div`
  width: 100%;
  background-color: ${color("secondary")};
  text-align: center;
  color: ${color("background_almost_white")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledParagraph = styled.p`
  margin: 0;
  vertical-align: baseline;
  padding-top: 2px;
`;
