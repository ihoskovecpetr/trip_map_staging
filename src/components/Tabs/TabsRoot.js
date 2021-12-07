/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useDispatch } from "react-redux";

import { useIsMobile } from "Hooks/useIsMobile";
import { useElementDimensions } from "Hooks/useElementDimensions";
import { color, fontWeight, mobile } from "utils";
import { ORIENTATIONS } from "@constants";
import { getIsProduction } from "LibGlobal/getIsProduction";

import Stepper from "./Stepper";
import StepPathOrWithout from "../steps/StepPathOrWithout";
import Step1Location from "../steps/StepLocation";
import Step2Orientation from "../steps/Step2Orientation";
import StepLayout from "../steps/Step3Layout";
import StepLayoutColorSwitch from "../steps/Step3BLayoutColorSwitch";
import StepColors from "../steps/Step4Colors";
import Step5Size from "../steps/Step5Size";
import Step6FinishVariant from "../steps/Step6FinishVariant";
import Step7MapDefinition from "../steps/Step7MapDefinition";
import Step8Checkout from "../steps/Step8Checkout";
import StepTitles from "../steps/StepTitles";
import StepAddRoute from "../steps/StepAddRoute";
import StepAddIcon from "../steps/StepAddIcon";

import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { useSendSaveBlueprint } from "Hooks/useSendSaveBlueprint";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import { setActiveStepNumber } from "redux/order/actions";

import {
  useProductSelector,
  useActiveMapStyleSelector,
  useJourneysEnabledSelector,
  useActiveLayoutSelector,
  useGetActiveStepNumber,
} from "redux/order/reducer";

const isProduction = getIsProduction();

