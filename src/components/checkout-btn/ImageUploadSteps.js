/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import Lightbox from "react-image-lightbox";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import { color, fontWeight, mobile, font } from "utils";
import UploadPercentageString from "./UploadPercentageString";
import UnderlineLoader from "components/UnderlineLoader";

export default function ImageUploadSteps({
  isUploadPending,
  imageBase64Created,
  fileSizeMB,
  lightbox,
  setLightbox,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [designDisplayed, setDesignDisplayed] = useState(false);

  useEffect(() => {
    if (imageBase64Created) {
      setActiveStep(1);
      setTimeout(() => {
        setLightbox({
          open: true,
          activeSrc: imageBase64Created,
        });
        setDesignDisplayed(true);
        setActiveStep(isUploadPending ? 2 : 3);
      }, 1000);
    }
  }, [imageBase64Created]);

  useEffect(() => {
    if (imageBase64Created && !isUploadPending) {
      setActiveStep(3);
    }
  }, [imageBase64Created, isUploadPending]);

  return (
    <HeaderTextsContainer>
      <StyledStepper
        activeStep={activeStep}
        orientation="vertical"
        connector={<span style={{ paddingBottom: "5px" }}></span>}
      >
        {[
          <Step key="1">
            <StyledStepLabel>
              <StepsText>
                {`${
                  imageBase64Created ? "Design vytvořen" : "Zpracovávám design"
                }`}
                {!imageBase64Created && (
                  <WrapSpan>
                    <UnderlineLoader />
                  </WrapSpan>
                )}
              </StepsText>
            </StyledStepLabel>
          </Step>,
          <Step key="2">
            <StyledStepLabel>
              <StepsText>
                {`${
                  !imageBase64Created
                    ? "Čekám na design"
                    : designDisplayed
                    ? "Design zobrazen"
                    : "Zobrazuji design"
                }`}
                {imageBase64Created && !designDisplayed && (
                  <WrapSpan>
                    <UnderlineLoader />
                  </WrapSpan>
                )}
              </StepsText>
            </StyledStepLabel>
          </Step>,
          <Step key="3">
            <StyledStepLabel>
              <StepsText>
                {imageBase64Created
                  ? `${isUploadPending ? "Ukládám " : "Uloženo "}`
                  : "Čekám na deisgn"}
                {imageBase64Created && <UploadPercentageString />}
                {imageBase64Created &&
                  `%\u00A0/\u00A0${fileSizeMB && fileSizeMB + "MB"}`}
                {imageBase64Created && isUploadPending && (
                  <WrapSpan>
                    <UnderlineLoader />
                  </WrapSpan>
                )}
              </StepsText>
            </StyledStepLabel>
          </Step>,
        ]}
      </StyledStepper>

      {lightbox.open && (
        <Lightbox
          mainSrc={lightbox.activeSrc}
          onCloseRequest={() => setLightbox({ open: false })}
        />
      )}
    </HeaderTextsContainer>
  );
}

const WrapSpan = styled.span`
  color: ${color("primary")} !important;
`;

const HeaderTextsContainer = styled.div`
  flex-basis: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
`;

const StepsText = styled.p`
  color: ${color("primary")};
  font-weight: ${fontWeight("light")};
  letter-spacing: 1.2px;
  font-size: 14px;
  transform: translateX(0);
  display: inline-block;
  line-height: 145%;
`;

const StyledStepLabel = styled(StepLabel)`
  .MuiStepIcon-active {
    color: ${color("primary")} !important;
    text {
      fill: white !important;
    }
  }
  .MuiStepIcon-completed {
    color: ${color("primary")} !important;
    text {
      fill: white !important;
    }
  }
`;

const StyledStepper = styled(Stepper)`
  // width: 100% !important;
  background-color: transparent !important;
  padding: 0px !important;
  margin: 10px 0;
`;
