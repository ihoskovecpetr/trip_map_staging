import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Location from "./LocationLine";
import GeocoderInput from "components/GeocoderInput";

import { addNewLocationDraggable } from "redux/order/actions";
import { color } from "utils";

const Container = styled.div`
  // margin: 8px;
`;

const HorizontalLine = styled.p`
  background-color: ${color("muted")};
  height: 2px;
  width: 100%;
  margin: 5px 0;
`;

const NewLocationContainer = styled.div`
  display: flex;
`;

const Flex1 = styled.div`
  flex: 1;
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
`;

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  cursor: pointer;
`;

const LocationsList = styled.div``;

export default function TripSingle({
  tripObj,
  locations,
  map,
  isTripActive,
  setActiveTripId,
  updatingLocationId,
  setUpdatingLocationId,
}) {
  const dispatch = useDispatch();

  const setGeocoderResult = (tripId, e) => {
    const sourceId = "SourceId_" + Math.random();
    const titleSourceId = "TitleSourceId_" + Math.random();
    const placeNameArr = e.result.place_name.split(",");
    const newTitle = placeNameArr[0];

    dispatch(
      addNewLocationDraggable({
        body: {
          location: e.result.geometry.coordinates,
          sourceId: sourceId,
          titleSourceId: titleSourceId,
          title: newTitle,
          titleLabel: newTitle,
          titleLabelDisplayed: true,
          titleLocation: e.result.geometry.coordinates,
        },
        tripId: tripId,
      })
    );
  };

  const activateNewLocationGeoInput = (tripId) => {
    setActiveTripId(tripId);
    setUpdatingLocationId(null);
  };

  const handleUpdatingLocationId = (locID) => {
    setUpdatingLocationId(locID);
    setActiveTripId(null);
  };

  return (
    <Container>
      <Droppable droppableId={tripObj.id}>
        {(provided) => (
          <LocationsList ref={provided.innerRef} {...provided.droppableProps}>
            {locations.map((location, index) => (
              <Location
                key={location.id}
                location={location}
                index={index}
                tripId={tripObj.id}
                updatingLocationId={updatingLocationId}
                setUpdatingLocationId={handleUpdatingLocationId}
              />
            ))}
            {provided.placeholder}
          </LocationsList>
        )}
      </Droppable>
      <NewLocationContainer>
        <Flex1>
          <StyledAddCircleOutlineIcon
            onClick={() =>
              !isTripActive && activateNewLocationGeoInput(tripObj.id)
            }
            style={{
              fill: isTripActive ? "grey" : "green",
            }}
          />
        </Flex1>
        <Flex2>
          {isTripActive && (
            <GeocoderInput
              map={map}
              style={{ display: "inline", width: "50%", flex: 4 }}
              placeholder={"Další bod tripu"}
              setResult={(e) => setGeocoderResult(tripObj.id, e)}
            />
          )}
        </Flex2>
        <Flex3></Flex3>
      </NewLocationContainer>
      <HorizontalLine />
      {/* <HorizontalLine /> */}
    </Container>
  );
}
