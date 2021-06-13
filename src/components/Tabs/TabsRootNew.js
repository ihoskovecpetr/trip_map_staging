/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, Box, Heading, Text, Button, Link } from "theme-ui";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useIsMobile } from "../../Hooks/useIsMobile";
import { useElementDimensions } from "../../Hooks/useElementDimensions";

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

  const { height: headerHeight } = useElementDimensions("header");

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

  useEffect(() => {
    console.log({ activeStep });
    if (activeStep === 0) {
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

  const stepElements = [
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
  ];

  return (
    <div sx={styles.container} className={isMobile && isOpen && "open"}>
      <ArrowWrap isOpen={isOpen} isDisabled={isArrowDisabled}>
        <ArrowForwardIosIcon
          // width={"40px"}
          // height={"40px"}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </ArrowWrap>
      <Stepper
        stepElements={stepElements}
        handleNext={handleNext}
        handleBack={handleBack}
        activeStep={activeStep}
      />

      {stepElements[activeStep]}
      {/* <div sx={styles.tabWrapWrap} id="tab_wrap_wrap">
        <div sx={styles.TabWrap}>
          <div
            sx={styles.Tab}
            className={activeTab === TAB_VALUES.ONE && "active"}
            onClick={() => handleChange(TAB_VALUES.ONE)}
          >
            <p>{TAB_VALUES.ONE}</p>
          </div>
          <div
            sx={styles.Tab}
            className={activeTab === TAB_VALUES.TWO && "active"}
            onClick={() => handleChange(TAB_VALUES.TWO)}
          >
            <p>{TAB_VALUES.TWO}</p>
          </div>
          <div
            sx={styles.Tab}
            className={activeTab === TAB_VALUES.THREE && "active"}
            onClick={() => handleChange(TAB_VALUES.THREE)}
          >
            <p>{TAB_VALUES.THREE}</p>
          </div>
        </div>
      </div>
      */}

      {/* {activeTab === TAB_VALUES.ONE && (
        <TabContentWrap
          className={activeTab === TAB_VALUES.ONE && "active"}
          sx={styles.tabBody}
          headerHeight={headerHeight}
        >
          <Step1Location
            map={map}
            nextTab={() => handleChange(TAB_VALUES.TWO)}
            setMapCoordinates={setMapCoordinates}
            setMapTitles={setMapTitles}
          />
          <Step2Orientation
            nextTab={() => handleChange(TAB_VALUES.TWO)}
            product={product}
            setProduct={setProduct}
          />
        </TabContentWrap>
      )} */}
      {/* {activeTab === TAB_VALUES.TWO && (
        <TabContentWrap
          className={`${activeTab === TAB_VALUES.TWO && "active"}`}
          sx={styles.tabBody}
        >
          <Step3Layout
            activeFrame={activeFrame}
            setActiveLayout={setActiveLayout}
            nextTab={() => handleChange(TAB_VALUES.THREE)}
          />

          <Step4Colors
            activeMapStyle={activeMapStyle}
            setActiveMapStyle={setActiveMapStyle}
            nextTab={() => handleChange(TAB_VALUES.THREE)}
          />

        </TabContentWrap>
      )} */}
      {/* {activeTab === TAB_VALUES.THREE && (
        <TabContentWrap
          className={activeTab === TAB_VALUES.THREE && "active"}
          sx={styles.tabBody}
        >
          <Step5Size
            product={product}
            setProduct={setProduct}
            nextTab={() => handleChange(TAB_VALUES.THREE)}
          />

          <Step6FinishVariant
            map={map}
            mapTitles={mapTitles}
            activeLayout={activeFrame}
            product={product}
            setProduct={setProduct}
            activeMapStyle={activeMapStyle}
          />

        </TabContentWrap>
      )} */}

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
  container: {
    width: "100%",
    height: [null, null, null, "100%"],
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    zIndex: 10,
    backgroundColor: "white",
    transitionDuration: "1s",

    "&.open": {
      // height: "40vh",
      position: "fixed",
      bottom: 0,
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
    backgroundColor: "background_secondary",

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
    backgroundColor: "background_secondary",
    "&.active": {
      display: "block",
    },
    "@media screen and (max-width: 768px)": {
      height: "unset",
    },
  },
};

const TabContentWrap = styled.div`
  @media (max-width: 768px) {
    height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
  }
`;

const ArrowWrap = styled.div`
  display: inline-flex;
  height: 0;
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};
  cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};

  & svg {
    color: ${({ isDisabled }) => (isDisabled ? "lightGrey" : "black")};

    transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
    width: 40px;
    height: 40px;
    position: relative;
    top: -40px;
    padding: 10px;
    background-color: white;
  }
`;

const useStyles = makeStyles((theme) => ({
  rootBackdrop: {
    // zIndex: "5 !important",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
}));
