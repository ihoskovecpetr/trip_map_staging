import React, { useState, useEffect } from 'react'
import { getDirectionCoordinates } from 'LibGlobal/getDirectionCoordinates'

const cachedResults = {}
const cachedPromises = {}

export function useGetDirections() {
    const asyncGetDirection = async (fromLocation, toLocation, encodedLocation) => {
        const direction = await getDirectionCoordinates(fromLocation, toLocation)
        cachedResults[encodedLocation] = direction

        return direction
    }

    return async (fromLng, fromLat, toLng, toLat) => {
        const fromLocation = [fromLng, fromLat]
        const toLocation = [toLng, toLat]
        const encodedLocation = encodeURIComponent(`${fromLocation};${toLocation}`)
        const cachedResult = cachedResults[encodedLocation]

        if (cachedResult) {
            cachedPromises[encodedLocation] = null

            return cachedResult
        }

        if (cachedPromises[encodedLocation]) {
            return cachedPromises[encodedLocation]
        }

        cachedPromises[encodedLocation] = await asyncGetDirection(fromLocation, toLocation, encodedLocation)
        return await asyncGetDirection(fromLocation, toLocation, encodedLocation)
    }
}
