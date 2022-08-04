import React, { useState } from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AddIcon from '@material-ui/icons/Add'

import { useTranslation } from 'Hooks/useTranslation'
import { MODE_OF_TRANSPORT } from '@constants'
import LocationLine from './LocationLine'
import GeocoderInput from 'components/GeocoderInput'

import { addNewLocationDraggable } from 'redux/order/actions'
import { color } from 'utils'

const Container = styled.div``

const HorizontalLine = styled.p`
    // background-color: ${color('muted')};
    // height: 1px;
    // width: 100%;
    margin-bottom: 20px;
`

const NewLocationContainer = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    /* margin-bottom: ${({ isTripActive }) => isTripActive && '30px'}; */
    margin-top: 30px;
    margin-bottom: 5px;
    top: ${({ isTripActive }) => isTripActive && '-5px'};
`

const Flex1 = styled.div`
    flex: 1;
    flex-basis: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Flex2 = styled.div`
    flex: 12;
    display: flex;
`
const Flex3 = styled.div`
    flex: 1;
    flex-basis: 30px;
`
const NewLocation = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background: black;
    cursor: pointer;
    margin: 0 3px;
    /* margin-top: 10px; */
    border-radius: 5px;
    box-shadow: 0 0 4px lightGrey;
    height: 20px;
`

const LocationsList = styled.div``

const TOP_BOTTOM = {
    top: 'top',
    bottom: 'bottom'
}

export default function TripSingle({
    tripObj,
    locations,
    map,
    isTripActive,
    setActiveTripId,
    activeLocationId,
    setActiveLocationId
}) {
    const dispatch = useDispatch()
    const [thisActiveNewInput, setThisActiveNewInput] = useState(false)
    const t = useTranslation()
    const [topOrBottom, setTopOrBottom] = useState(TOP_BOTTOM.top)

    const setGeocoderResult = (tripId, result, modeOfTransport, reverse) => {
        const sourceId = 'SourceId_' + Math.random()
        const titleSourceId = 'TitleSourceId_' + Math.random()
        const placeNameArr = result.place_name.split(',')
        const newTitle = placeNameArr[0]

        dispatch(
            addNewLocationDraggable({
                body: {
                    location: result.geometry.coordinates,
                    sourceId: sourceId,
                    titleSourceId: titleSourceId,
                    title: newTitle,
                    titleLabel: newTitle,
                    titleLabelDisplayed: true,
                    modeOfTransport: modeOfTransport ?? MODE_OF_TRANSPORT.driving,
                    titleLocation: result.geometry.coordinates
                },
                tripId: tripId,
                reverse: reverse
            })
        )
    }

    const activateNewLocationGeoInput = (tripId, topBottom) => {
        console.log({ topBottom })
        setActiveTripId(tripId)
        setActiveLocationId(null)
        setTopOrBottom(topBottom)
    }

    const lastModeOfTransport = locations[locations.length - 1].modeOfTransport

    return (
        <Container>
            <NewLocationContainer isTripActive={isTripActive}>
                <Flex1>
                    {isTripActive && topOrBottom === TOP_BOTTOM.top ? (
                        <ArrowForwardIcon
                            style={{
                                fill: '#f6aa1c'
                            }}
                        />
                    ) : (
                        <NewLocation onClick={() => activateNewLocationGeoInput(tripObj.id, TOP_BOTTOM.top)}>
                            <AddIcon
                                style={{
                                    fill: '#f6aa1c'
                                }}
                            />
                        </NewLocation>
                    )}
                </Flex1>

                {isTripActive && topOrBottom === TOP_BOTTOM.top && (
                    <>
                        <Flex2>
                            <GeocoderInput
                                style={{
                                    display: 'inline',
                                    width: '100%',
                                    zIndex: thisActiveNewInput ? 11 : 'unset',
                                    border: '1px solid #f6aa1c',
                                    borderRadius: '5px'
                                }}
                                inputStyle={{
                                    borderRadius: '3px',
                                    boxShadow: '0px 0px 5px grey',
                                    width: '100%'
                                }}
                                placeholder={t('steps.locality.nextDestination')}
                                setResult={e => setGeocoderResult(tripObj.id, e, lastModeOfTransport, true)}
                                clearOnFocus
                                onClick={() => {
                                    setThisActiveNewInput(true)
                                }}
                                onBlur={() => {
                                    setThisActiveNewInput(false)
                                }}
                                map={map}
                            />
                        </Flex2>
                        <Flex3></Flex3>
                    </>
                )}
            </NewLocationContainer>
            <Droppable droppableId={tripObj.id}>
                {provided => (
                    <LocationsList ref={provided.innerRef} {...provided.droppableProps}>
                        {locations.map((location, index) => (
                            <LocationLine
                                key={location.id}
                                location={location}
                                index={index}
                                tripId={tripObj.id}
                                activeLocationId={activeLocationId}
                                setActiveLocationId={setActiveLocationId}
                                map={map}
                            />
                        ))}
                        {provided.placeholder}
                    </LocationsList>
                )}
            </Droppable>

            <NewLocationContainer isTripActive={isTripActive}>
                <Flex1>
                    {isTripActive && topOrBottom === TOP_BOTTOM.bottom ? (
                        <ArrowForwardIcon
                            style={{
                                fill: '#f6aa1c'
                            }}
                        />
                    ) : (
                        <NewLocation onClick={() => activateNewLocationGeoInput(tripObj.id, TOP_BOTTOM.bottom)}>
                            <AddIcon
                                style={{
                                    fill: '#f6aa1c'
                                }}
                            />
                        </NewLocation>
                    )}
                </Flex1>

                {isTripActive && topOrBottom === TOP_BOTTOM.bottom && (
                    <>
                        <Flex2>
                            <GeocoderInput
                                style={{
                                    display: 'inline',
                                    width: '100%',
                                    zIndex: thisActiveNewInput ? 11 : 'unset',
                                    border: '1px solid #f6aa1c',
                                    borderRadius: '5px'
                                }}
                                inputStyle={{
                                    borderRadius: '3px',
                                    boxShadow: '0px 0px 5px grey',
                                    width: '100%'
                                }}
                                placeholder={t('steps.locality.nextDestination')}
                                setResult={e => setGeocoderResult(tripObj.id, e, lastModeOfTransport, false)}
                                clearOnFocus
                                onClick={() => {
                                    setThisActiveNewInput(true)
                                }}
                                onBlur={() => {
                                    setThisActiveNewInput(false)
                                }}
                                map={map}
                            />
                        </Flex2>
                        <Flex3></Flex3>
                    </>
                )}
            </NewLocationContainer>

            <HorizontalLine />
        </Container>
    )
}
