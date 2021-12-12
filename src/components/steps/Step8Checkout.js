import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";

import CheckoutCta from "../checkout-btn/CheckoutCta";
import MapDefinition from "./Step7MapDefinition";
import { mobile, color, fontWeight } from "utils";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useIsMobile } from "Hooks/useIsMobile";
import { useProductSelector } from "redux/order/reducer";
import StepContainer from "./atoms/StepContainer";

export default function Step8Checkout({
  map,
  activeMapStyleName,
  snapMapInstance,
  index,
  children,
}) {
  const [isDefaultDefinition, setIsDefaultDefinition] = useState(true);
  const { isMobile } = useIsMobile();
  const productRedux = useProductSelector();

  return (
    <StepContainer isMobile={isMobile}>
      <AbsoluteBtnWrap>
        {!isMobile && (
          <ExtraPaddingTop>
            <HeadingText>{index}. Materiál pro tisk</HeadingText>
            {/* <StyledMaterialP>{productRedux.materialDesc}</StyledMaterialP> */}
            <li>{productRedux.materialDesc}</li>
          </ExtraPaddingTop>
        )}

        {!isDefaultDefinition && (
          <MapDefinition map={map} activeMapStyleName={activeMapStyleName} />
        )}
        {!isMobile && <HeadingText>{index + 1}. Shrnutí</HeadingText>}

        <CheckoutCta
          map={map}
          children={children}
          snapMapInstance={snapMapInstance}
        />
      </AbsoluteBtnWrap>
    </StepContainer>
  );
}

const AbsoluteBtnWrap = styled.div`
  width: 100%;
  position: relative;
  bottom: 0px;
  left: 0px;
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
