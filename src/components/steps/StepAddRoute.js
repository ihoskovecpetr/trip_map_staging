/** @jsx jsx */
import { useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import DragContainer from "components/draggableJourneys/TripsAll";

import { mobile } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";

export default function StepAddRoute({ map, index }) {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    map?.on("error", function (e) {
      console.log({ ErrorMap: e });
    });

    map?.on("load", function () {});
  }, [map]);

  return (
    <Container>
      {!isMobile && <HeadingText>{index}. Zadejte body cesty</HeadingText>}

      <DragContainer map={map} />
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 50px;
  width: 100%;
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 0;
  letter-spacing: 1.1px;

  ${mobile`
    margin-top: 20px;
  `}
`;
