import React, { useEffect, useState } from 'react'
import ReactMapboxGl, { Layer, Feature, Source, Marker } from 'react-mapbox-gl'
import { MAP_STYLED_AND_FLIGHT_COLOR } from 'constants/constants'
import { useActiveMapStyleSelector } from 'redux/order/reducer'
import { useGetDirections } from 'Hooks/useGetDirections'
import { getGeoArc } from 'LibGlobal/getGeoArc'

const lineLayout = {
    'line-cap': 'round',
    'line-join': 'round'
}

export default function RoadMapLines({ lineWidth, currentPoint, previousPoint }) {
    const activeMapStyleName = useActiveMapStyleSelector()
    const [directions, setDirections] = useState([])
    const getDirrection = useGetDirections()

    const handleDirrectionAsync = async (curPointLocation, prevPointLocation) => {
        const directionsLocal = await getDirrection(...curPointLocation, ...prevPointLocation)
        setDirections(directionsLocal)
    }

    useEffect(() => {
        handleDirrectionAsync(currentPoint.location, previousPoint.location)
    }, [currentPoint, previousPoint])

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
