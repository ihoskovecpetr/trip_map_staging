import React from "react";
import styled from "styled-components";

import CheckoutCta from "../Checkout/CheckoutCta";
import { mobile } from "utils";

export default function Step8Checkout({
  map,
  mapTitles,
  activeLayout,
  product,
  activeMapStyleName,
  isCustomUI,
  children,
}) {
  return (
    <Container>
      <AbsoluteBtnWrap>
        <CheckoutCta
          map={map}
          mapTitles={mapTitles}
          activeLayoutName={activeLayout}
          product={product}
          activeMapStyleName={activeMapStyleName}
          isCustomUI={isCustomUI}
          children={children}
        />
      </AbsoluteBtnWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const AbsoluteBtnWrap = styled.div`
  width: 100%;
  position: relative;
  bottom: 0px;
  left: 0px;
  z-index: 10;
  overflow: visible;
  width: 100%;

  @media (max-width: 768px) {
    position: ${({ isCustomUI }) => (isCustomUI ? "relative" : "fixed")}
    width: 30%;
  }
`;