export default function TabsRoot({ map, snapMapInstance }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isMobile } = useIsMobile();
  const sendSaveBlueprint = useSendSaveBlueprint();

  const productRedux = useProductSelector();
  const isJourneysEnabled = useJourneysEnabledSelector();
  const activeMapStyleName = useActiveMapStyleSelector();
  const activeLayoutName = useActiveLayoutSelector();
  const activeStepNumber = useGetActiveStepNumber();

  // const [activeStepNumber, setActiveStepNumber] = React.useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { height: map_segment_height } = useElementDimensions(
    "map_studio_segment"
  );

  const { height: header_height } = useElementDimensions("header");
  const { height: mobile_header_height } = useElementDimensions(
    "map_buttons_wrapper"
  );
  const { height: map_canvas_height, width: with_ww } = useElementDimensions(
    "map_wrap_id"
  );

  const { height: stepper_height, width: stepper_width } = useElementDimensions(
    "tabs_stepper"
  );

  const { dataPrintful } = useGetDataPrintful([productRedux.variantId]);

  const stepsNumbersDisabledOpenning = [];
  useEffect(() => {
    if (stepsNumbersDisabledOpenning.includes(activeStepNumber)) {
      setIsOpen(false);
      return;
    }
  }, [activeStepNumber]);

  useEffect(() => {
    if (isProduction) {
      sendSaveBlueprint({
        map,
        snapMapInstance,
        activeLayoutName,
        product: productRedux,
        activeMapStyleName,
      });
    }
  }, []);

  const handleNext = () => {
    if (isProduction) {
      sendSaveBlueprint({
        map,
        snapMapInstance,
        activeLayoutName,
        product: productRedux,
        activeMapStyleName,
      });
    }
    dispatch(setActiveStepNumber(activeStepNumber + 1));
  };

  const handleBack = () => {
    dispatch(setActiveStepNumber(activeStepNumber - 1));
  };

  const StepComponent = isJourneysEnabled ? (
    <StepAddRoute map={map} index={2} />
  ) : (
    <Step1Location map={map} index={2} />
  );

  const stepElementsDesktop = [
    [<StepPathOrWithout map={map} index={1} />, StepComponent],
    [
      <Step2Orientation index={3} />,
      <StepTitles index={4} />,
      // <StepAddIcon map={map} index={21} />,
    ],

    [
      <StepLayout index={5} />,
      <StepLayoutColorSwitch index={6} />,
      <StepColors index={7} />,
    ],

    [<Step5Size index={8} />, <Step6FinishVariant map={map} index={9} />],
    [
      <Step8Checkout
        map={map}
        activeMapStyleName={activeMapStyleName}
        snapMapInstance={snapMapInstance}
        index={10}
      />,
    ],
  ];

  const stepElementsMobile = [
    [<StepPathOrWithout map={map} index={1} />],
    [StepComponent],
    // [<StepAddIcon map={map} index={21} />],
    [<Step2Orientation index={3} />],
    [<StepTitles index={4} />],
    [<StepColors index={5} />],
    [<StepLayout index={6} />],
    [<StepLayoutColorSwitch index={7} />],
    [<Step5Size index={8} />],
    [<Step6FinishVariant map={map} index={9} />],
    [
      <Step8Checkout
        map={map}
        activeMapStyleName={activeMapStyleName}
        snapMapInstance={snapMapInstance}
        index={10}
      />,
    ],
  ];

  const activeStepElements = isMobile
    ? stepElementsMobile
    : stepElementsDesktop;

  useEffect(() => {
    const currentTabsLength = activeStepElements.length - 1;
    if (!isMobile && activeStepNumber > currentTabsLength) {
      dispatch(setActiveStepNumber(currentTabsLength));
    }
  }, [isMobile]);

  console.log("Rerendered__THIS", {
    topElementsHeight: stepper_height + header_height,
    mapSegmentHeight: map_segment_height,
  });

  const isWideOrientation =
    productRedux?.sizeObject?.orientation === ORIENTATIONS.wide;

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
      dynamicVH={
        typeof window !== "undefined" ? window.innerHeight * 0.01 : "400px"
      }
    >
      {isMobile && (
        <>
          <OverflowSectionWrap>
            <Price>
              <StyledParagraph>{`celkem:
          ${getFormattedPrice(
            dataPrintful?.[productRedux.variantId]?.priceWithDeliveryAndProfit
              .netPrice ?? 0
          )}`}</StyledParagraph>
            </Price>
            <ArrowWrap>
              <StyledKeyboardArrowRight
                isOpen={isOpen}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </ArrowWrap>
            <Dummy_item></Dummy_item>
          </OverflowSectionWrap>
        </>
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
          snapMapInstance={snapMapInstance}
          activeMapStyleName={activeMapStyleName}
        />

        <StepperContentWrap
          topElementsHeight={stepper_height + header_height}
          stepperHeight={stepper_height}
          mapSegmentHeight={map_segment_height}
          isOpen={isOpen}
          dynamicVH={
            typeof window !== "undefined" ? window.innerHeight * 0.01 : "400px"
          }
        >
          {activeStepElements[activeStepNumber]?.map((el, index) =>
            React.cloneElement(el, {
              key: `key_step_${index}`,
            })
          )}
        </StepperContentWrap>
      </TabSegmentWrap>
      {/* {isMobile && (
        <Backdrop
          classes={{
            root: classes.rootBackdrop, // class name, e.g. `classes-nesting-root-x`
          }}
          open={isOpen}
          onClick={() => setIsOpen(false)}
        ></Backdrop>
      )} */}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10;
  background-color: ${color("background_almost_white")};
  transition-duration: 0.5s;
  position: ${({ isOpen, isMobile }) =>
    isOpen ? "fixed" : isMobile ? "absolute" : "relative"};

  top: ${({ isOpen, mapHeight, dynamicVH }) =>
    isOpen ? `${30 * dynamicVH}px` : `${mapHeight}px`};

  top: ${({ isOpen, isWideOrientation, mapCanvasHeight, mobileHeaderHeight }) =>
    isWideOrientation &&
    !isOpen &&
    `calc(${mobileHeaderHeight}px + ${mapCanvasHeight}px + 80px)`};

  height: ${({ mapHeight, isOpen, isMobile, dynamicVH }) =>
    isOpen && isMobile && `${70 * dynamicVH}px`};

  height: ${({
    mapCanvasHeight,
    mobileHeaderHeight,
    isOpen,
    isMobile,
    dynamicVH,
    isWideOrientation,
    mapHeight,
  }) =>
    !isOpen &&
    isMobile &&
    `calc(${100 * dynamicVH - mapHeight}px - ${
      isWideOrientation ? 80 : 0
    }px - 0px)`};

  ${mobile`
    overflow: auto;
    top: unset;
  `}
`;

const TabSegmentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  height: 100%;
  top: ${({ isOpen, isWideOrientation, mapHeight }) =>
    isOpen && `${mapHeight - 150}px`};

  padding: 0 0;

  ${mobile`
    height: unset;
    top: 0;
    padding: unset;
  `}
`;

const StepperContentWrap = styled.div`
  overflow: ${({ isOpen }) => (isOpen ? "scroll" : "hidden")};
  padding: 0px 0.5rem;
  height: ${({ topElementsHeight, mapSegmentHeight, isOpen, dynamicVH }) =>
    !isOpen &&
    `calc(${
      100 * dynamicVH
    }px - ${topElementsHeight}px - ${mapSegmentHeight}px)`};

  height: ${({ stepperHeight, isOpen }) =>
    !isOpen && `calc(100% - ${stepperHeight}px)`};

  ${mobile`
    height: ${({ topElementsHeight, isOpen, dynamicVH }) =>
      `calc(${100 * dynamicVH}px - ${topElementsHeight}px)`};
    overflow: scroll;
  `}

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledParagraph = styled.p`
  margin: 0;
  display: inline;
`;

const OverflowSectionWrap = styled.div`
  display: inline-flex;
  height: 0;
  justify-content: space-between;
  gap: 15px;

  width: 100%;
  position: relative;
  top: -28px;

  ${mobile`
`}
`;

const Price = styled.div`
  position: relative;
  flex: 1 0; 
  min-width: 145px; 
  padding-left: 5px;
  color: ${color("primary")};
  font-Weight ${fontWeight("bold")}
`;

const ArrowWrap = styled.div`
  background-color: ${color("background_almost_white")};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  height: 28px;
  flex: 1 2;
  display: flex;
  justify-content: center;
`;

const Dummy_item = styled.div`
  flex: 1 2;
`;

const StyledKeyboardArrowRight = styled(KeyboardArrowRight)`
  height: 44px !important;
  width: 44px !important;
  transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
  margin: -6px 0;
`;

const useStyles = makeStyles((theme) => ({
  rootBackdrop: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
}));
