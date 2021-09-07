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
import ClearIcon from "@material-ui/icons/Clear";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CreateIcon from "@material-ui/icons/Create";
import TextField from "@material-ui/core/TextField";

import { color, fontWeight } from "utils";
import { useGetJourneys } from "redux/order/reducer";
import { useIsMobile } from "Hooks/useIsMobile";
import GeocoderInput from "components/GeocoderInput";
import { getMaxGroupIndex } from "LibGlobal/getMaxGroupIndex";
import { getSortedArrays } from "LibGlobal/getSortedArrays";
import { addNewJourney, removeJourneyPoint } from "redux/order/actions";

export default function StepAddRoute({ map }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const router = useRouter();
  const journeysRedux = useGetJourneys();
  const journeysRef = useRef();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentGroupRef = useRef(currentGroupIndex);

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

    dispatch(
      addNewJourney({
        index: journeysRedux.length,
        groupIndex: groupIndex,
        location: e.result.geometry.coordinates,
        sourceId: sourceId,
        title: newTitle,
        titleLocation: e.result.geometry.coordinates,
        titleSourceId,
      })
    );
  };

  const removePointRedux = (journeyPoint) => {
    dispatch(removeJourneyPoint(journeyPoint));
  };

  const sortedGroupsJourneys = getSortedArrays(journeysRedux);

  return (
    <Container>
      <HeadingText>4. Zadejte body cesty</HeadingText>

      {sortedGroupsJourneys.map((journeyGroup) => {
        return (
          <>
            <HorizontalLine />

            <StyledStepper
              activeStep={journeyGroup.length}
              orientation="vertical"
              connector={
                <span
                  style={{
                    paddingLeft: "10px",
                    marginTop: "-15px",
                    marginBottom: "-15px",
                    fontWeight: 200,
                  }}
                >
                  l
                </span>
              }
            >
              {journeyGroup.map((journeyPoint, index) => {
                return (
                  <Step key="1">
                    <StyledStepLabel>
                      <StepsText>
                        {journeyPoint.title}
                        <ClearIcon
                          style={{
                            fill: "red",
                            marginBottom: "-5px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            removePointRedux(journeyPoint);
                          }}
                        />
                      </StepsText>
                    </StyledStepLabel>
                  </Step>
                );
              })}
              {currentGroupIndex === journeyGroup[0].groupIndex ? (
                <>
                  <GeocoderInput
                    id="new_input_1"
                    map={map}
                    setResult={(e) =>
                      setGeocoderResult(currentGroupRef.current, e)
                    }
                  />
                  <HorizontalLine />
                </>
              ) : (
                <>
                  <AddCircleOutlineIcon
                    style={{
                      fill: "green",
                    }}
                    onClick={() => {
                      setCurrentGroupIndex(journeyGroup[0].groupIndex);
                    }}
                  />
                  <HorizontalLine />
                </>
              )}
            </StyledStepper>
          </>
        );
      })}

      {(journeysRedux.length === 0 ||
        sortedGroupsJourneys[sortedGroupsJourneys.length - 1][0].groupIndex <
          currentGroupIndex) && (
        <GeocoderInput
          id="new_input_1"
          placeholder="První zastávka tripu"
          map={map}
          setResult={(e) => setGeocoderResult(currentGroupRef.current, e)}
        />
      )}

      <StyledButton
        onClick={() => {
          setCurrentGroupIndex((prev) => prev + 1);
        }}
      >
        Nový trip
      </StyledButton>

      {/* <p>++ group {maxGroupIndex + 1}</p>
      <GeocoderInput
        id="new_input_2"
        map={map}
        setResult={setGeocoderResult(maxGroupIndex + 1)}
      /> */}
    </Container>
  );
}

const styles = {
  container: {
    width: "100%",
  },

  locationInput: {
    width: "100%",
    border: "1px solid",
    borderColor: "cta_color",
    borderRadius: "5px",
    marginBottom: ["210px", null, null, "10px"],

    "& div": {
      width: "100%",
      maxWidth: "100%",
    },
  },
  absoluteBtnWrap: {
    position: "fixed",
    top: ["85vh", "85vh", "85vh", "90vh"],
    left: "0px",
    height: 0,
    width: ["100%", "100%", "100%", "40%", "30%"],
  },
};

const Container = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 50px;
  letter-spacing: 1.1px;
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const HorizontalLine = styled.p`
  background-color: ${color("muted")};
  height: 1px;
  width: 100%;
`;

const StyledStepper = styled(Stepper)`
  background-color: transparent !important;
  padding: 0px !important;
`;

const StepsText = styled.p`
  color: ${color("primary")};
  font-weight: ${fontWeight("regular")};
  letter-spacing: 1.2px;
  font-size: 14px;
  transform: translateX(0);
  display: inline-block;
  line-height: 145%;
  width: 100%;
  display: flex;
  justify-content: space-between;
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
    text {
      fill: white !important;
    }
  }
`;

const StyledButton = styled(Button)`
  color: white !important;
  background-color: ${color("cta_color")} !important;
  text-transform: unset !important;
`;
