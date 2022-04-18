/** @jsx jsx */
import { useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";

import TripsAll from "components/draggableJourneys/TripsAll";
import { useIsMobile } from "Hooks/useIsMobile";
import HeadingText from "./atoms/HeadingText";
import StepContainer from "./atoms/StepContainer";
import { TAB_STEPS } from "@constants";
import { useTranslation } from "Hooks/useTranslation";

export default function StepJourneys({ map, index }) {
  const { isMobile } = useIsMobile();
  const t = useTranslation();

  useEffect(() => {
    map?.on("error", function (e) {
      console.log({ ErrorMap: e });
    });

    map?.on("load", function () {});
  }, [map]);

  return (
    <StepContainer isMobile={isMobile} isSolidBg={isMobile ? true : false}>
      <HeadingText isMobile={isMobile}>
        {index}. {t(TAB_STEPS[index].full)}
      </HeadingText>

      <TripsAll map={map} />
      <ExtraSpace isMobile={isMobile} />
    </StepContainer>
  );
}

const ExtraSpace = styled.div`
  padding-bottom: ${({ isMobile }) => (isMobile ? "220px" : "50px")};
`;
