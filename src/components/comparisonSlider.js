import { ComparisonSlider } from "react-comparison-slider";
import styled from "styled-components";

import LowDefinitionMap from "assets/mapDefinition/low-definition-map.png";
import HighDefinitionMap from "assets/mapDefinition/high-definition-map.png";

export const CustomComparisonSlider = () => {
  return (
    <ComparisonSlider
      defaultValue={50}
      itemOne={<StyledImg src={LowDefinitionMap} />}
      itemTwo={<StyledImg src={HighDefinitionMap} />}
      aspectRatio={16 / 9}
      orientation="horizontal"
    />
  );
};

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
`;
