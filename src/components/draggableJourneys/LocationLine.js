import React, { useRef } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { color, fontSize, fontWeight } from "utils";

import GeocoderInput from "components/GeocoderInput";
import { updateLocation, removeLocation } from "redux/order/actions";

const Container = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

const BtnsRow = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const InputsRow = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 4px lightGrey;
  border-radius: 5px;
`;

const IconColumn = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 5px;
`;

const StyledIconShuffle = styled(CompareArrowsIcon)`
  flex: 1;
  transform: rotate(90deg);
  font-size: 1.5rem !important;
  // border-top: 1px solid black;
`;

const StyledDeleteIcon = styled(DeleteForeverIcon)`
  flex: 1;
  font-size: 1.5rem !important;
  border-left: 1px solid black;
  fill: red !important;
`;

const LocLblBtn = styled.div`
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: 1px solid black;

  padding: 0 5px;
  font-size: ${fontSize("xs")};
  font-weight: ${fontWeight("bold")};
`;

const StyledGeocoderInput = styled(GeocoderInput)`
  div {
    width: undefined !important;
    border: 2px solid pink !important;
  }
  input {
    // border: 1px solid ${color("cta_color")};
    // border-radius: 5px;
  }
  & :nth-child(0) {
    width: undefined !important;
    border: 2px solid pink;
  }
`;

const StyledInput = styled.input`
  background-color: white !important;
  flex: 5;
  border: none;
  margin: 7px -5px;
  padding: 4px 5px;
  font-size: ${fontSize("sm")};
  font-weight: ${fontWeight("bold")};
  border-left: 1px solid black;
  border-radius: 0px;
`;

export default function Location({
  location,
  index,
  tripId,
  updatingLocationId,
  setUpdatingLocationId,
}) {
  const dispatch = useDispatch();

  const setGeocoderResult = (locationObj, e) => {
    const sourceId = "SourceId_" + Math.random();
    const titleSourceId = "TitleSourceId_" + Math.random();
    const placeNameArr = e.result.place_name.split(",");
    const newTitle = placeNameArr[0];

    dispatch(
      updateLocation({
        ...locationObj,
        location: e.result.geometry.coordinates,
        sourceId: sourceId,
        title: newTitle,
        titleLabel: newTitle,
        titleLabelDisplayed: true,
        titleLocation: e.result.geometry.coordinates,
        titleSourceId,
      })
    );
  };

  const updateLabel = (locationObj) => (e) => {
    dispatch(
      updateLocation({
        ...locationObj,
        titleLabel: e.target.value,
      })
    );
  };

  const removeThisLocation = (locationId, tripId) => () => {
    dispatch(removeLocation({ locationId, tripId }));
  };

  const isThisLocalityBeingUpdated = updatingLocationId === location.id;

  return (
    <Draggable draggableId={location.id} index={index}>
      {(provided) => {
        return (
          <>
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <BtnsRow>
                <LocLblBtn
                  isActive={isThisLocalityBeingUpdated}
                  onClick={() => setUpdatingLocationId(location.id)}
                >
                  lokalita
                </LocLblBtn>
                <LocLblBtn
                  isActive={updatingLocationId != location.id}
                  onClick={() => setUpdatingLocationId(null)}
                >
                  popisek
                </LocLblBtn>
              </BtnsRow>
              <InputsRow>
                <StyledIconShuffle />
                {isThisLocalityBeingUpdated ? (
                  <StyledGeocoderInput
                    style={{
                      display: "inline",
                      flex: 5,
                      div: { background: "red" },
                    }}
                    value={location.title}
                    setResult={(e) => setGeocoderResult(location, e)}
                    clearAfterResult={false}
                  />
                ) : (
                  <StyledInput
                    // variant="outlined"
                    defaultValue={location.titleLabel}
                    onChange={updateLabel(location)}
                  />
                )}
                <StyledDeleteIcon
                  onClick={() =>
                    dispatch(removeThisLocation(location.id, tripId))
                  }
                />
              </InputsRow>
            </Container>
          </>
        );
      }}
    </Draggable>
  );
}
