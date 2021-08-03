import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";

import CheckoutCta from "../Checkout/CheckoutCta";
import MapDefinition from "./Step7MapDefinition";
import { mobile, color, fontWeight } from "utils";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useIsMobile } from "Hooks/useIsMobile";

export default function Step8Checkout({
  map,
  activeLayout,
  product,
  setProduct,
  activeMapStyleName,
  children,
}) {
  const [isDefaultDefinition, setIsDefaultDefinition] = useState(true);
  const { isMobile } = useIsMobile();

  return (
    <Container>
      <AbsoluteBtnWrap>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={isDefaultDefinition}
              color="primary"
              onClick={(e) => {
                setIsDefaultDefinition(e.target.checked);
              }}
            />
          }
          label="Střední úrověň měřítka mapy"
        /> */}

        {!isMobile && (
          <ExtraPaddingTop>
            <HeadingText>9. Materiál pro tisk</HeadingText>
            <StyledMaterialP>{product.materialDesc}</StyledMaterialP>
          </ExtraPaddingTop>
        )}

        {!isDefaultDefinition && (
          <MapDefinition
            map={map}
            activeLayout={activeLayout}
            product={product}
            setProduct={setProduct}
            activeMapStyleName={activeMapStyleName}
          />
        )}
        {!isMobile && <HeadingText>10. Shrnutí</HeadingText>}

        <CheckoutCta
          map={map}
          activeLayoutName={activeLayout}
          product={product}
          activeMapStyleName={activeMapStyleName}
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
