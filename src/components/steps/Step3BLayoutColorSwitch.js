/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { color } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import { MAP_STYLES } from "constants/constants";
import { setProductAction } from "redux/order/actions";
import HeadingText from "./atoms/HeadingText";
import StepContainer from "./atoms/StepContainer";
import { TAB_STEPS } from "@constants";

import {
  useProductSelector,
  useActiveMapStyleSelector,
} from "redux/order/reducer";

export default function StepLayoutColorSwitch({ index }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const productRedux = useProductSelector();
  const activeMapStyleName = useActiveMapStyleSelector();

  const switchLayoutColor = (bool) => {
    dispatch(setProductAction({ isLayoutColorSwitched: bool }));
  };

  const activeMapStyleObject = MAP_STYLES[activeMapStyleName];

  return (
    <StepContainer isMobile={isMobile}>
      <HeadingText isMobile={isMobile}>
        {index}. {TAB_STEPS[index].full}
      </HeadingText>
      {activeMapStyleObject.layoutColor && activeMapStyleObject.textColor && (
        <ItemContainer>
          <LayoutItemWrap>
            <LayoutItem
              active={!productRedux.isLayoutColorSwitched}
              onClick={() => switchLayoutColor(false)}
              layoutColor={`#${activeMapStyleObject.layoutColor}`}
              textColor={`#${activeMapStyleObject.textColor}`}
            >
              <p>P</p>
            </LayoutItem>
          </LayoutItemWrap>
          <LayoutItemWrap>
            <LayoutItem
              active={productRedux.isLayoutColorSwitched}
              onClick={() => switchLayoutColor(true)}
              layoutColor={`#${activeMapStyleObject.textColor}`}
              textColor={`#${activeMapStyleObject.layoutColor}`}
            >
              <p>P</p>
            </LayoutItem>
          </LayoutItemWrap>
        </ItemContainer>
      )}
    </StepContainer>
  );
}

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
  border-radius: 5px;
  background-color: ${({ layoutColor }) => layoutColor};
  color: ${({ textColor }) => textColor};
  border: 3px solid;
  border-color: ${({ active }) =>
    active ? color("cta_color") : "rgba(0,0,0,0.1)"};
`;
