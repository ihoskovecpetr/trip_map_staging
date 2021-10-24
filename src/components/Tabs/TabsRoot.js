/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { useDispatch } from "react-redux";

import { useIsMobile } from "Hooks/useIsMobile";
import { useElementDimensions } from "Hooks/useElementDimensions";
import { color, fontWeight, mobile } from "utils";
import { ORIENTATIONS } from "@constants";
import Stepper from "./Stepper";
import { getIsProduction } from "LibGlobal/getIsProduction";

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

export default function TabsRootNew({ map, snapMapInstance }) {
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
    >
      {/* <div sx={styles.tabsContainer} className={isMobile && isOpen && "open"}> */}

      <PriceWrap>
        <Price>
          {`celkem:
          ${getFormattedPrice(
            dataPrintful?.[productRedux.variantId]?.priceWithDeliveryAndProfit
              .netPrice ?? 0
          )}`}
        </Price>
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
          activeStep={activeStepNumber}
          map={map}
          snapMapInstance={snapMapInstance}
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
    overflow: auto;
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
  height: unset;
  overflow: visible;
  padding: 0px 0.5rem;
  background-color: ${color("background_almost_white")};

  ${mobile`
    height: ${({ topElementsHeight }) =>
      `calc(100vh - ${topElementsHeight}px - 20px)`};
    overflow: auto;
  `}

  ::-webkit-scrollbar {
    display: none;
  }
`;

const PriceWrap = styled.div`
  display: inline-flex;
  height: 0;
`;

const Price = styled.div`
  position: relative;
  color: white;
  padding-left: 0.5rem;
  top: -30px;
  color: ${color("cta_color")};
  font-Weight ${fontWeight("bold")}
`;

const useStyles = makeStyles((theme) => ({
  rootBackdrop: {
    // zIndex: "5 !important",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
}));
