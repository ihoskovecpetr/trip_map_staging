import React from "react";
import styled, { keyframes, css } from "styled-components";

const increaseKeyframes = keyframes`
  from { left: -5%; width: 5%; }
  to { left: 130%; width: 100%;}
`;

const decreaseKeyframes = keyframes`
from { left: -80%; width: 80%; }
to { left: 110%; width: 10%;}
`;

const ProgressContainer = styled.div`
  bottom: 0;
  height: 2px;
  position: absolute;
  overflow: hidden;
  width: 100%;
`;

const ProgressLine = styled.div`
  position: absolute;
  opacity: 0.4;
  background: currentColor;
  width: 150%;
  height: 5px;
`;

const ProgressSubline = styled.div`
  position: absolute;
  background: currentColor;
  height: 5px;

  animation: ${({ variant }) => {
    switch (variant) {
      case "increase":
        return css`
          ${increaseKeyframes} 2s infinite
        `;

      case "decrease":
        return css`
          ${decreaseKeyframes} 2s 0.5s infinite
        `;

      default:
        return null;
    }
  }};
`;

const UnderlineLoader = () => {
  return (
    <ProgressContainer>
      <ProgressLine />
      <ProgressSubline variant="increase" />
      <ProgressSubline variant="decrease" />
    </ProgressContainer>
  );
};

export default UnderlineLoader;
