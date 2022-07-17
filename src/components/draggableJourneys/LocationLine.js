import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'
import { useDispatch } from 'react-redux'
import DeleteForeverIcon from '@material-ui/icons/Clear'
import { color, fontSize, fontWeight } from 'utils'

import GeocoderInput from 'components/GeocoderInput_new'
import { updateLocation, removeLocation } from 'redux/order/actions'
import { useDebounce } from 'Hooks/useDebounce'
import { useTranslation } from 'Hooks/useTranslation'
import { MODE_OF_TRANSPORT } from '@constants'

const Container = styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
`

const InputsRow = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 4px lightGrey;
    border-radius: 5px;
    width: 98%;
    margin: 0 1%;
`

const StyledIconShuffle = styled(CompareArrowsIcon)`
    flex: 1;
    transform: rotate(90deg);
    font-size: 1.5rem !important;
`

const StyledDeleteIcon = styled(DeleteForeverIcon)`
    flex: 1;
    font-size: 1.5rem !important;
    // border-left: 1px solid black;
    fill: red !important;
`

const BtnsRow = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 0 10px;
`

const LocLblBtn = styled.div`
    background-color: ${({ isActive }) => (isActive ? 'black' : 'white')};
    color: ${({ isActive }) => (isActive ? 'white' : 'black')};
    border: 1px solid lightGrey;
    border-bottom-color: transparent;

    padding: 0 5px;
    font-size: ${fontSize('xs')};
    font-weight: ${fontWeight('light')};
`

const ModeOfTransportBtn = styled.div`
    /* background-color: ${({ isActive }) => (isActive ? 'black' : 'white')}; */
    /* color: ${({ isActive }) => (isActive ? 'white' : 'black')}; */
    text-decoration: ${({ isActive }) => (isActive ? 'underline' : 'none')};
    /* border: 1px solid lightGrey; */
    /* border-bottom-color: transparent; */
    padding: 0 5px;
    font-size: ${fontSize('xs')};
    font-weight: ${fontWeight('light')};
`

const StyledGeocoderInput = styled(GeocoderInput)``

const InputWrap = styled.div`
    flex: 5;
`

const Flex1 = styled.div`
    flex: 1;
`

const StyledInput = styled.input`
    width: 100%;
    padding: 10px 10px;
    font-size: ${fontSize('default')};
    font-weight: ${fontWeight('regular')};
    border: none;
    border-left: 1px solid lightGrey;
    border-right: 1px solid lightGrey;
    border-radius: 0px;
`

export default function LocationLine({ location, index, tripId, activeLocationId, setActiveLocationId }) {
    const dispatch = useDispatch()
    const t = useTranslation()
    const [locationInput, setLocationInput] = useState(true)
    const [activeGeocoder, setActiveGeocoder] = useState(false)
    const debounce = useDebounce({ delayInMS: 1000 })

    const setGeocoderResult = (locationObj, result) => {
        const sourceId = 'SourceId_' + Math.random()
        const titleSourceId = 'TitleSourceId_' + Math.random()
        const placeNameArr = result.place_name.split(',')
        const newTitle = placeNameArr[0]

        dispatch(
            updateLocation({
                ...locationObj,
                location: result.geometry.coordinates,
                sourceId: sourceId,
                title: newTitle,
                titleLabel: newTitle,
                titleLabelDisplayed: true,
                modeOfTransport: MODE_OF_TRANSPORT.driving,
                titleLocation: result.geometry.coordinates,
                titleSourceId
            })
        )
    }

    const dispatchUpdateLabel = ({ value, locationObj }) => {
        dispatch(
            updateLocation({
                ...locationObj,
                titleLabel: value
            })
        )
    }
    const updateLabel = locationObj => e => {
        debounce(dispatchUpdateLabel, { value: e.target.value, locationObj })
    }

    const removeThisLocation = (locationId, tripId) => () => {
        dispatch(removeLocation({ locationId, tripId }))
    }

    const dispatchUpdateModeOfTransport = (newMode, locationObj) => {
        dispatch(
            updateLocation({
                ...locationObj,
                modeOfTransport: newMode
            })
        )
    }

    return (
        <Draggable draggableId={location.id} index={index}>
            {provided => {
                return (
                    <>
                        <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <BtnsRow>
                                {index > 0 && (
                                    <>
                                        <ModeOfTransportBtn
                                            isActive={location.modeOfTransport === MODE_OF_TRANSPORT.driving}
                                            onClick={() =>
                                                dispatchUpdateModeOfTransport(MODE_OF_TRANSPORT.driving, location)
                                            }
                                        >
                                            {t('steps.locality.driving')}
                                        </ModeOfTransportBtn>
                                        <ModeOfTransportBtn
                                            isActive={location.modeOfTransport === MODE_OF_TRANSPORT.flying}
                                            onClick={() =>
                                                dispatchUpdateModeOfTransport(MODE_OF_TRANSPORT.flying, location)
                                            }
                                        >
                                            {t('steps.locality.flying')}
                                        </ModeOfTransportBtn>
                                    </>
                                )}
                                <Flex1 />

                                <LocLblBtn isActive={locationInput} onClick={() => setLocationInput(true)}>
                                    {t('steps.locality.locality')}
                                </LocLblBtn>
                                <LocLblBtn isActive={!locationInput} onClick={() => setLocationInput(false)}>
                                    {t('steps.locality.label')}
                                </LocLblBtn>
                            </BtnsRow>
                            <InputsRow>
                                <StyledIconShuffle />

                                {locationInput ? (
                                    <StyledGeocoderInput
                                        style={{
                                            // display: "inline",
                                            flex: 5,
                                            borderLeft: '1px solid lightGrey',
                                            borderRight: '1px solid lightGrey',
                                            zIndex: activeLocationId === location.id ? 10 : 1
                                        }}
                                        value={location.title}
                                        setResult={e => setGeocoderResult(location, e)}
                                        clearAfterResult={false}
                                        onClick={() => {
                                            setActiveLocationId(location.id)
                                        }}
                                    />
                                ) : (
                                    <InputWrap>
                                        <StyledInput
                                            // variant="outlined"
                                            defaultValue={location.titleLabel}
                                            onChange={updateLabel(location)}
                                        />
                                    </InputWrap>
                                )}
                                <StyledDeleteIcon onClick={() => dispatch(removeThisLocation(location.id, tripId))} />
                            </InputsRow>
                        </Container>
                    </>
                )
            }}
        </Draggable>
    )
}
