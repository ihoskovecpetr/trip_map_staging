/** @jsx jsx */
import { useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";

import DragContainer from "components/draggableJourneys/TripsAll";
import { useIsMobile } from "Hooks/useIsMobile";
import HeadingText from "./atoms/HeadingText";
import StepContainer from "./atoms/StepContainer";

export default function StepJourneys({ map, index }) {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    map?.on("error", function (e) {
      console.log({ ErrorMap: e });
    });

    map?.on("load", function () {});
  }, [map]);

  return (
    <StepContainer isMobile={isMobile} isSolidBg={isMobile ? true : false}>
      <HeadingText isMobile={isMobile}>{index}. Zadejte body cesty</HeadingText>

      <DragContainer map={map} />
      <ExtraSpace />
    </StepContainer>
  );
}

const ExtraSpace = styled.div`
  padding-bottom: ${({ isMobile }) => (isMobile ? "220px" : "50px")};
`;
