/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { useDispatch } from 'react-redux'

import { useIsMobile } from 'Hooks/useIsMobile'
import { useElementDimensions } from 'Hooks/useElementDimensions'
import { mobile, color } from 'utils'
import { ORIENTATIONS, TAB_STEPS } from '@constants'
import { getIsProduction } from 'LibGlobal/getIsProduction'
import { useTranslation } from 'Hooks/useTranslation'

import Stepper from './Stepper'
import StepPathOrWithout from '../steps/StepPathOrWithout'
import Step1Location from '../steps/StepLocation'
import Step2Orientation from '../steps/StepOrientation'
import StepLayout from '../steps/StepLayout'
import StepLayoutColorSwitch from '../steps/StepLayoutColorSwitch'
import StepMapDesigns from '../steps/StepMapDesigns'
import StepSize from '../steps/StepSize'
import StepFraming from '../steps/StepFraming'
import Step8Checkout from '../steps/StepCheckout'
import StepTitles from '../steps/StepTitles'
import StepJourneys from '../steps/StepJourneys'
import StepAddIcon from '../steps/StepAddIcon'
import TopBackdropElement from './TopBackdropElement'

import { useGetDataPrintful } from 'Hooks/useGetDataPrintful'
import { useSendSaveBlueprint } from 'Hooks/useSendSaveBlueprint'
import { useScreenSize } from 'Hooks/useScreenSize'
import { setActiveStepNumber } from 'redux/order/actions'

import PaleBluePNG from 'assets/mapStyles/png/PaleBlue.png'
import SandyDarkPNG from 'assets/mapStyles/png/SandyDark.png'
import WhiteBluePNG from 'assets/mapStyles/png/WhiteBlue.png'
import BlackWhitePNG from 'assets/mapStyles/png/BlackWhite.png'
import BlackLandPNG from 'assets/mapStyles/png/BlackLand.png'
import DoubleBluePNG from 'assets/mapStyles/png/DoubleBlue.png'
import RedBluePNG from 'assets/mapStyles/png/RedBlue.png'
import GreenOrangePNG from 'assets/mapStyles/png/GreenOrange.png'
import BlueYellowPNG from 'assets/mapStyles/png/BlueYellow.png'
import YellowGreenPNG from 'assets/mapStyles/png/YellowGreen.png'
import RedWhitePNG from 'assets/mapStyles/png/RedWhite.png'

const imagesArr = {
    PaleBluePNG: PaleBluePNG,
    SandyDarkPNG: SandyDarkPNG,
    WhiteBluePNG: WhiteBluePNG,
    BlackWhitePNG: BlackWhitePNG,
    BlackLandPNG: BlackLandPNG,
    DoubleBluePNG: DoubleBluePNG,
    RedBluePNG: RedBluePNG,
    GreenOrangePNG: GreenOrangePNG,
    BlueYellowPNG: BlueYellowPNG,
    YellowGreenPNG: YellowGreenPNG,
    RedWhitePNG: RedWhitePNG
}

import {
    useProductSelector,
    useActiveMapStyleSelector,
    useJourneysEnabledSelector,
    useActiveLayoutSelector,
    useGetActiveStepNumber,
    useTitlesSelector
} from 'redux/order/reducer'

const isProduction = getIsProduction()

