import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { color, fontSize, fontWeight } from "utils";

import GeocoderInput from "components/GeocoderInput_new";
import { updateLocation, removeLocation } from "redux/order/actions";

const Container = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
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
`;

const StyledDeleteIcon = styled(DeleteForeverIcon)`
  flex: 1;
  font-size: 1.5rem !important;
  // border-left: 1px solid black;
  fill: red !important;
`;

const BtnsRow = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const LocLblBtn = styled.div`
  background-color: ${({ isActive }) => (isActive ? "black" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: 1px solid lightGrey;
  border-bottom-color: transparent;

  padding: 0 5px;
  font-size: ${fontSize("xs")};
  font-weight: ${fontWeight("light")};
`;

const StyledGeocoderInput = styled(GeocoderInput)``;

const InputWrap = styled.div`
  flex: 5;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 10px;
  font-size: ${fontSize("default")};
  font-weight: ${fontWeight("regular")};
  border: none;
  border-left: 1px solid lightGrey;
  border-right: 1px solid lightGrey;
  border-radius: 0px;
`;

export default function LocationLine({
  location,
  index,
  tripId,
  activeLocationId,
  setActiveLocationId,
}) {
  const dispatch = useDispatch();

  const [locationInput, setLocationInput] = useState(true);
  const [activeGeocoder, setActiveGeocoder] = useState(false);

  const setGeocoderResult = (locationObj, result) => {
    const sourceId = "SourceId_" + Math.random();
    const titleSourceId = "TitleSourceId_" + Math.random();
    const placeNameArr = result.place_name.split(",");
    const newTitle = placeNameArr[0];

    dispatch(
      updateLocation({
        ...locationObj,
        location: result.geometry.coordinates,
        sourceId: sourceId,
        title: newTitle,
        titleLabel: newTitle,
        titleLabelDisplayed: true,
        titleLocation: result.geometry.coordinates,
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
                  isActive={locationInput}
                  onClick={() => setLocationInput(true)}
                >
                  lokalita
                </LocLblBtn>
                <LocLblBtn
                  isActive={!locationInput}
                  onClick={() => setLocationInput(false)}
                >
                  popisek
                </LocLblBtn>
              </BtnsRow>
              <InputsRow>
                <StyledIconShuffle />
                {locationInput ? (
                  <StyledGeocoderInput
                    style={{
                      // display: "inline",
                      flex: 5,
                      borderLeft: "1px solid lightGrey",
                      borderRight: "1px solid lightGrey",
                      zIndex: activeLocationId === location.id ? 10 : 1,
                    }}
                    value={location.title}
                    setResult={(e) => setGeocoderResult(location, e)}
                    clearAfterResult={false}
                    onClick={() => {
                      setActiveLocationId(location.id);
                    }}
                  />
                ) : (
                  <InputWrap>
                    <StyledInput
                      // variant="outlined"
                      defaultValue={location.titleLabel}
                      onChange={updateLabel(location)}
                    />
                  </InputWrap>
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
