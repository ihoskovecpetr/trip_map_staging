/** @jsx jsx */
import React from 'react'
import { jsx, Text } from 'theme-ui'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import PaleBlue from 'assets/mapStyles/webp/PaleBlue.webp'
import SandyDark from 'assets/mapStyles/webp/SandyDark.webp'
import WhiteBlue from 'assets/mapStyles/webp/WhiteBlue.webp'
import BlackWhite from 'assets/mapStyles/webp/BlackWhite.webp'
import BlackLand from 'assets/mapStyles/webp/BlackLand.webp'
import GreyBlue from 'assets/mapStyles/webp/GreyBlue.webp'
import DoubleBlue from 'assets/mapStyles/webp/DoubleBlue.webp'
import RedBlue from 'assets/mapStyles/webp/RedBlue.webp'
import YellowGreen from 'assets/mapStyles/webp/YellowGreen.webp'
import BlueYellow from 'assets/mapStyles/webp/BlueYellow.webp'
import GreenOrange from 'assets/mapStyles/webp/GreenOrange.webp'
import RedWhite from 'assets/mapStyles/webp/RedWhite.webp'

import PaleBluePNG from 'assets/mapStyles/png/PaleBlue.png'
import SandyDarkPNG from 'assets/mapStyles/png/SandyDark.png'
import WhiteBluePNG from 'assets/mapStyles/png/WhiteBlue.png'
import BlackWhitePNG from 'assets/mapStyles/png/BlackWhite.png'
import BlackLandPNG from 'assets/mapStyles/png/BlackLand.png'
import DarkBlueMonocolorPNG from 'assets/mapStyles/png/DarkBlueMonocolor.png'
import DoubleBluePNG from 'assets/mapStyles/png/DoubleBlue.png'
import RedBluePNG from 'assets/mapStyles/png/RedBlue.png'
import GreenOrangePNG from 'assets/mapStyles/png/GreenOrange.png'
import BlueYellowPNG from 'assets/mapStyles/png/BlueYellow.png'
import YellowGreenPNG from 'assets/mapStyles/png/YellowGreen.png'
import RedWhitePNG from 'assets/mapStyles/png/RedWhite.png'

import { MAP_STYLES_NAMES } from '../../constants/constants'
import { useIsMobile } from '../../Hooks/useIsMobile'
import { useDisplayPNG } from '../../Hooks/useDisplayPNG'
import { color, font, fontSize, fontWeight, mobile } from 'utils'
import { useActiveMapStyleSelector } from 'redux/order/reducer'
import HeadingText from './atoms/HeadingText'
import StepContainer from './atoms/StepContainer'
import { TAB_STEPS } from '@constants'
import { useTranslation } from 'Hooks/useTranslation'

import { setActiveMapStyleAction, setJourneysIsEnabled } from 'redux/order/actions'
import { useCachedDirectionApiRequest } from 'Hooks/useCachedDirectionApiRequest'

export default function Step4Colors({ index }) {
    const dispatch = useDispatch()
    const activeMapStyleName = useActiveMapStyleSelector()
    const t = useTranslation()

    const { isMobile } = useIsMobile()
    const { displayPNG } = useDisplayPNG()

    const changeActiveStyle = style => () => {
        dispatch(setJourneysIsEnabled(false))

        dispatch(setActiveMapStyleAction(style))

        setTimeout(() => {
            dispatch(setJourneysIsEnabled(true))
        }, 1000)
    }

    const getMapStyleImg = mapStyle => {
        switch (mapStyle) {
            case MAP_STYLES_NAMES.WHITE_BLUE:
                return displayPNG ? WhiteBluePNG : WhiteBlue
            case MAP_STYLES_NAMES.SANDY_DARK:
                return displayPNG ? SandyDarkPNG : SandyDark
            case MAP_STYLES_NAMES.PALE_BLUE:
                return displayPNG ? PaleBluePNG : PaleBlue
            case MAP_STYLES_NAMES.BLACK_WHITE:
                return displayPNG ? BlackWhitePNG : BlackWhite
            case MAP_STYLES_NAMES.BLACK_LAND:
                return displayPNG ? BlackLandPNG : BlackLand
            case MAP_STYLES_NAMES.GREY_BLUE:
                return displayPNG ? DarkBlueMonocolorPNG : GreyBlue
            case MAP_STYLES_NAMES.DOUBLE_BLUE:
                return displayPNG ? DoubleBluePNG : DoubleBlue
            case MAP_STYLES_NAMES.RED_BLUE:
                return displayPNG ? RedBluePNG : RedBlue
            case MAP_STYLES_NAMES.YELLOW_GREEN:
                return displayPNG ? YellowGreenPNG : YellowGreen
            case MAP_STYLES_NAMES.BLUE_YELLOW:
                return displayPNG ? BlueYellowPNG : BlueYellow
            case MAP_STYLES_NAMES.GREEN_ORANGE:
                return displayPNG ? GreenOrangePNG : GreenOrange
            case MAP_STYLES_NAMES.RED_WHITE:
                return displayPNG ? RedWhitePNG : RedWhite

            default:
                return displayPNG ? PaleBluePNG : PaleBlue
        }
    }

    return (
        <StepContainer isMobile={isMobile}>
            <HeadingText isMobile={isMobile}>
                {index}. {t(TAB_STEPS[index].full)}
            </HeadingText>
            <ColorsWrap>
                {Object.values(MAP_STYLES_NAMES).map((style, index) => (
                    <div className={activeMapStyleName === style && 'active'} sx={styles.mapColorsItem} key={index}>
                        <ImageWrap active={activeMapStyleName === style}>
                            <StyledImage
                                src={getMapStyleImg(style)}
                                id={`id_${index}`}
                                active={activeMapStyleName === style}
                                alt="Map style image"
                                onClick={changeActiveStyle(style)}
                            />
                        </ImageWrap>
                        <ItemStyleText active={activeMapStyleName === style} onClick={changeActiveStyle(style)}>
                            {!isMobile && style}
                        </ItemStyleText>
                    </div>
                ))}
            </ColorsWrap>
        </StepContainer>
    )
}

const styles = {
    mapColorsItem: {
        width: ['23%', null, null],
        margin: ['1%', '1%', null],
        padding: '0px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
        // "&.active p": {
        //   color: "cta_color",
        // },
    }
}
const ColorsWrap = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    padding: 10px 10px;
    flex-wrap: wrap;
`

const ImageWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const StyledImage = styled.img`
    width: 3rem;
    height: 3rem;
    // padding-bottom: 100%;
    border-radius: 25%;
    outline: none;
    // background: ${({ src }) => `url(${src})`};
    // background-size: cover;
    color: rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 0px 3px;
    color: ${({ active }) => active && color('cta_color')};
`

const ItemStyleText = styled.p`
    overflow: hidden;
    height: 100%;
    width: 100%;
    margin: 0;
    margin-top: 15px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: middle;
    line-height: 1.2;
    letter-spacing: 1.1px;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 12px;
    // color: ${color('muted')};
    font-weight: ${({ active }) => active && fontWeight('bold')};

    ${mobile`
    width: unset;
  `}
`
