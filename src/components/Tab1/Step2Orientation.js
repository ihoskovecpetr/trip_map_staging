/** @jsx jsx */
import { useEffect } from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";

import { color, font, fontSize, fontWeight } from "Utils";
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
        <Text as="p" className="description" sx={styles.topDescription}>
          <b>Tip!</b> Pro změnu nadpisu a podnadpisu klikněte přímo na mapu
        </Text>
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
    width: "100%",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  orientationShapeItems: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "> div": {
      width: "30%",
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

  topDescription: {
    margin: "20px 0px",
    fontWeight: 100,
    "& b": {
      color: "grey",
      fontWeight: 500,
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
  border: 1px solid black;
  height: 25px;
  width: 50px;
  background-color: white;
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 5px;
  color: ${({ active }) => active && color("cta_color")};
  pointer-events: ${({ active }) => active && "none"};
`;

const HighMock = styled.div`
  border: 1px solid black;
  height: 50px;
  width: 25px;
  background-color: white;
  color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 5px;
  color: ${({ active }) => active && color("cta_color")};
  pointer-events: ${({ active }) => active && "none"};
`;
