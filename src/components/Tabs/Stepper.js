import React, { useEffect } from "react";
import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { color } from "utils";

import CheckoutCta from "../Checkout/CheckoutCta";

const useStyles = makeStyles({
  root: {
    // maxWidth: 400,
    // flexGrow: 1,
    width: "100%",
  },
  rootButton: {
    backgroundColor: "#f6aa1c !important",
    paddingLeft: "15px",
    // color: "red",
  },
});

export default function Stepper({
  stepElements,
  handleNext,
  handleBack,
  activeStep,
  map,
  mapTitles,
  activeLayout,
  product,
  activeMapStyleName,
}) {
  const classes = useStyles();
  const theme = useTheme();
  //   const [activeStep, setActiveStep] = React.useState(0);

  //   const handleNext = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };

  //   const handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   };

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
          onClick={!isLastStep && handleNext}
          className={classes.rootButton}
          // disabled={activeStep === stepElements.length - 1}
        >
          {isLastStep ? (
            <CheckoutCta
              map={map}
              mapTitles={mapTitles}
              activeLayoutName={activeLayout}
              product={product}
              activeMapStyleName={activeMapStyleName}
              isCustomUI
            >
              Shrnutí
            </CheckoutCta>
          ) : (
            // <Button
            //   variant="contained"
            //   color="primary"
            //   classes={{
            //     root: classes.rootButton,
            //   }}
            // >
            // </Button>
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
  backgroundcolor: ${color("cta_color")} !important;
`;
