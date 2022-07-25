import React, { useEffect, useState } from 'react'
import { Layer, Feature } from 'react-mapbox-gl'
import { MAP_STYLED_AND_FLIGHT_COLOR, MODE_OF_TRANSPORT } from 'constants/constants'
import { useActiveMapStyleSelector } from 'redux/order/reducer'
import { useGetDirections } from 'Hooks/useGetDirections'
import DirectionsNotFoundPopup from 'components/DirectionsNotFoudPopup'

const lineLayout = {
    'line-cap': 'round',
    'line-join': 'round'
}

export default function RoadMapLines({ lineWidth, currentPoint, previousPoint }) {
    const activeMapStyleName = useActiveMapStyleSelector()
    const [directions, setDirections] = useState([])
    const getDirrection = useGetDirections(currentPoint.modeOfTransport)
    const [isWarning, setIsWarning] = useState(false)

    const handleDirrectionAsync = async (curPointLocation, prevPointLocation) => {
        try {
            const directionsLocal = await getDirrection(
                ...curPointLocation,
                ...prevPointLocation
                // currentPoint.modeOfTransport
            )
            console.log('currentPoint_modeOfTransport', currentPoint.modeOfTransport)
            setDirections(directionsLocal)
        } catch (e) {
            console.log('Catched_no_road_warning')
            setIsWarning(true)
        }
    }

    useEffect(() => {
        handleDirrectionAsync(currentPoint.location, previousPoint.location)
    }, [currentPoint, previousPoint])

    if (isWarning) {
        return <DirectionsNotFoundPopup currentPoint={currentPoint} previousPoint={previousPoint} />
    }

    const dashArrByMode = currentPoint.modeOfTransport === MODE_OF_TRANSPORT.driving ? [1, 0] : [2, 2]

    const lineWidthByMode = currentPoint.modeOfTransport === MODE_OF_TRANSPORT.driving ? lineWidth + 1 : lineWidth + 1

    return (
        <Layer
            type="line"
            layout={lineLayout}
            key={`${currentPoint.location[0]}_road`}
            paint={{
                'line-color': MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName].colorPath,
                'line-width': lineWidthByMode,
                'line-dasharray': dashArrByMode
            }}
        >
            <Feature coordinates={directions} />
        </Layer>
    )
}
