import React, { useEffect } from "react";
import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { color } from "utils";

import CheckoutCta from "../checkout-btn/CheckoutCta";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "15px 5px",
  },
});

export default function Stepper({
  stepElements,
  handleNext,
  handleBack,
  activeStep,
  map,
  activeMapStyleName,
  snapMapInstance,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const isLastStep = activeStep === stepElements.length - 1;

  return (
    <MobileStepper
      variant="dots"
      steps={stepElements.length}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      id="tabs_stepper"
      nextButton={
        <StyledButton
          size="small"
          onClick={!isLastStep ? handleNext : () => {}}
        >
          {isLastStep ? (
            <CheckoutCta
              map={map}
              snapMapInstance={snapMapInstance}
              activeMapStyleName={activeMapStyleName}
              isCustomUI
            >
              Shrnutí
            </CheckoutCta>
          ) : (
            "Další"
          )}
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </StyledButton>
      }
      backButton={
        <StyledButtonBack
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Zpět
        </StyledButtonBack>
      }
    />
  );
}

const StyledButton = styled(Button)`
  color: white !important;
  background-color: ${color("cta_color")} !important;
  padding-left: 15px !important;
  text-transform: unset !important;
`;

const StyledButtonBack = styled(Button)`
  text-transform: unset !important;
`;
