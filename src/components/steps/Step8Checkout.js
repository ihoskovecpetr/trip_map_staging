import React, { useState } from "react";
import styled from "styled-components";

import CheckoutCta from "../checkout-btn/CheckoutCta";
import { useIsMobile } from "Hooks/useIsMobile";
import { useProductSelector } from "redux/order/reducer";
import HeadingText from "./atoms/HeadingText";
import StepContainer from "./atoms/StepContainer";
import { TAB_STEPS } from "@constants";

export default function Step8Checkout({
  map,
  activeMapStyleName,
  snapMapInstance,
  index,
  children,
}) {
  const { isMobile } = useIsMobile();
  const productRedux = useProductSelector();

  console.log({ index });

  return (
    <StepContainer isMobile={isMobile}>
      <HeadingText isMobile={isMobile}>
        {index}. {TAB_STEPS[index].full}
      </HeadingText>
      <StyledMaterialLi>{productRedux.materialDesc}</StyledMaterialLi>

      <HeadingText>{index + 1}. Shrnutí</HeadingText>

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
