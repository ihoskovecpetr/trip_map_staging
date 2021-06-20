/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, Box, Heading, Text, Button, Link } from "theme-ui";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useIsMobile } from "../../Hooks/useIsMobile";
import { useElementDimensions } from "../../Hooks/useElementDimensions";
import { color, font, fontSize, fontWeight } from "../../utils";

import Stepper from "../Tabs/Stepper";

import Tab1 from "../Tab1/tab1";
import Step1Location from "../Tab1/Step1Location";
import Step2Orientation from "../Tab1/Step2Orientation";
import Tab2 from "../Tab2/tab2";
import Step3Layout from "../Tab2/Step3Layout";
import Step4Colors from "../Tab2/Step4Colors";
import Tab3 from "../Tab3/tab3";
import Step5Size from "../Tab3/Step5Size";
import Step6FinishVariant from "../Tab3/Step6FinishVariant";
import Step7Checkout from "../Tab3/Step7Checkout";

const TAB_VALUES = {
  ONE: "MÍSTO & ORIENTACE",
  TWO: "ROZLOŽENÍ & BARVY",
  THREE: "ROZMĚRY & PLATBA",
};

export default function SetupColumn({
  map,
  mapCoordinates,
  setMapCoordinates,
  activeFrame,
  setActiveLayout,
  activeMapStyle,
  setActiveMapStyle,
  mapTitles,
  setMapTitles,
  product,
  setProduct,
}) {
  const [activeTab, setActiveTab] = useState(TAB_VALUES.ONE);
  const [activeStep, setActiveStep] = React.useState(0);

  const { isMobile } = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);
  const [isArrowDisabled, setIsArrowDisabled] = useState(true);

  const classes = useStyles();

  const { height: map_segment_height } = useElementDimensions(
    "map_studio_segment"
  );

  const { height: header_height } = useElementDimensions("header");

  const handleChange = (newValue) => {
    // if (isMobile) {
    const yCoordTabs =
      document.querySelector("#tab_wrap_wrap").getBoundingClientRect().top -
      100;

    // window.scrollBy({
    //   top: yCoordTabs,
    //   left: 0,
    //   behavior: "smooth",
    // });

    setIsOpen(true);

    setActiveTab(newValue);
    // window.setTimeout(function () {
    // }, 500);

    // }
  };
  const stepsNumbersDisabledOpenning = [];
  useEffect(() => {
    console.log({ activeStep });
    if (stepsNumbersDisabledOpenning.includes(activeStep)) {
      setIsOpen(false);
      setIsArrowDisabled(true);
      return;
    }

    setIsArrowDisabled(false);
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepElementsDesktop = [
    [
      <Step1Location
        map={map}
        nextTab={() => handleChange(TAB_VALUES.TWO)}
        setMapCoordinates={setMapCoordinates}
        setMapTitles={setMapTitles}
      />,
      <Step2Orientation
        nextTab={() => handleChange(TAB_VALUES.TWO)}
        product={product}
        setProduct={setProduct}
      />,
    ],
    [
      <Step3Layout
        activeFrame={activeFrame}
        setActiveLayout={setActiveLayout}
        nextTab={() => handleChange(TAB_VALUES.THREE)}
      />,

      <Step4Colors
        activeMapStyle={activeMapStyle}
        setActiveMapStyle={setActiveMapStyle}
        nextTab={() => handleChange(TAB_VALUES.THREE)}
      />,
    ],

    [
      <Step5Size
        product={product}
        setProduct={setProduct}
        nextTab={() => handleChange(TAB_VALUES.THREE)}
      />,

      <Step6FinishVariant
        map={map}
        mapTitles={mapTitles}
        activeLayout={activeFrame}
        product={product}
        setProduct={setProduct}
        activeMapStyle={activeMapStyle}
      />,
      <Step7Checkout
        map={map}
        mapTitles={mapTitles}
        activeLayout={activeFrame}
        product={product}
        activeMapStyle={activeMapStyle}
      />,
    ],
  ];

  const stepElementsMobile = [
    [
      <Step1Location
        map={map}
        nextTab={() => handleChange(TAB_VALUES.TWO)}
        setMapCoordinates={setMapCoordinates}
        setMapTitles={setMapTitles}
      />,
    ],
    [
      <Step2Orientation
        nextTab={() => handleChange(TAB_VALUES.TWO)}
        product={product}
        setProduct={setProduct}
      />,
    ],
    [
      <Step3Layout
        activeFrame={activeFrame}
        setActiveLayout={setActiveLayout}
        nextTab={() => handleChange(TAB_VALUES.THREE)}
      />,
    ],

    [
      <Step4Colors
        activeMapStyle={activeMapStyle}
        setActiveMapStyle={setActiveMapStyle}
        nextTab={() => handleChange(TAB_VALUES.THREE)}
      />,
    ],

    [
      <Step5Size
        product={product}
        setProduct={setProduct}
        nextTab={() => handleChange(TAB_VALUES.THREE)}
      />,
    ],

    [
      <Step6FinishVariant
        map={map}
        mapTitles={mapTitles}
        activeLayout={activeFrame}
        product={product}
        setProduct={setProduct}
        activeMapStyle={activeMapStyle}
      />,
    ],
    [
      <Step7Checkout
        map={map}
        mapTitles={mapTitles}
        activeLayout={activeFrame}
        product={product}
        activeMapStyle={activeMapStyle}
      />,
    ],
  ];

  const activeStepElements = isMobile
    ? stepElementsMobile
    : stepElementsDesktop;

  const isOverflowVisible =
    isMobile && activeStep === activeStepElements.length - 1;

  console.log({ isOverflowVisible });

  return (
    <div sx={styles.tabsContainer} className={isMobile && isOpen && "open"}>
      {isMobile && (
        <ArrowWrap isOpen={isOpen} isDisabled={isArrowDisabled}>
          <ArrowForwardIosIcon onClick={() => setIsOpen((prev) => !prev)} />
        </ArrowWrap>
      )}
      <TabSegmentWrap
        mapHeight={map_segment_height}
        headerHeight={header_height}
        isOpen={isOpen}
        isOverflowVisible={isOverflowVisible}
      >
        <Stepper
          stepElements={activeStepElements}
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
        />
        {/* {isMobile && (
        <MobileTabWrap>{stepElementsMobile[activeStep]}</MobileTabWrap>
      )} */}
        <TabContentWrap isOverflowVisible={isOverflowVisible}>
          {<>{activeStepElements[activeStep]}</>}
        </TabContentWrap>
      </TabSegmentWrap>
      {isMobile && (
        <Backdrop
          className={classes.backdrop}
          classes={{
            root: classes.rootBackdrop, // class name, e.g. `classes-nesting-root-x`
          }}
          open={isOpen}
          onClick={() => setIsOpen(false)}
        ></Backdrop>
      )}
    </div>
  );
}

const styles = {
  tabsContainer: {
    width: "100%",
    height: [null, null, null, "100%"],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "white",
    transitionDuration: "1s",

    "&.open": {
      // height: "40vh",
      position: "fixed",
      bottom: 0,
      left: 0,
    },
  },
  tabWrapWrap: {
    position: "relative",
  },
  TabWrap: {
    display: "flex",
    position: "absolute",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  Tab: {
    width: "33.33%",
    px: "10px",
    py: [null, "5px", "10px"],
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    color: "rgba(0,0,0,0.35)",
    cursor: "pointer",
    borderBottom: "1px solid lightgrey",
    backgroundColor: "background_white",

    "&.active": {
      borderBottom: "2px solid",
      borderColor: "cta_color",
      color: "cta_color",
    },
    "&:hover": {
      backgroundColor: "#00000016",
    },
    "> p": {
      margin: "auto",
      textAlign: "center",
      // fontFamily: "Arial",
      // fontWeight: 400,
    },
  },
  tabBody: {
    paddingTop: ["70px", "70px", "70px", "80px"],
    display: "none",
    height: ["unset", "unset", "100%"],
    overflow: "scroll",
    backgroundColor: "background_white",
    "&.active": {
      display: "block",
    },
    "@media screen and (max-width: 768px)": {
      height: "unset",
    },
  },
};

const TabSegmentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${color("background")};
  padding: 5px 5px;

  height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};

  @media (max-width: 768px) {
    height: ${({ mapHeight, isOpen }) =>
      isOpen ? "40vh" : `calc(100vh - ${mapHeight}px)`};
    overflow: ${({ isOverflowVisible }) =>
      isOverflowVisible ? "visible" : "hidden"};
    padding: 0 0;
  }
`;

const TabContentWrap = styled.div`
  overflow: ${({ isOverflowVisible }) =>
    isOverflowVisible ? "visible" : "scroll"};
`;

const ArrowWrap = styled.div`
  display: inline-flex;
  height: 0;
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};
  cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};

  & svg {
    color: ${({ isDisabled }) => (isDisabled ? "lightGrey" : "black")};

    transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
    width: 30px;
    height: 40px;
    position: relative;
    top: -35px;
    padding: 10px 5px;
    background-color: white;
  }
`;

const useStyles = makeStyles((theme) => ({
  rootBackdrop: {
    // zIndex: "5 !important",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
}));
