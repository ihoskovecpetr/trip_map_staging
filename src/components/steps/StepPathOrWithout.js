/** @jsx jsx */
import { jsx } from "theme-ui";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { color, mobile, fontWeight } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import { getBbox } from "LibGlobal/getBbox";
import WithPath from "assets/mapStudioVariants/withPath.png";
import NoPath from "assets/mapStudioVariants/noPath.png";

import { setJourneysIsEnabled } from "redux/order/actions";
import {
  useGetJourneysDraggable,
  useJourneysEnabledSelector,
} from "redux/order/reducer";

export default function StepPathOrWithout({ map, index }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const journeysDragable = useGetJourneysDraggable();

  console.log({ journeysDragable });

  const isJourneysEnabled = useJourneysEnabledSelector();
  const bbox = getBbox(journeysDragable);

  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>{index}. Vyberte variantu mapy</HeadingText>}
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
            map.fitBounds(bbox, { padding: 80 });
          }}
          active={isJourneysEnabled}
        >
          <ItemHeading active={isJourneysEnabled}>
            Mapa s trasou a body
          </ItemHeading>
          <StyledImg active={isJourneysEnabled} src={WithPath} />
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
  letter-spacing: 1.1px;
  margin: 0;
  margin-bottom: 10px;

  ${mobile`
    margin-top: 20px;
  `};
`;

const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
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
