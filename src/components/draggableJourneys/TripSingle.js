import React, { useState } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import LocationLine from "./LocationLine";
import GeocoderInput from "components/GeocoderInput_new";

import { addNewLocationDraggable } from "redux/order/actions";
import { color } from "utils";

const Container = styled.div``;

const HorizontalLine = styled.p`
  // background-color: ${color("muted")};
  // height: 1px;
  // width: 100%;
  margin-bottom: 20px;
`;

const NewLocationContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: ${({ isTripActive }) => isTripActive && "30px"};
  top: ${({ isTripActive }) => isTripActive && "-5px"};
`;

const Flex1 = styled.div`
  flex: 1;
  flex-basis: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Flex2 = styled.div`
  flex: 5;
  display: flex;
`;
const Flex3 = styled.div`
  flex: 1;
  flex-basis: 30px;
`;

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  cursor: pointer;
  position: relative;
  top: ${({ isTripActive }) => !isTripActive && "-10px"};
`;

const LocationsList = styled.div``;

export default function TripSingle({
  tripObj,
  locations,
  map,
  isTripActive,
  setActiveTripId,
  activeLocationId,
  setActiveLocationId,
}) {
  const dispatch = useDispatch();
  const [thisActiveNewInput, setThisActiveNewInput] = useState(false);

  const setGeocoderResult = (tripId, result) => {
    const sourceId = "SourceId_" + Math.random();
    const titleSourceId = "TitleSourceId_" + Math.random();
    const placeNameArr = result.place_name.split(",");
    const newTitle = placeNameArr[0];

    dispatch(
      addNewLocationDraggable({
        body: {
          location: result.geometry.coordinates,
          sourceId: sourceId,
          titleSourceId: titleSourceId,
          title: newTitle,
          titleLabel: newTitle,
          titleLabelDisplayed: true,
          titleLocation: result.geometry.coordinates,
        },
        tripId: tripId,
      })
    );
  };

  const activateNewLocationGeoInput = (tripId) => {
    setActiveTripId(tripId);
    setActiveLocationId(null);
  };

  return (
    <Container>
      <Droppable droppableId={tripObj.id}>
        {(provided) => (
          <LocationsList ref={provided.innerRef} {...provided.droppableProps}>
            {locations.map((location, index) => (
              <LocationLine
                key={location.id}
                location={location}
                index={index}
                tripId={tripObj.id}
                activeLocationId={activeLocationId}
                setActiveLocationId={setActiveLocationId}
              />
            ))}
            {provided.placeholder}
          </LocationsList>
        )}
      </Droppable>
      <NewLocationContainer isTripActive={isTripActive}>
        <Flex1>
          {isTripActive ? (
            <ArrowForwardIcon
              style={{
                fill: isTripActive ? "green" : "green",
              }}
            />
          ) : (
            <StyledAddCircleOutlineIcon
              onClick={() =>
                !isTripActive && activateNewLocationGeoInput(tripObj.id)
              }
              style={{
                fill: isTripActive ? "green" : "green",
              }}
              isTripActive={isTripActive}
            />
          )}
        </Flex1>

        {isTripActive && (
          <>
            <Flex2>
              <GeocoderInput
                map={map}
                style={{
                  display: "inline",
                  flex: 5,
                  zIndex: thisActiveNewInput ? 11 : "unset",
                }}
                inputStyle={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 5px grey",
                }}
                placeholder={"Další bod tripu"}
                setResult={(e) => setGeocoderResult(tripObj.id, e)}
                clearOnFocus
                onClick={() => {
                  setThisActiveNewInput(true);
                }}
                onBlur={() => {
                  console.log("BLUUR");
                  setThisActiveNewInput(false);
                }}
              />
            </Flex2>
            <Flex3></Flex3>
          </>
        )}
      </NewLocationContainer>
      <HorizontalLine />
    </Container>
  );
}
