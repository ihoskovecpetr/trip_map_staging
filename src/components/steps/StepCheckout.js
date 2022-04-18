import React, { useState } from "react";
import styled from "styled-components";

import CheckoutCta from "../checkout-btn/CheckoutCta";
import { useIsMobile } from "Hooks/useIsMobile";
import { useProductSelector } from "redux/order/reducer";
import HeadingText from "./atoms/HeadingText";
import StepContainer from "./atoms/StepContainer";
import { TAB_STEPS } from "@constants";
import { useTranslation } from "Hooks/useTranslation";

export default function StepCheckout({
  map,
  activeMapStyleName,
  snapMapInstance,
  index,
  children,
}) {
  const t = useTranslation();
  const { isMobile } = useIsMobile();
  const productRedux = useProductSelector();

  console.log({ index });

  return (
    <StepContainer isMobile={isMobile}>
      <HeadingText isMobile={isMobile}>
        {index}. {t(TAB_STEPS[index].full)}
      </HeadingText>
      <StyledMaterialLi>{t(productRedux.materialDesc)}</StyledMaterialLi>

      <HeadingText>
        {index + 1}. {t(TAB_STEPS[index + 1].full)}
      </HeadingText>

      <CheckoutCta
        map={map}
        children={children}
        snapMapInstance={snapMapInstance}
      />
    </StepContainer>
  );
}

const StyledMaterialLi = styled.li`
  padding: 0 15px;
`;
