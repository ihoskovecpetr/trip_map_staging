/** @jsx jsx */
import { jsx } from "theme-ui";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { color, fontWeight } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import { getBbox } from "LibGlobal/getBbox";
import WithPath from "assets/mapStudioVariants/withPath.png";
import NoPath from "assets/mapStudioVariants/noPath.png";
import HeadingText from "./atoms/HeadingText";
import { setJourneysIsEnabled } from "redux/order/actions";
import StepContainer from "./atoms/StepContainer";

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
          <ItemHeading active={!isJourneysEnabled}>Mapa bez trasy</ItemHeading>
          <StyledImg active={!isJourneysEnabled} src={NoPath} />
        </OptionItem>
        <OptionItem
          onClick={() => {
            dispatch(setJourneysIsEnabled(true));
            map.fitBounds(bbox, { padding: 100 });
          }}
          active={isJourneysEnabled}
        >
          <ItemHeading active={isJourneysEnabled}>
            Mapa s trasou a body
          </ItemHeading>
          <StyledImg active={isJourneysEnabled} src={WithPath} />
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
  justify-content: space-around;
  padding-bottom: 10px;
`;

const OptionItem = styled.div`
  width: 160px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ active }) => active && "white"};
  // border-top-left-radius: 10px;
  // border-top-right-radius: 10px;

  box-shadow: ${({ active }) =>
    active ? "0px 0px 0px 1px" : "0px 0px 0px 0px"};
  color: ${({ active }) => active && color("cta_color")};
`;

const ItemHeading = styled.p`
  color: ${({ active }) => (active ? color("primary") : color("muted"))};
  line-height: 1.2;
  font-size: 0.8rem;
  font-weight: ${fontWeight("bold")};
  padding-bottom: 5px;
  margin: 0;
`;

const StyledImg = styled.img`
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 3px;
  color: ${color("muted")};
`;
// box-shadow: ${({ active }) =>
//   active ? "0px 0px 0px 3px" : "0px 0px 0px 1px"};
// color: ${({ active }) => active && color("cta_color")};
