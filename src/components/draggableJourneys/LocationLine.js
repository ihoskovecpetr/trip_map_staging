import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import TouchSwipe from '@material-ui/icons/TouchApp'
import { useDispatch } from 'react-redux'
import DeleteForeverIcon from '@material-ui/icons/Clear'
import FlightIcon from '@material-ui/icons/Flight'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'

import DriveEtaIcon from '@material-ui/icons/DriveEta'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { color, fontSize, fontWeight } from 'utils'

import GeocoderInput from 'components/GeocoderInput'
import { updateLocation, removeLocation } from 'redux/order/actions'
import { useDebounce } from 'Hooks/useDebounce'
import { useTranslation } from 'Hooks/useTranslation'
import { MODE_OF_TRANSPORT } from '@constants'
import ModeOfTransportSelect from 'components/draggableJourneys/ModeOfTransportSelect'

export default function LocationLine({ location, index, tripId, activeLocationId, setActiveLocationId, map }) {
    const dispatch = useDispatch()
    const t = useTranslation()
    const [locationInput, setLocationInput] = useState(true)
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

    const isDrivingActive = location.modeOfTransport === MODE_OF_TRANSPORT.driving
    const isFlyingActive = location.modeOfTransport === MODE_OF_TRANSPORT.flying
    const isWalkingActive = location.modeOfTransport === MODE_OF_TRANSPORT.walking

    return (
        <Draggable draggableId={location.id} index={index}>
            {provided => {
                return (
                    <>
                        <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <BtnsRow>
                                {index > 0 && (
                                    <>
                                        {/* <Flex1 /> */}
                                        <ModeOfTransportSelect location={location} />

                                        {/* <ModeOfTransportBtn
                                            onClick={() =>
                                                dispatchUpdateModeOfTransport(MODE_OF_TRANSPORT.walking, location)
                                            }
                                        >
                                            <DirectionsWalkIcon
                                                color={isWalkingActive ? 'secondary' : 'disabled'}
                                                fontSize="small"
                                                style={{
                                                    backgroundColor: isWalkingActive && 'black',
                                                    border: !isWalkingActive && '1px solid lightGrey',
                                                    borderRadius: '10px',
                                                    padding: '3px',
                                                    marginBottom: '-5px'
                                                }}
                                            />
                                        </ModeOfTransportBtn>
                                        <ModeOfTransportBtn
                                            onClick={() =>
                                                dispatchUpdateModeOfTransport(MODE_OF_TRANSPORT.driving, location)
                                            }
                                        >
                                            <DriveEtaIcon
                                                color={isDrivingActive ? 'secondary' : 'disabled'}
                                                fontSize="small"
                                                style={{
                                                    backgroundColor: isDrivingActive && 'black',
                                                    border: !isDrivingActive && '1px solid lightGrey',
                                                    borderRadius: '10px',
                                                    padding: '3px',
                                                    marginBottom: '-5px'
                                                }}
                                            />
                                        </ModeOfTransportBtn>
                                        <ModeOfTransportBtn
                                            onClick={() =>
                                                dispatchUpdateModeOfTransport(MODE_OF_TRANSPORT.flying, location)
                                            }
                                        >
                                            <FlightIcon
                                                color={isFlyingActive ? 'secondary' : 'disabled'}
                                                fontSize="small"
                                                style={{
                                                    backgroundColor: isFlyingActive && 'black',
                                                    border: !isFlyingActive && '1px solid lightGrey',
                                                    borderRadius: '10px',
                                                    padding: '3px',
                                                    marginBottom: '-5px'
                                                }}
                                            />
                                        </ModeOfTransportBtn> */}
                                    </>
                                )}
                                <Flex1 />
                                <StyledDeleteIcon
                                    onClick={() => dispatch(removeThisLocation(location.id, tripId))}
                                    fontSize="small"
                                    style={{
                                        border: '1px solid lightGrey',
                                        borderRadius: '4px',
                                        padding: '1px',
                                        margin: '4px',
                                        marginTop: '0px',
                                        zIndex: 10
                                    }}
                                />
                            </BtnsRow>
                            <InputsRow>
                                <StyledIconSwipe fontSize="small" />

                                {locationInput ? (
                                    <GeocoderInput
                                        style={{
                                            // display: "inline",
                                            flex: 5,
                                            borderLeft: '1px solid lightGrey',
                                            borderRight: '1px solid lightGrey',
                                            zIndex: activeLocationId === location.id ? 10 : 1
                                        }}
                                        initValue={location.title}
                                        setResult={e => setGeocoderResult(location, e)}
                                        clearAfterResult={false}
                                        onClick={() => {
                                            setActiveLocationId(location.id)
                                        }}
                                        map={map}
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
                                {/* <StyledDeleteIcon
                                    onClick={() => dispatch(removeThisLocation(location.id, tripId))}
                                    fontSize="small"
                                /> */}
                                <LocationBtnWrap>
                                    <LocLblBtn isActive={locationInput} onClick={() => setLocationInput(true)}>
                                        <StyledChevronLeftIcon isActive={locationInput} />
                                        {t('steps.locality.locality')}
                                    </LocLblBtn>
                                    <LocLblBtn isActive={!locationInput} onClick={() => setLocationInput(false)}>
                                        <StyledChevronLeftIcon isActive={!locationInput} />
                                        {t('steps.locality.label')}
                                    </LocLblBtn>
                                </LocationBtnWrap>
                            </InputsRow>
                        </Container>
                    </>
                )
            }}
        </Draggable>
    )
}

const Container = styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
`

const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
    font-size: 0.8rem;
    fill: ${({ isActive }) => (isActive ? 'black' : 'lightGrey')} !important;
    margin-bottom: 0px;
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

const StyledIconSwipe = styled(TouchSwipe)`
    flex: 1;
    font-size: 1.1rem !important;
    fill: grey !important;
`

const StyledDeleteIcon = styled(DeleteForeverIcon)`
    /* flex: 1; */
    /* font-size: 1rem !important; */
    // border-left: 1px solid black;
    fill: red !important;

    & :hover {
        box-shadow: ${({ isActive }) => !isActive && '0px 0px 3px grey;'};
    }
`

const BtnsRow = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3px;
`

const LocLblBtn = styled.div`
    display: flex;
    align-items: center;
    text-decoration: ${({ isActive }) => (isActive ? 'underline' : 'none')};
    border-bottom-color: transparent;
    margin: 0;
    margin-bottom: -2px;
    padding: 0 5px;
    font-size: ${fontSize('xs')};
    font-weight: ${fontWeight('regular')};
`

const ModeOfTransportBtn = styled.div`
    padding: 0 5px;
`

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
const LocationBtnWrap = styled.div`
    display: flex;
    flex-direction: column;
`