export default function TabsRoot({ map, snapMapInstance }) {
    const dispatch = useDispatch()
    const { isMobile } = useIsMobile()
    const sendSaveBlueprint = useSendSaveBlueprint()
    const { height: screenHeight } = useScreenSize()
    const t = useTranslation()

    const productRedux = useProductSelector()
    const isJourneysEnabled = useJourneysEnabledSelector()
    const activeMapStyleName = useActiveMapStyleSelector()
    const activeLayoutName = useActiveLayoutSelector()
    const activeStepNumber = useGetActiveStepNumber()

    // const [activeStepNumber, setActiveStepNumber] = React.useState(0);
    const [isOpen, setIsOpen] = useState(isMobile ? true : false)

    const { height: map_segment_height } = useElementDimensions('map_studio_segment')

    const { height: header_height } = useElementDimensions('header')
    const { height: mobile_header_height } = useElementDimensions('map_buttons_wrapper')
    const { height: map_canvas_height, width: with_ww } = useElementDimensions('map_wrap_id')

    const { height: stepper_height, width: stepper_width } = useElementDimensions('tabs_stepper')

    const { dataPrintful } = useGetDataPrintful([productRedux.variantId])

    const stepsNumbersDisabledOpenning = []
    useEffect(() => {
        if (stepsNumbersDisabledOpenning.includes(activeStepNumber)) {
            setIsOpen(false)
            return
        }
    }, [activeStepNumber])

    useEffect(() => {
        if (isProduction) {
            sendSaveBlueprint({
                map
            })
        }
    }, [])

    const handleNext = () => {
        if (isProduction) {
            sendSaveBlueprint({
                map
            })
        }

        setIsOpen(true)

        console.log({ isOpen })

        dispatch(setActiveStepNumber(activeStepNumber + 1))
    }

    const handleBack = () => {
        setIsOpen(true)
        dispatch(setActiveStepNumber(activeStepNumber - 1))
    }

    const StepComponent = isJourneysEnabled ? (
        <StepJourneys map={map} index={1} />
    ) : (
        <Step1Location map={map} index={1} />
    )

    const stepElementsDesktop = [
        [
            // <StepPathOrWithout map={map} index={1} />,
            StepComponent
        ],
        [
            <Step2Orientation index={2} />,
            <StepTitles index={3} />
            // <StepAddIcon map={map} index={21} />,
        ],

        [<StepLayout index={4} />, <StepLayoutColorSwitch index={5} />, <StepMapDesigns index={6} {...imagesArr} />],

        [<StepSize index={7} />, <StepFraming map={map} index={8} />],
        [
            <Step8Checkout
                map={map}
                activeMapStyleName={activeMapStyleName}
                snapMapInstance={snapMapInstance}
                index={9}
            />
        ]
    ]

    const stepElementsMobile = [
        // [<StepPathOrWithout map={map} index={1} />],
        [StepComponent],
        // [<StepAddIcon map={map} index={21} />],
        [<Step2Orientation index={2} />],
        [<StepTitles index={3} />],
        [<StepMapDesigns index={4} {...imagesArr} />],
        [<StepLayout index={5} />],
        [<StepLayoutColorSwitch index={6} />],
        [<StepSize index={7} />],
        [<StepFraming map={map} index={8} />],
        [
            <Step8Checkout
                map={map}
                activeMapStyleName={activeMapStyleName}
                snapMapInstance={snapMapInstance}
                index={9}
            />
        ]
    ]

    const activeStepElements = isMobile ? stepElementsMobile : stepElementsDesktop

    useEffect(() => {
        const currentTabsLength = activeStepElements.length - 1
        if (!isMobile && activeStepNumber > currentTabsLength) {
            dispatch(setActiveStepNumber(currentTabsLength))
        }
    }, [isMobile])

    const isWideOrientation = productRedux?.sizeObject?.orientation === ORIENTATIONS.wide

    return (
        <MainContainer
            className={isMobile && isOpen && 'open'}
            isMobile={isMobile}
            isOpen={isMobile && isOpen}
            headerHeight={header_height}
            mobileHeaderHeight={mobile_header_height}
            mapCanvasHeight={map_canvas_height}
            mapHeight={map_segment_height}
            isWideOrientation={isWideOrientation}
            screenHeight={screenHeight}
        >
            {!isMobile && (
                <StepperWrap>
                    <Stepper
                        stepElements={activeStepElements}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        activeStep={activeStepNumber}
                        map={map}
                        snapMapInstance={snapMapInstance}
                        activeMapStyleName={activeMapStyleName}
                    />
                </StepperWrap>
            )}

            <TabSegmentWrap
                mapHeight={map_segment_height}
                headerHeight={header_height}
                isWideOrientation={isWideOrientation}
                isOpen={isOpen}
                isMobile={isMobile}
                screenHeight={screenHeight}
                stepperHeight={stepper_height}
            >
                {isOpen && <TopBackdropElement setIsOpen={setIsOpen} />}
                <StepperContentWrap
                    topElementsHeight={stepper_height + header_height}
                    stepperHeight={stepper_height}
                    mapSegmentHeight={map_segment_height}
                    isOpen={isOpen}
                    screenHeight={screenHeight}
                    isMobile={isMobile}
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    {activeStepElements[activeStepNumber]?.map((el, index) =>
                        React.cloneElement(el, {
                            key: `key_step_${index}`
                        })
                    )}
                </StepperContentWrap>
            </TabSegmentWrap>

            {isMobile && (
                <StepperWrap>
                    {isMobile && activeStepNumber != -1 && (
                        <NullHeightWrap>
                            <ArrowWrap
                                onClick={() => {
                                    setIsOpen(!isOpen)
                                }}
                            >
                                {t(TAB_STEPS[activeStepNumber + 1].short)}
                                <StyledKeyboardArrowRight isOpen={isOpen} />
                            </ArrowWrap>
                        </NullHeightWrap>
                    )}
                    <Stepper
                        stepElements={activeStepElements}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        activeStep={activeStepNumber}
                        map={map}
                        snapMapInstance={snapMapInstance}
                        activeMapStyleName={activeMapStyleName}
                    />
                </StepperWrap>
            )}
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
    )
}

