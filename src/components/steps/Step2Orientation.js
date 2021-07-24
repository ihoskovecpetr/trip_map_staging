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
      {!isMobile && <HeadingText>Orientace</HeadingText>}

      <div sx={styles.orientationWrap}>
        <div sx={styles.orientationShapeItems}>
          <div>
            <HighMock
              active={!isProductWide(product)}
              onClick={switchOrientation}
            ></HighMock>
          </div>
          <div>
            <WideMock
              active={isProductWide(product)}
              onClick={switchOrientation}
            ></WideMock>
          </div>
        </div>
        <div sx={styles.textsItems}>
          <p
            onClick={isProductWide(product) && switchOrientation}
            className={!isProductWide(product) && "active"}
          >
            Na výšku
          </p>

          <p
            onClick={!isProductWide(product) && switchOrientation}
            className={isProductWide(product) && "active"}
          >
            Na šířku
          </p>
        </div>
      </div>

      {!isMobile && (
        <TipParagraph>
          <StyledBold>Tip!</StyledBold> Pro změnu nadpisu a podnadpisu klikněte
          přímo na mapu
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
  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    color: "grey",
    marginTop: "20px",
    letterSpacing: "1.1px",
  },

  orientationWrap: {
    display: "flex",
    width: "50%",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  orientationShapeItems: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "> div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },

  textsItems: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    letterSpacing: "1.1px",
    fontWeight: 500,
    textTransform: "uppercase",
    fontSize: "14px",
    "> p": {
      my: 1,
      cursor: "pointer",
    },
    "> p.active": {
      color: "cta_color",
      pointerEvents: "none",
      cursor: "default",
    },
  },
};

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const WideMock = styled.div`
  height: 20px;
  width: 40px;
  background-color: white;
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 3px;
  color: ${({ active }) => active && color("cta_color")};
  pointer-events: ${({ active }) => active && "none"};
`;

const HighMock = styled.div`
  height: 40px;
  width: 20px;
  background-color: white;
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 3px;
  color: ${({ active }) => active && color("cta_color")};
  pointer-events: ${({ active }) => active && "none"};
`;

const TipParagraph = styled.p`
  margin: "20px 0px";
  font-weight: ${fontWeight("light")};
`;

const StyledBold = styled.span`
  font-weight: 600;
  color: black;
`;
