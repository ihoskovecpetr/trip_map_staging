import React, { useState, useEffect } from 'react'
import { getDirectionWalkingCoordinates } from 'LibGlobal/getDirectionWalkingCoordinates'
import { getDirectionDrivingCoordinates } from 'LibGlobal/getDirectionCoordinates'
import { MODE_OF_TRANSPORT } from 'constants/constants'

const cachedResults = {}
const cachedPromises = {}

const getDirectionByMode = mode => {
    if (mode === MODE_OF_TRANSPORT.walking) {
        return getDirectionWalkingCoordinates
    }
    if (mode === MODE_OF_TRANSPORT.driving) {
        return getDirectionDrivingCoordinates
    }
}

export function useGetDirections(modeOfTransport) {
    const asyncGetDirection = async (fromLocation, toLocation, encodedLocation) => {
        const direction = await getDirectionByMode(modeOfTransport)(fromLocation, toLocation)
        cachedResults[`${encodedLocation}_${modeOfTransport}`] = direction

        return direction
    }

    return async (fromLng, fromLat, toLng, toLat) => {
        const fromLocation = [fromLng, fromLat]
        const toLocation = [toLng, toLat]
        const encodedLocation = encodeURIComponent(`${fromLocation};${toLocation}`)
        const foundCachedResult = cachedResults[`${encodedLocation}_${modeOfTransport}`]

        if (foundCachedResult) {
            cachedPromises[encodedLocation] = null

            return foundCachedResult
        }

        if (cachedPromises[encodedLocation]) {
            return cachedPromises[encodedLocation]
        }

        cachedPromises[encodedLocation] = await asyncGetDirection(fromLocation, toLocation, encodedLocation)
        return await asyncGetDirection(fromLocation, toLocation, encodedLocation)
    }
}
