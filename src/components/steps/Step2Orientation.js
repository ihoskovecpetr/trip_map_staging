/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { color, fontWeight } from "utils";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { getFlippedSizeObject } from "LibGlobal/getFlippedSizeObject";
import { setProductAction } from "redux/order/actions";
import { useProductSelector } from "redux/order/reducer";

export default function Step2Orientation({ index }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const productRedux = useProductSelector();

  const isProductWide = (product) => {
    if (product.sizeObject.ratio < 1) {
      return true;
    }
    return false;
  };

  const switchOrientation = () => {
    dispatch(
      setProductAction({
        sizeObject: getFlippedSizeObject(productRedux),
      })
    );
  };

  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>{index}. Orientace</HeadingText>}

      <OrientationWrap>
        <SingleOrientationItem
          onClick={switchOrientation}
          active={!isProductWide(productRedux)}
        >
          <IconWrap>
            <HighMock />
          </IconWrap>

          <StyledDescriptionP
            active={!isProductWide(productRedux)}
            onClick={
              isProductWide(productRedux) ? switchOrientation : undefined
            }
          >
            Na výšku
          </StyledDescriptionP>
        </SingleOrientationItem>
        <SingleOrientationItem
          onClick={switchOrientation}
          active={isProductWide(productRedux)}
        >
          <IconWrap>
            <WideMock />
          </IconWrap>

          <StyledDescriptionP
            onClick={
              !isProductWide(productRedux) ? switchOrientation : undefined
            }
            active={isProductWide(productRedux)}
          >
            Na šířku
          </StyledDescriptionP>
        </SingleOrientationItem>
      </OrientationWrap>
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
  justify-content: space-around;

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
  background-color: white;
`;

const IconWrap = styled.div`
  flex-basis: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ active }) => !active && "pointer"};

  & > div {
    color: ${color("muted")};
    box-shadow: 0 0 0 3px;
  }
`;

const WideMock = styled.div`
  height: 30px;
  width: 50px;
  color: ${({ active }) => active && color("cta_color")};
  background-color: ${color("muted")};
`;

const HighMock = styled.div`
  height: 50px;
  width: 30px;
  color: ${({ active }) => active && color("cta_color")};
  pointer-events: ${({ active }) => active && "none"};
  background-color: ${color("muted")};
`;

const StyledDescriptionP = styled.p`
  text-align: center;
  color: ${({ active }) => active && color("cta_color")};
  font-weight: ${fontWeight("regular")};
  margin: 3px 0;
`;
