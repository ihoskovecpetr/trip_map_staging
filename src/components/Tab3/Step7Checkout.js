import React from "react";
import styled from "styled-components";

import Tab3Checkout from "./tab3Checkout";

export default function Step7Checkout({
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
        <Tab3Checkout
          map={map}
          mapTitles={mapTitles}
          activeLayout={activeLayout}
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
