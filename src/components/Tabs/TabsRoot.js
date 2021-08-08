/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { useDispatch } from "react-redux";

import { useIsMobile } from "Hooks/useIsMobile";
import { useElementDimensions } from "Hooks/useElementDimensions";
import { color, fontWeight } from "utils";
import Stepper from "./Stepper";

import Step1Location from "../steps/Step1Location";
import Step2Orientation from "../steps/Step2Orientation";
import Step3Layout from "../steps/Step3Layout";
import Step3BLayoutColorSwitch from "../steps/Step3BLayoutColorSwitch";
import Step4Colors from "../steps/Step4Colors";
import Step5Size from "../steps/Step5Size";
import Step6FinishVariant from "../steps/Step6FinishVariant";
import Step7MapDefinition from "../steps/Step7MapDefinition";
import Step8Checkout from "../steps/Step8Checkout";
import StepTitles from "../steps/StepTitles";
import StepAddKonvaIcons from "../steps/StepAddKonvaIcons";

import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import { getIsWideOrientation } from "LibGlobal/getIsWideOrientation";

import {
  useProductSelector,
  useActiveMapStyleSelector,
  useTabStepNumberSelector,
} from "redux/order/reducer";

import { setTabStepNumberAction } from "redux/order/actions";

const priceAlgorithm = getPriceAlgorithm();

const getFormatedPriceString = (amount) => {
  return amount ? `| ${getFormattedPrice(amount)}` : "";
};

export default function TabsRootNew({ map, konvaStageRef }) {
  const classes = useStyles();
  const productRedux = useProductSelector();
  const activeMapStyleName = useActiveMapStyleSelector();
  const { isMobile } = useIsMobile();
  const activeStepNumberRedux = useTabStepNumberSelector();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

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

  const { dataPrintful } = useGetDataPrintful([productRedux.variantId]);

  const stepsNumbersDisabledOpenning = [];
  useEffect(() => {
    if (stepsNumbersDisabledOpenning.includes(activeStepNumberRedux)) {
      setIsOpen(false);
      return;
    }
  }, [activeStepNumberRedux]);

  const handleNext = () => {
    dispatch(setTabStepNumberAction(activeStepNumberRedux + 1));
  };

  const handleBack = () => {
    dispatch(setTabStepNumberAction(activeStepNumberRedux - 1));
  };

  const stepElementsDesktop = [
    [<Step1Location map={map} />, <Step2Orientation />, <StepTitles />],
    [<Step3Layout />, <Step3BLayoutColorSwitch />, <Step4Colors />],
    [<Step5Size />, <Step6FinishVariant map={map} />],
    [
      // <StepAddKonvaIcons map={map} />,

      <Step8Checkout
        map={map}
        activeMapStyleName={activeMapStyleName}
        konvaStageRef={konvaStageRef}
      />,
    ],
  ];

  const stepElementsMobile = [
    [<Step1Location map={map} />],
    [<Step2Orientation />],
    [<StepTitles />],
    [<Step4Colors />],
    [<Step3Layout />],
    [<Step3BLayoutColorSwitch />],
    [<Step5Size />],
    [<Step6FinishVariant map={map} />],
    // [<StepAddKonvaIcons map={map} />],
    [
      <Step8Checkout
        map={map}
        activeMapStyleName={activeMapStyleName}
        konvaStageRef={konvaStageRef}
      />,
    ],
  ];

  const activeStepElements = isMobile
    ? stepElementsMobile
    : stepElementsDesktop;

  useEffect(() => {
    const currentTabsLength = activeStepElements.length - 1;
    if (!isMobile && activeStepNumberRedux > currentTabsLength) {
      dispatch(setTabStepNumberAction(currentTabsLength));
    }
  }, [isMobile]);

  useEffect(() => {
    const currentTabsLength = activeStepElements.length - 1;
    if (!isMobile && activeStepNumberRedux > currentTabsLength) {
      dispatch(setTabStepNumberAction(currentTabsLength));
    }
  }, [productRedux]);

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    productRedux.variantId,
    dataPrintful
  );

  const isWideOrientation = getIsWideOrientation(productRedux);

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

      <PriceWrap>
        <Price>cena {getFormatedPriceString(priceWithDelivery.netPrice)}</Price>
      </PriceWrap>

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
          activeStep={activeStepNumberRedux}
          map={map}
          activeMapStyleName={activeMapStyleName}
          konvaStageRef={konvaStageRef}
        />
        {/* {isMobile && (
        <MobileTabWrap>{stepElementsMobile[activeStep]}</MobileTabWrap>
      )} */}
        <TabContentWrap topElementsHeight={stepper_height + header_height}>
          {<>{activeStepElements[activeStepNumberRedux]}</>}
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

const PriceWrap = styled.div`
  display: inline-flex;
  height: 0;
`;

const Price = styled.div`
  position: relative;
  color: ${color("cta_color")};
  font-weight: ${fontWeight("bold")};
  padding-left: 0.5rem;
  top: -30px;
`;

const useStyles = makeStyles((theme) => ({
  rootBackdrop: {
    // zIndex: "5 !important",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
}));
