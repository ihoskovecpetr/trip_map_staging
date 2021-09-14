/** @jsx jsx */
import { useEffect, useState, useRef, useCallback } from "react";
import { jsx } from "theme-ui";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CreateIcon from "@material-ui/icons/Create";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { color, fontSize, fontWeight, mobile } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import GeocoderInput from "components/GeocoderInput";
import { getMaxGroupIndex } from "LibGlobal/getMaxGroupIndex";
import { getSortedArrays } from "LibGlobal/getSortedArrays";
import { MAP_STYLED_AND_FLIGHT_COLOR } from "constants/constants";

import {
  addNewJourney,
  removeJourneyPoint,
  updateJourneyPoint,
} from "redux/order/actions";

import { useGetJourneys, useActiveMapStyleSelector } from "redux/order/reducer";

export default function StepAddRoute({ map, index }) {
  const [updatingSourceId, setUpdatingSourceId] = useState();
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const router = useRouter();
  const journeysRedux = useGetJourneys();
  const journeysRef = useRef();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentGroupRef = useRef(currentGroupIndex);
  const activeMapStyleName = useActiveMapStyleSelector();

  useEffect(() => {
    currentGroupRef.current = currentGroupIndex;
  }, [currentGroupIndex]);

  useEffect(() => {
    map?.on("error", function (e) {
      console.log({ ErrorMap: e });
    });

    map?.on("load", function () {});
  }, [map]);

  useEffect(() => {
    journeysRef.current = journeysRedux;

    const maxGroupIndex = getMaxGroupIndex(journeysRedux ?? []);
    setCurrentGroupIndex(maxGroupIndex);

    if (!map) {
      return;
    }
  }, [journeysRedux]);

  const setGeocoderResult = (groupIndex, e) => {
    const sourceId = "SourceId_" + Math.random();
    const titleSourceId = "TitleSourceId_" + Math.random();
    const placeNameArr = e.result.place_name.split(",");
    const newTitle = placeNameArr[0];

    const indexesArr = journeysRedux.map(({ index }) => index);
    console.log({ indexesArr });
    const max = Math.max(...indexesArr);

    console.log({ maxIndex: max });
    dispatch(
      addNewJourney({
        index: max + 1,
        groupIndex: groupIndex,
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

  const removePointRedux = (journeyPoint) => {
    dispatch(removeJourneyPoint(journeyPoint));
  };

  const toggleLabelVisibility = (journeyPoint) => {
    dispatch(
      updateJourneyPoint({
        ...journeyPoint,
        titleLabelDisplayed: !journeyPoint.titleLabelDisplayed,
      })
    );
  };

  const updateLabel = (journeyPoint) => (e) => {
    console.log("Value__ ", e.target.value);
    dispatch(
      updateJourneyPoint({
        ...journeyPoint,
        titleLabel: e.target.value,
      })
    );
  };

  const sortedGroupsJourneys = getSortedArrays(journeysRedux);

  return (
    <Container>
      <HeadingText>{index}. Zadejte body cesty</HeadingText>

      <StyledButton
        onClick={() => {
          setCurrentGroupIndex((prev) => prev + 1);
        }}
      >
        <AddIcon />
        Nová cesta / Nový bod
      </StyledButton>

      {(journeysRedux.length === 0 ||
        sortedGroupsJourneys[0][0].groupIndex < currentGroupIndex) && (
        <>
          <HorizontalLine />
          <HorizontalLine />
          <NewTripWrap>
            <CheckCircleIcon />
            <GeocoderInput
              id="new_input_1"
              placeholder="První zastávka tripu"
              style={{ margin: "5px 0" }}
              map={map}
              setResult={(e) => setGeocoderResult(currentGroupRef.current, e)}
            />
          </NewTripWrap>
        </>
      )}

      {sortedGroupsJourneys.map((journeyGroup) => {
        const isNewestActiveGroup =
          currentGroupIndex === journeyGroup[0].groupIndex;
        return (
          <>
            <HorizontalLine /> <HorizontalLine />
            <PlusGeoWrap>
              <AddCircleOutlineIcon
                style={{
                  fill: isNewestActiveGroup ? "grey" : "green",
                  margin: "7px 0",
                }}
                onClick={() => {
                  setCurrentGroupIndex(journeyGroup[0].groupIndex);
                }}
              />
              {isNewestActiveGroup && (
                <GeocoderInput
                  id="new_input_1"
                  map={map}
                  style={{ display: "inline-block", marginLeft: "10px" }}
                  placeholder={"Další bod cesty"}
                  setResult={(e) =>
                    setGeocoderResult(currentGroupRef.current, e)
                  }
                />
              )}
            </PlusGeoWrap>
            <StyledStepper
              activeStep={journeyGroup.length}
              orientation="vertical"
              connector={
                <StepperConnector
                  color={
                    MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName].colorMain
                  }
                >
                  |
                </StepperConnector>
              }
            >
              {journeyGroup.map((journeyPoint, index) => {
                return (
                  <Step key="1">
                    <StyledStepLabel
                      color={
                        MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName]
                          .colorMain
                      }
                    >
                      <StepsWrap>
                        <div>
                          <LocationTitle>
                            poloha: {journeyPoint.title}
                          </LocationTitle>
                          {updatingSourceId === journeyPoint.sourceId ? (
                            <>
                              <TextField
                                value={journeyPoint.titleLabel}
                                onChange={updateLabel(journeyPoint)}
                              />
                              <DoneIcon
                                style={{
                                  fill: "green",
                                  cursor: "pointer",
                                }}
                                onClick={() => setUpdatingSourceId("")}
                              />
                            </>
                          ) : (
                            <FlexCenterWrap>
                              <SmallText>popisek: </SmallText>
                              <LabelText
                                crossed={!journeyPoint.titleLabelDisplayed}
                              >
                                {journeyPoint.titleLabel}
                              </LabelText>
                              <StyledCreateIcon
                                onClick={() =>
                                  setUpdatingSourceId(journeyPoint.sourceId)
                                }
                              />
                              {journeyPoint.titleLabelDisplayed ? (
                                <VisibilityIcon
                                  onClick={() => {
                                    toggleLabelVisibility(journeyPoint);
                                  }}
                                  style={{
                                    cursor: "pointer",
                                  }}
                                />
                              ) : (
                                <VisibilityOffIcon
                                  style={{
                                    fill: "grey",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    toggleLabelVisibility(journeyPoint);
                                  }}
                                />
                              )}
                            </FlexCenterWrap>
                          )}
                        </div>

                        <Flex1 />
                        <StyledDeleteForeverIcon
                          style={{
                            fill: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            removePointRedux(journeyPoint);
                          }}
                        />
                      </StepsWrap>
                    </StyledStepLabel>
                  </Step>
                );
              })}
            </StyledStepper>
          </>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 50px;
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 0;
  letter-spacing: 1.1px;

  ${mobile`
    margin-top: 20px;
  `}
`;

const HorizontalLine = styled.p`
  background-color: ${color("muted")};
  height: 1px;
  width: 100%;
  margin: 5px 0;
`;

const StyledStepper = styled(Stepper)`
  background-color: transparent !important;
  padding: 0px !important;
`;

const PlusGeoWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const NewTripWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StepsWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StepperConnector = styled.span`
  padding-left: 9px;
  margin-top: -15px;
  margin-bottom: -15px;
  font-weight: ${fontWeight("bold")};
  color: ${({ color }) => color}};
  text-align: start;
  width: 20px;
`;

const LocationTitle = styled.p`
  color: ${color("muted")};
  font-size: ${fontSize("xxs")};
  width: 100%;
  margin: 0;
  margin-top: 15px;
  text-align: left;
`;

const SmallText = styled.span`
  color: ${color("muted")};
  font-size: ${fontSize("xxs")};
  display: inline-block;
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

const LabelText = styled.span`
  font-size: ${fontSize("sm")};
  display: inline-block;
  text-decoration: ${({ crossed }) => crossed && "line-through 2px"};
`;

const StyledStepLabel = styled(StepLabel)`
  .MuiStepIcon-active {
    color: ${color("secondary")} !important;
    text {
      fill: white !important;
    }
  }
  .MuiStepIcon-completed {
    color: ${color("cta_color")} !important;
    color: ${({ color }) => color} !important;
    text {
      fill: white !important;
    }
  }
`;

const StyledButton = styled(Button)`
  color: white !important;
  background-color: ${color("heading_secondary")} !important;
  text-transform: unset !important;
  margin-bottom: 0px !important;

  ${mobile`
    margin-bottom: 20px !important;
  `}
`;

const Flex1 = styled.div`
  flex: 1;
`;

const StyledDeleteForeverIcon = styled(DeleteForeverIcon)`
  margin-left: 5px;
`;

const FlexCenterWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCreateIcon = styled(CreateIcon)`
  cursor: pointer !important;
  width: 0.8em !important;
  height: 0.8em !important;
  margin: 0 5px !important;
`;
