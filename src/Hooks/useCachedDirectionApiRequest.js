import React, { useState, useEffect } from 'react'
import { getDirectionCoordinates } from 'LibGlobal/getDirectionWalkingCoordinates'

const cachedResults = {}
let promise = null

export function useCachedDirectionApiRequest(fromLng, fromLat, toLng, toLat) {
    const [result, setResult] = useState(null)

    const fromLocation = [fromLng, fromLat]
    const toLocation = [toLng, toLat]

    const asyncGetDirection = async (fromLocation, toLocation, encodedLocation) => {
        const direction = await getDirectionCoordinates(fromLocation, toLocation)
        cachedResults[encodedLocation] = direction

        setResult(direction)
        return direction
    }

    const exec = async () => {
        const encodedLocation = encodeURIComponent(`${fromLocation};${toLocation}`)
        const cachedResult = cachedResults[encodedLocation]

        if (cachedResult) {
            promise = null

            setResult(cachedResult)
            return cachedResult
        }

        if (promise) {
            setResult([])
        }

        promise = true
        setResult([])
        return await asyncGetDirection(fromLocation, toLocation, encodedLocation)
    }

    useEffect(() => {
        setResult(null)
        exec()
    }, [fromLng, fromLat, toLng, toLat])

    return result
}
