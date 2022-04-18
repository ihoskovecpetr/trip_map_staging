import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import TripSingle from "./TripSingle";
import { color, fontSize, mobile } from "utils";
import { useTranslation } from "Hooks/useTranslation";

import {
  useGetJourneysDraggable,
  useMaxTripIdSelector,
  useNumberOfEmptyTripsSelector,
} from "redux/order/reducer";

import {
  updateLocationSequence,
  addTrip,
  addEmptyTrip,
  removeAllLocations,
} from "redux/order/actions";

export default function TripsAll({ map }) {
  const dispatch = useDispatch();
  const journeysDraggable = useGetJourneysDraggable();
  const [activeTripId, setActiveTripId] = useState();
  const [activeLocationId, setActiveLocationId] = useState();
  const t = useTranslation();

  const maxTripIdString = useMaxTripIdSelector();
  const numberOfEmptyTrips = useNumberOfEmptyTripsSelector();
  // journeysDraggable?.tripsOrder[0]

  const onDragEnd = (result) => {
    console.log("onDragEndResult", { result });
    // if (
    //   result?.destination?.droppableId === maxTripIdString &&
    //   result?.destination?.index === 0
    // ) {
    //   dispatch(addEmptyTrip());
    // }
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

  const onDragStart = (result) => {
    console.log("onDragStart", { result });

    onDragEnd(result);
  };

  useEffect(() => {
    if (!numberOfEmptyTrips) {
      dispatch(addEmptyTrip());
    }
  }, [numberOfEmptyTrips]);

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
        />
      </BtnWrap>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {journeysDraggable?.tripsOrder?.map((tripId) => {
          const tripObj = journeysDraggable?.trips[tripId];
          const locations = tripObj.locationIds.map(
            (taskId) => journeysDraggable?.locations[taskId]
          );

          if (!locations.length) {
            return (
              <Droppable droppableId={tripObj.id}>
                {(provided) => (
                  <EmptyJourneyContainer ref={provided.innerRef}>
                    {t("steps.splitText")}
                  </EmptyJourneyContainer>
                )}
              </Droppable>
            );
          }

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

const EmptyJourneyContainer = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px dashed grey;
  text-align: center;
  margin-bottom: 10px;
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
