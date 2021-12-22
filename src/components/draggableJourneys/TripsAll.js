import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import TripSingle from "./TripSingle";
import { color, fontSize, mobile } from "utils";
import { useGetJourneysDraggable } from "redux/order/reducer";

import {
  updateLocationSequence,
  addTrip,
  removeAllLocations,
} from "redux/order/actions";

export default function TripsAll({ map }) {
  const dispatch = useDispatch();
  const journeysDraggable = useGetJourneysDraggable();
  const [activeTripId, setActiveTripId] = useState();
  const [activeLocationId, setActiveLocationId] = useState();
  // journeysDraggable?.tripsOrder[0]

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(updateLocationSequence(result));
  };

  return (
    <>
      <BtnWrap
        onClick={() => {
          dispatch(addTrip());
        }}
      >
        <AddIcon
          style={{
            fill: "green",
          }}
        >
          Nová cesta
        </AddIcon>
        {/* Nová cesta / Nový bod
          </StyledAddCircleOutlineIcon> */}

        {/* <StyledButtonDelAll
          onClick={() => {
            dispatch(removeAllLocations());
          }}
        >
          <StyledDeleteForeverIcon
            style={{
              fill: "rgba(242, 73, 73,1)",
            }}
          />
          Smazat vše
        </StyledButtonDelAll> */}
      </BtnWrap>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragEnd}>
        {journeysDraggable?.tripsOrder?.map((tripId) => {
          const tripObj = journeysDraggable?.trips[tripId];
          const locations = tripObj.locationIds.map(
            (taskId) => journeysDraggable?.locations[taskId]
          );

          console.log({ tripObj });

          return (
            <TripSingle
              key={tripObj.id}
              tripObj={tripObj}
              locations={locations}
              map={map}
              isTripActive={activeTripId === tripObj.id}
              setActiveTripId={setActiveTripId}
              activeLocationId={activeLocationId}
              setActiveLocationId={setActiveLocationId}
            />
          );
        })}
      </DragDropContext>
    </>
  );
}

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  cursor: pointer;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid green;
  margin: 25px 0 !important;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  color: ${color("heading_secondary")} !important;
  border: 1px solid ${color("heading_secondary")} !important;
  text-transform: unset !important;
  margin-bottom: 0px !important;
  padding: 2px 3px !important;
  font-size: ${fontSize("xs")} !important;

  ${mobile`
    margin-bottom: 20px !important;
  `};
`;

const StyledButtonDelAll = styled(Button)`
  color: rgba(242, 73, 73, 1) !important;
  text-transform: unset !important;
  margin-bottom: 0px !important;
  border: 1px solid rgba(242, 73, 73, 1) !important;
  padding: 2px 3px !important;
  background-color: white !important;
  font-size: ${fontSize("xs")} !important;

  ${mobile`
    margin-bottom: 20px !important;
  `}
`;

const StyledDeleteForeverIcon = styled(DeleteForeverIcon)`
  margin-left: 5px;
`;
