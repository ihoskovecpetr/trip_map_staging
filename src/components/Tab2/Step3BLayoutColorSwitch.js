/** @jsx jsx */
import React from "react";
import { jsx, Text } from "theme-ui";
import styled from "styled-components";

import layoutSwitch1 from "assets/layoutSwitch/layout_switch_1.png";
import layoutSwitch2 from "assets/layoutSwitch/layout_switch_2.png";

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
      {!isMobile && (
        <Text as="p" className="description">
          Layout Color Switch
        </Text>
      )}
      {activeMapStyleObject.layoutColor && activeMapStyleObject.textColor && (
        <ItemContainer>
          <LayoutItem
            active={!product.isLayoutColorSwitched}
            onClick={() => switchLayoutColor(false)}
            layoutColor={`#${activeMapStyleObject.layoutColor}`}
            textColor={`#${activeMapStyleObject.textColor}`}
          >
            <p>P</p>
          </LayoutItem>
          <LayoutItem
            active={product.isLayoutColorSwitched}
            onClick={() => switchLayoutColor(true)}
            layoutColor={`#${activeMapStyleObject.textColor}`}
            textColor={`#${activeMapStyleObject.layoutColor}`}
          >
            <p>P</p>
          </LayoutItem>
        </ItemContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 5px 5px;
`;

const ItemContainer = styled.div`
  display: flex;
`;

const LayoutItem = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.9rem;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.26);

  background-color: ${({ layoutColor }) => layoutColor};
  color: ${({ active, layoutColor, textColor }) => textColor};
  border: ${({ active }) => active && "2px solid green"};
`;
