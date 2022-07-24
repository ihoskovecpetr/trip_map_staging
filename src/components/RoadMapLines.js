import React, { useEffect, useState } from 'react'
import { Layer, Feature } from 'react-mapbox-gl'
import { MAP_STYLED_AND_FLIGHT_COLOR } from 'constants/constants'
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
    const getDirrection = useGetDirections()
    const [isWarning, setIsWarning] = useState(false)

    const handleDirrectionAsync = async (curPointLocation, prevPointLocation) => {
        try {
            const directionsLocal = await getDirrection(...curPointLocation, ...prevPointLocation)
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

    return (
        <Layer
            type="line"
            layout={lineLayout}
            key={`${currentPoint.location[0]}_road`}
            paint={{
                'line-color': MAP_STYLED_AND_FLIGHT_COLOR[activeMapStyleName].colorMain,
                'line-width': lineWidth + 1
            }}
        >
            <Feature coordinates={directions} />
        </Layer>
    )
}
