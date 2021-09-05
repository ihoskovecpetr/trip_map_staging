import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";

import CheckoutCta from "../Checkout/CheckoutCta";
import MapDefinition from "./Step7MapDefinition";
import { mobile, color, fontWeight } from "utils";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useIsMobile } from "Hooks/useIsMobile";
import { useProductSelector } from "redux/order/reducer";

export default function Step8Checkout({
  map,
  activeMapStyleName,
  snapMapInstance,
  children,
}) {
  const [isDefaultDefinition, setIsDefaultDefinition] = useState(true);
  const { isMobile } = useIsMobile();
  const productRedux = useProductSelector();

  return (
    <Container>
      <AbsoluteBtnWrap>
        {!isMobile && (
          <ExtraPaddingTop>
            <HeadingText>9. Materiál pro tisk</HeadingText>
            <StyledMaterialP>{productRedux.materialDesc}</StyledMaterialP>
          </ExtraPaddingTop>
        )}

        {!isDefaultDefinition && (
          <MapDefinition map={map} activeMapStyleName={activeMapStyleName} />
        )}
        {!isMobile && <HeadingText>10. Shrnutí</HeadingText>}

        <CheckoutCta
          map={map}
          children={children}
          snapMapInstance={snapMapInstance}
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
  padding: 10px;
`;

const ExtraPaddingTop = styled.span`
  padding-top: 10px;
`;

const HeadingText = styled.p`
  font-weight: ${fontWeight("bold")};
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const StyledMaterialP = styled.p`
  text-align: left;
  border-radius: 3px;
  border: 1px solid ${color("cta_color")};
  display: inline-block;
  padding: 5px;
  margin: 5px;
`;
