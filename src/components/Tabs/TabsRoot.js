/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";

import { useIsMobile } from "Hooks/useIsMobile";
import { useElementDimensions } from "Hooks/useElementDimensions";
import { color } from "utils";
import { ORIENTATIONS } from "@constants";
import Stepper from "./Stepper";

import Step1Location from "../steps/Step1Location";
import Step2Orientation from "../steps/Step2Orientation";
import Step3Layout from "../steps/Step3Layout";
import Step3BLayoutColorSwitch from "../steps/Step3BLayoutColorSwitch";
import Step4Colors from "../steps/Step4Colors";
import Step5Size from "../steps/Step5Size";
import Step6FinishVariant from "../steps/Step6FinishVariant";
import Step7Checkout from "../steps/Step7Checkout";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";

const TAB_VALUES = {
  ONE: "MÍSTO & ORIENTACE",
  TWO: "ROZLOŽENÍ & BARVY",
  THREE: "ROZMĚRY & PLATBA",
};

const priceAlgorithm = getPriceAlgorithm();

export default function TabsRootNew({
  map,
  mapCoordinates,
  setMapCoordinates,
  activeLayout,
  setActiveLayout,
  setActiveMapStyleName,
  activeMapStyleName,
  mapTitles,
  setMapTitles,
  product,
  setProduct,
}) {
  const [activeTab, setActiveTab] = useState(TAB_VALUES.ONE);
  const [activeStepNumber, setActiveStepNumber] = React.useState(0);

  const { isMobile } = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isArrowDisabled, setIsArrowDisabled] = useState(true);

  const classes = useStyles();

  const { height: map_segment_height } = useElementDimensions(
    "map_studio_segment"
  );

  const { height: header_height } = useElementDimensions("header");
  const { height: mobile_header_height } = useElementDimensions(
    "map_buttons_wrapper"
  );
  const { height: map_canvas_height, width: with_ww } = useElementDimensions(
    "map_wrap_2_id"
  );

  const { height: stepper_height, width: stepper_width } = useElementDimensions(
    "tabs_stepper"
  );

  const { dataPrintful } = useGetDataPrintful([product.variantId]);

  const handleChange = (newValue) => {
    // if (isMobile) {
    const yCoordTabs =
      document.querySelector("#tab_wrap_wrap").getBoundingClientRect().top -
      100;

    setIsOpen(true);

    setActiveTab(newValue);
    // window.setTimeout(function () {
    // }, 500);

    // }
  };
  const stepsNumbersDisabledOpenning = [];
  useEffect(() => {
    if (stepsNumbersDisabledOpenning.includes(activeStepNumber)) {
      setIsOpen(false);
      setIsArrowDisabled(true);
      return;
    }

    setIsArrowDisabled(false);
  }, [activeStepNumber]);

  const handleNext = () => {
    setActiveStepNumber((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStepNumber((prevActiveStep) => prevActiveStep - 1);
  };

  const stepElementsDesktop = [
    [
      <Step1Location
        map={map}
        setMapCoordinates={setMapCoordinates}
        setMapTitles={setMapTitles}
      />,
      <Step2Orientation product={product} setProduct={setProduct} />,
    ],
    [
      <Step3Layout
        activeFrame={activeLayout}
        setActiveLayout={setActiveLayout}
      />,
      <Step3BLayoutColorSwitch
        product={product}
        setProduct={setProduct}
        activeMapStyleName={activeMapStyleName}
      />,

      <Step4Colors
        activeMapStyle={activeMapStyleName}
        setActiveMapStyleName={setActiveMapStyleName}
      />,
    ],

    [
      <Step5Size product={product} setProduct={setProduct} />,

      <Step6FinishVariant
        map={map}
        mapTitles={mapTitles}
        activeLayout={activeLayout}
        product={product}
        setProduct={setProduct}
        activeMapStyle={activeMapStyleName}
      />,
      <Step7Checkout
        map={map}
        mapTitles={mapTitles}
        activeLayout={activeLayout}
        product={product}
        activeMapStyleName={activeMapStyleName}
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
      <Step4Colors
        activeMapStyle={activeMapStyleName}
        setActiveMapStyleName={setActiveMapStyleName}
        nextTab={() => handleChange(TAB_VALUES.THREE)}
      />,
    ],
    [
      <Step3Layout
        activeFrame={activeLayout}
        setActiveLayout={setActiveLayout}
        nextTab={() => handleChange(TAB_VALUES.THREE)}
      />,
    ],

    [
      <Step3BLayoutColorSwitch
        product={product}
        setProduct={setProduct}
        activeMapStyleName={activeMapStyleName}
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
        activeLayout={activeLayout}
        product={product}
        setProduct={setProduct}
        activeMapStyle={activeMapStyleName}
      />,
    ],
    [
      <Step7Checkout
        map={map}
        mapTitles={mapTitles}
        activeLayout={activeLayout}
        product={product}
        activeMapStyleName={activeMapStyleName}
      />,
    ],
  ];

  const activeStepElements = isMobile
    ? stepElementsMobile
    : stepElementsDesktop;

  useEffect(() => {
    const currentTabsLength = activeStepElements.length - 1;
    if (!isMobile && activeStepNumber > currentTabsLength) {
      setActiveStepNumber(currentTabsLength);
    }
  }, [isMobile]);

  useEffect(() => {
    const currentTabsLength = activeStepElements.length - 1;
    if (!isMobile && activeStepNumber > currentTabsLength) {
      setActiveStepNumber(currentTabsLength);
    }
  }, [product]);

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    product.variantId,
    dataPrintful
  );

  const isWideOrientation =
    product?.sizeObject?.orientation === ORIENTATIONS.wide;

  return (
    <MainContainer
      className={isMobile && isOpen && "open"}
      isMobile={isMobile}
      isOpen={isMobile && isOpen}
      headerHeight={header_height}
      mobileHeaderHeight={mobile_header_height}
      mapCanvasHeight={map_canvas_height}
      mapHeight={map_segment_height}
      isWideOrientation={isWideOrientation}
    >
      {/* <div sx={styles.tabsContainer} className={isMobile && isOpen && "open"}> */}

      {isMobile && (
        <PriceWrap>
          <Price>celkem: {getFormattedPrice(priceWithDelivery.netPrice)}</Price>
        </PriceWrap>
      )}

      <TabSegmentWrap
        mapHeight={map_segment_height}
        headerHeight={header_height}
        isWideOrientation={isWideOrientation}
        isOpen={isOpen}
        isMobile={isMobile}
      >
        <Stepper
          stepElements={activeStepElements}
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStepNumber}
          map={map}
          mapTitles={mapTitles}
          activeLayout={activeLayout}
          product={product}
          activeMapStyleName={activeMapStyleName}
        />
        {/* {isMobile && (
        <MobileTabWrap>{stepElementsMobile[activeStep]}</MobileTabWrap>
      )} */}
        <TabContentWrap topElementsHeight={stepper_height + header_height}>
          {<>{activeStepElements[activeStepNumber]}</>}
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
      {/* </div> */}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: null;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10;
  background-color: white;
  transition-duration: 1s;
  position: ${({ isOpen, isMobile }) =>
    isOpen ? "fixed" : isMobile ? "absolute" : "relative"};
  top: ${({ isOpen, mapHeight }) => (isOpen ? "60vh" : `${mapHeight}px`)};

  top: ${({ isOpen, isWideOrientation, mapCanvasHeight, mobileHeaderHeight }) =>
    isWideOrientation &&
    !isOpen &&
    `calc(${mobileHeaderHeight}px + ${mapCanvasHeight}px + 80px)`};

  height: ${({ mapHeight }) => `calc(100vh - ${mapHeight}px)`};

  @media (min-width: 768px) {
    height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
    overflow: scroll;
    top: unset;
  }
`;

const TabSegmentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${color("background")};

  @media (max-width: 768px) {
    height: ${({ mapHeight, isWideOrientation }) =>
      `calc(100vh - ${mapHeight}px + ${isWideOrientation ? 100 : 0}px)`};

    top: ${({ isOpen, isWideOrientation, mapHeight }) =>
      isWideOrientation && !isOpen && `${mapHeight - 100}px`};

    padding: 0 0;
    overflow: visible;
  }
`;

const TabContentWrap = styled.div`
  padding: 0px 0.7rem;
  height: ${({ topElementsHeight }) =>
    `calc(100vh - ${topElementsHeight}px - 20px)`};
  overflow: scroll;

  @media (max-width: 768px) {
    height: unset;
    overflow: visible;
    padding: 0px 0.5rem;
  }
`;

// const ArrowWrap = styled.div`
//   display: inline-flex;
//   height: 0;
//   pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};
//   cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};

//   & svg {
//     color: ${({ isDisabled }) => (isDisabled ? "lightGrey" : "black")};

//     transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
//     width: 30px;
//     height: 40px;
//     position: relative;
//     top: -35px;
//     padding: 10px 5px;
//     background-color: white;
//   }
// `;

const PriceWrap = styled.div`
  display: inline-flex;

  height: 0;
`;

const Price = styled.div`
  position: relative;
  color: white;
  padding-left: 0.5rem;
  top: -30px;
`;

const useStyles = makeStyles((theme) => ({
  rootBackdrop: {
    // zIndex: "5 !important",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
}));
