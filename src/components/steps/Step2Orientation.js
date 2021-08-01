/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";

import { color, fontWeight } from "utils";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { orientationSwitcher } from "../../LibGlobal/getOrientationSwitcher";

export default function Step2Orientation({ product, setProduct }) {
  const { isMobile } = useIsMobile();

  const isProductWide = (product) => {
    if (product.sizeObject.ratio < 1) {
      return true;
    }
    return false;
  };

  const switchOrientation = () => {
    orientationSwitcher(product, setProduct);
  };

  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>2. Orientace</HeadingText>}

      <OrientationWrap>
        <SingleOrientationItem
          onClick={switchOrientation}
          active={!isProductWide(product)}
        >
          <IconWrap>
            <HighMock />
          </IconWrap>

          <StyledDescriptionP
            active={!isProductWide(product)}
            onClick={isProductWide(product) && switchOrientation}
          >
            Na výšku
          </StyledDescriptionP>
        </SingleOrientationItem>
        <SingleOrientationItem
          onClick={switchOrientation}
          active={isProductWide(product)}
        >
          <IconWrap>
            <WideMock />
          </IconWrap>

          <StyledDescriptionP
            onClick={!isProductWide(product) && switchOrientation}
            active={isProductWide(product)}
          >
            Na šířku
          </StyledDescriptionP>
        </SingleOrientationItem>
      </OrientationWrap>

      {!isMobile && (
        <TipParagraph>
          <StyledBold>Tip!</StyledBold> Pro změnu hlavního a vedlejšího nadpisu
          klikněte přímo na dotyčný text
        </TipParagraph>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    position: "relative",
    paddingTop: "15px",
  },
};

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const OrientationWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const SingleOrientationItem = styled.div`
  flex-basis: 30%;
  margin: 2%;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-color: ${({ active }) => active && color("cta_color")};
`;

const IconWrap = styled.div`
  flex-basis: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ active }) => !active && "pointer"};

  & > div {
    color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 0 3px;
  }
`;

const WideMock = styled.div`
  height: 30px;
  width: 50px;
  color: ${({ active }) => active && color("cta_color")};
`;

const HighMock = styled.div`
  height: 50px;
  width: 30px;
  color: ${({ active }) => active && color("cta_color")};
  pointer-events: ${({ active }) => active && "none"};
`;

const StyledDescriptionP = styled.p`
  text-align: center;
  color: ${({ active }) => active && color("cta_color")};
  font-weight: ${fontWeight("regular")};
  margin: 3px 0;
`;

const TipParagraph = styled.p`
  margin: "20px 0px";
  font-weight: ${fontWeight("light")};
`;

const StyledBold = styled.span`
  font-weight: 600;
  color: black;
`;
