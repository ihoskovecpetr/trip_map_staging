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
                <StyledClearIcon
                    color={'secondary'}
                    fontSize="small"
                    isActive={isNoJourneyActive}
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
                <StyledDirectionsWalkIcon
                    color={'secondary'}
                    fontSize="small"
                    isActive={isWalkingActive}
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
                <StyledDriveEtaIcon
                    color={'secondary'}
                    fontSize="small"
                    isActive={isDrivingActive}
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
                <StyledFlightIcon
                    color={'secondary'}
                    fontSize="small"
                    isActive={isFlyingActive}
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

const StyledFlightIcon = styled(FlightIcon)`
    & :hover {
        box-shadow: ${({ isActive }) => !isActive && '0px 0px 3px black;'};
    }
`

const StyledDriveEtaIcon = styled(DriveEtaIcon)`
    & :hover {
        box-shadow: ${({ isActive }) => !isActive && '0px 0px 3px black;'};
    }
`

const StyledDirectionsWalkIcon = styled(DirectionsWalkIcon)`
    & :hover {
        box-shadow: ${({ isActive }) => !isActive && '0px 0px 3px black;'};
    }
`

const StyledClearIcon = styled(ClearIcon)`
    & :hover {
        box-shadow: ${({ isActive }) => !isActive && '0px 0px 3px black;'};
    }
`