// top: ${({
//   isOpen,
//   mapHeight,
//   dynamicVH,
//   isWideOrientation,
//   mapCanvasHeight,
//   headerHeight,
// }) =>
//   isOpen
//     ? `-${45 * dynamicVH}px`
//     : isWideOrientation
//     ? `calc(${mapCanvasHeight + headerHeight + 120}px - ${mapHeight}px)`
//     : `0px`};

// height: ${({ mapHeight, isOpen, isMobile, dynamicVH }) =>
// isOpen && isMobile && `${70 * dynamicVH}px`};

// height: ${({ mapHeight, isOpen, isMobile, dynamicVH }) =>
// !isOpen && isMobile && `100%`};

// display: flex;
// flex-direction: column;
// align-items: flex-start;
// background-color: ${color("background_almost_white")};
// transition-duration: 0.5s;
// position: relative;
const MainContainer = styled.div`
    width: 100%;
`

const TabSegmentWrap = styled.div`
    /* flex-direction: column; */
    width: 100%;
    position: ${({ isOpen }) => (isOpen ? 'absolute' : 'relative')};
    top: 0px;

    ${mobile`
        position: relative;
        height: unset;
        top: 0;
        padding: 0 0.5rem;
    `}
`

const NullHeightWrap = styled.div`
    height: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
`

const StepperContentWrap = styled.div`
    background: rgba(255, 255, 255, 0.85);
    display: ${({ isOpen, isMobile }) => (!isOpen && isMobile ? 'none' : 'block')};
    min-height: ${({ screenHeight, isOpen }) => (isOpen ? `calc(${screenHeight}px - 200px)` : '0px')};

    ${mobile`
    height: ${({ topElementsHeight, isOpen, screenHeight }) => `calc(${screenHeight}px - ${topElementsHeight}px)`};
    overflow: scroll;
  `}

    ::-webkit-scrollbar {
        display: none;
    }
`

const StepperWrap = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0px;
    z-index: 1;

    ${mobile`
  position: relative;
  z-index: unset;
`}
`

const ArrowWrap = styled.div`
    background-color: ${color('background_almost_white')};
    box-shadow: 0px -2px 6px lightGrey;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    /* border: 1px solid black; */
    /* border-color: ${color('cta_color')}; */
    border-bottom: unset;
    position: relative;
    height: 25px;
    display: flex;
    justify-content: center;
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
    top: -25px;
    flex-basis: 50%;
`

const StyledKeyboardArrowRight = styled(KeyboardArrowRight)`
    height: 30px !important;
    width: 30px !important;
    color: ${color('cta_color')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(-90deg)')};
    margin: -3px 0;
`

const useStyles = makeStyles(theme => ({
    rootBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
}))
