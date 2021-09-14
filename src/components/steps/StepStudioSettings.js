/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx } from "theme-ui";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";

import { color } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import { getBbox } from "LibGlobal/getBbox";
import WithPath from "assets/mapStudioVariants/withPath.png";
import NoPath from "assets/mapStudioVariants/noPath.png";

import { setJourneysIsEnabled } from "redux/order/actions";
import {
  useGetJourneys,
  useJourneysEnabledSelector,
} from "redux/order/reducer";

export default function StepStudioSettings({ map, index }) {
  const dispatch = useDispatch();
  const reduxJourneys = useGetJourneys();
  const isJourneysEnabled = useJourneysEnabledSelector();
  const bbox = getBbox(reduxJourneys);

  return (
    <div sx={styles.container}>
      <HeadingText>{index}. Vyberte variantu mapy</HeadingText>
      <OptionContainer>
        <OptionItem
          onClick={() => {
            dispatch(setJourneysIsEnabled(false));
          }}
        >
          <StyledImg active={!isJourneysEnabled} src={NoPath} />
          <ItemHeading active={!isJourneysEnabled}>
            Mapa bez trasování
          </ItemHeading>
        </OptionItem>
        <OptionItem
          onClick={() => {
            dispatch(setJourneysIsEnabled(true));
            map.fitBounds(bbox, { padding: 50 });
          }}
        >
          <StyledImg active={isJourneysEnabled} src={WithPath} />
          <ItemHeading active={isJourneysEnabled}>
            Mapa s trasováním a vlastními body
          </ItemHeading>
        </OptionItem>
      </OptionContainer>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },
};

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const OptionItem = styled.div`
  width: 150px;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ItemHeading = styled.p`
  color: ${color("muted")};
  border-radius: 3px;
  box-shadow: 0px 0px 0px 1px;
  color: ${({ active }) => active && color("cta_color")};
  margin-top: 5px;
  padding: 5px;
`;

const StyledImg = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 3px;
  box-shadow: 0px 0px 0px 1px;
  color: ${({ active }) => active && color("cta_color")};
`;
