import React, { useState } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import LocationLine from "./LocationLine";
import GeocoderInput from "components/GeocoderInput_new";

import { addNewLocationDraggable } from "redux/order/actions";
import { color } from "utils";

const Container = styled.div``;

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
  activeLocationId,
  setActiveLocationId,
}) {
  const dispatch = useDispatch();

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
              style={{
                display: "inline",
                width: "50%",
                flex: 4,
                zIndex: activeLocationId === tripObj.id + "_new_geo" ? 10 : 1,
              }}
              placeholder={"Další bod tripu"}
              setResult={(e) => setGeocoderResult(tripObj.id, e)}
              focusCallback={(e) => {
                console.log("Focus_new_geo", { id: tripObj.id + "_new_geo" });
                setActiveLocationId(tripObj.id + "_new_geo");
              }}
            />
          )}
        </Flex2>
        <Flex3></Flex3>
      </NewLocationContainer>
      <HorizontalLine />
    </Container>
  );
}
