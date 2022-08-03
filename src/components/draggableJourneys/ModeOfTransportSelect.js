import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import FlightIcon from '@material-ui/icons/Flight'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import ClearIcon from '@material-ui/icons/Clear'
import DriveEtaIcon from '@material-ui/icons/DriveEta'

import { updateLocation } from 'redux/order/actions'
import { MODE_OF_TRANSPORT } from '@constants'

export default function ModeOfTransportSelect({ location }) {
    const dispatch = useDispatch()

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
    const isNoJourneyActive = location.modeOfTransport === MODE_OF_TRANSPORT.noJourney

    return (
        <>
            <ModeOfTransportBtn onClick={() => dispatchUpdateModeOfTransport(MODE_OF_TRANSPORT.noJourney, location)}>
                <ClearIcon
                    color={'secondary'}
                    fontSize="small"
                    style={{
                        backgroundColor: isNoJourneyActive && 'black',
                        border: !isNoJourneyActive && '1px solid grey',
                        borderRadius: '10px',
                        padding: '3px',
                        marginBottom: '-5px'
                    }}
                />
            </ModeOfTransportBtn>
            <ModeOfTransportBtn onClick={() => dispatchUpdateModeOfTransport(MODE_OF_TRANSPORT.walking, location)}>
                <DirectionsWalkIcon
                    color={'secondary'}
                    fontSize="small"
                    style={{
                        backgroundColor: isWalkingActive && 'black',
                        border: !isWalkingActive && '1px solid grey',
                        borderRadius: '10px',
                        padding: '3px',
                        marginBottom: '-5px'
                    }}
                />
            </ModeOfTransportBtn>
            <ModeOfTransportBtn onClick={() => dispatchUpdateModeOfTransport(MODE_OF_TRANSPORT.driving, location)}>
                <DriveEtaIcon
                    color={'secondary'}
                    fontSize="small"
                    style={{
                        backgroundColor: isDrivingActive && 'black',
                        border: !isDrivingActive && '1px solid grey',
                        borderRadius: '10px',
                        padding: '3px',
                        marginBottom: '-5px'
                    }}
                />
            </ModeOfTransportBtn>
            <ModeOfTransportBtn onClick={() => dispatchUpdateModeOfTransport(MODE_OF_TRANSPORT.flying, location)}>
                <FlightIcon
                    color={'secondary'}
                    fontSize="small"
                    style={{
                        backgroundColor: isFlyingActive && 'black',
                        border: !isFlyingActive && '1px solid grey',
                        borderRadius: '10px',
                        padding: '3px',
                        marginBottom: '-5px'
                    }}
                />
            </ModeOfTransportBtn>
        </>
    )
}

const ModeOfTransportBtn = styled.div`
    padding: 0 5px;
`
