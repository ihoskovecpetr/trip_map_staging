import React, { useEffect } from "react";
import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { color } from "utils";
import { useDispatch } from "react-redux";

import CheckoutCta from "../Checkout/CheckoutCta";
import { useIsMobile } from "Hooks/useIsMobile";

import { useIsKonvaEnabledSelector } from "redux/order/reducer";
import { setIsKonvaRendered } from "redux/order/actions";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function Stepper({
  stepElements,
  handleNext,
  handleBack,
  activeStep,
  map,
  activeMapStyleName,
  konvaStageRef,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isMobile } = useIsMobile();
  const isKonvaEnabled = useIsKonvaEnabledSelector();

  const isLastStep = activeStep === stepElements.length - 1;

  useEffect(() => {
    if (
      (isKonvaEnabled && isMobile && activeStep >= 8) ||
      (!isMobile && activeStep >= 3)
    ) {
      dispatch(setIsKonvaRendered(true));
    } else {
      dispatch(setIsKonvaRendered(false));
    }
  }, [activeStep, isMobile]);

  return (
    <MobileStepper
      variant="dots"
      steps={stepElements.length}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      id="tabs_stepper"
      nextButton={
        <StyledButton size="small" onClick={!isLastStep && handleNext}>
          {isLastStep ? (
            <CheckoutCta
              map={map}
              activeMapStyleName={activeMapStyleName}
              isCustomUI
              konvaStageRef={konvaStageRef}
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
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Zpět
        </Button>
      }
    />
  );
}

const StyledButton = styled(Button)`
  color: white !important;
  background-color: ${color("cta_color")} !important;
  padding-left: 15px !important;
`;
