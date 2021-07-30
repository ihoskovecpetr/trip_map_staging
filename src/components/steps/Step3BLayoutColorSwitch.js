/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";

import { color, font, fontSize, fontWeight } from "utils";

import { useIsMobile } from "../../Hooks/useIsMobile";
import {
  LAYOUT_STYLE_NAMES,
  LAYOUTS,
  MAP_STYLES,
} from "../../constants/constants";

export default function Step3BLayoutColorSwitch({
  product,
  setProduct,
  activeMapStyleName,
}) {
  const { isMobile } = useIsMobile();

  const switchLayoutColor = (bool) => {
    setProduct((prev) => ({
      ...prev,
      isLayoutColorSwitched: bool,
    }));
  };

  const activeMapStyleObject = MAP_STYLES[activeMapStyleName];

  console.log({ product, activeMapStyleObject });

  return (
    <Container>
      {!isMobile && <HeadingText>Layout Color Switch</HeadingText>}
      {activeMapStyleObject.layoutColor && activeMapStyleObject.textColor && (
        <ItemContainer>
          <LayoutItemWrap>
            <LayoutItem
              active={!product.isLayoutColorSwitched}
              onClick={() => switchLayoutColor(false)}
              layoutColor={`#${activeMapStyleObject.layoutColor}`}
              textColor={`#${activeMapStyleObject.textColor}`}
            >
              <p>P</p>
            </LayoutItem>
          </LayoutItemWrap>
          <LayoutItemWrap>
            <LayoutItem
              active={product.isLayoutColorSwitched}
              onClick={() => switchLayoutColor(true)}
              layoutColor={`#${activeMapStyleObject.textColor}`}
              textColor={`#${activeMapStyleObject.layoutColor}`}
            >
              <p>P</p>
            </LayoutItem>
          </LayoutItemWrap>
        </ItemContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 5px 5px;
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 15px;
  letter-spacing: 1.1px;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const LayoutItemWrap = styled.div`
  flex-basis: 40%;
  display: flex;
`;

const LayoutItem = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin: 0.9rem;
  background-color: ${({ layoutColor }) => layoutColor};
  color: ${({ active, layoutColor, textColor }) => textColor};
  border: 3px solid;
  border-color: ${({ active }) =>
    active ? color("cta_color") : "rgba(0,0,0,0.1)"};
`;
