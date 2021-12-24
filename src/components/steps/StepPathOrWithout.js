/** @jsx jsx */
import { jsx } from "theme-ui";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { color, fontWeight } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import { getBbox } from "LibGlobal/getBbox";
import HeadingText from "./atoms/HeadingText";
import { setJourneysIsEnabled } from "redux/order/actions";
import StepContainer from "./atoms/StepContainer";

import WithPath from "assets/mapStudioVariants/withPath.png";
import NoPath from "assets/mapStudioVariants/noPath.png";

import {
  useGetJourneysDraggable,
  useJourneysEnabledSelector,
} from "redux/order/reducer";

export default function StepPathOrWithout({ map, index }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const journeysDragable = useGetJourneysDraggable();

  const isJourneysEnabled = useJourneysEnabledSelector();

  const bbox = getBbox(journeysDragable);
  console.log({ journeysDragable, bbox });

  const noPathUrl =
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_200,c_scale/Finished%20Interiers/noPath_new_imnjzu.png";

  const withPathUrl =
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_200,c_scale/Finished%20Interiers/withPath_new_pmebpp.png";

  return (
    <StepContainer isMobile={isMobile}>
      <HeadingText isMobile={isMobile}>
        {index}. Vyberte variantu mapy
      </HeadingText>
      <OptionContainer>
        <OptionItem
          onClick={() => {
            dispatch(setJourneysIsEnabled(false));
          }}
          active={!isJourneysEnabled}
        >
          <StyledImg active={!isJourneysEnabled} src={noPathUrl} />
          <ItemHeading active={!isJourneysEnabled}>Mapa bez trasy</ItemHeading>
        </OptionItem>
        <OptionItem
          onClick={() => {
            dispatch(setJourneysIsEnabled(true));
            map.fitBounds(bbox, { padding: 100 });
          }}
          active={isJourneysEnabled}
        >
          <StyledImg active={isJourneysEnabled} src={withPathUrl} />
          <ItemHeading active={isJourneysEnabled}>
            Mapa s trasou a body
          </ItemHeading>
        </OptionItem>
      </OptionContainer>
    </StepContainer>
  );
}

const styles = {
  container: {
    width: "100%",
    paddingTop: "10px",
  },
};

const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 2px;
`;

const OptionItem = styled.div`
  flex: 1;
  cursor: pointer;
  display: flex;
  padding: 5px;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ active }) => "white"};
  box-shadow: ${({ active }) =>
    active ? "0px 0px 0px 1px" : "0px 0px 0px 1px"};
  color: ${({ active }) => (active ? color("cta_color") : "lightGrey")};
`;

const ItemHeading = styled.p`
  color: ${({ active }) => (active ? color("primary") : color("muted"))};
  line-height: 1.2;
  font-size: 0.8rem;
  font-weight: ${fontWeight("bold")};
  padding-top: 5px;
  margin: 0;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 3px;
  color: ${color("muted")};
`;
// box-shadow: ${({ active }) =>
//   active ? "0px 0px 0px 3px" : "0px 0px 0px 1px"};
// color: ${({ active }) => active && color("cta_color")};
