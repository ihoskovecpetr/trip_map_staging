const getDirectionWalkingCoordinates = async (fromLocation, toLocation, travelMode) => {
    const encodedLocation = encodeURIComponent(`${fromLocation};${toLocation}`)

    try {
        const endpoint = `https://api.mapbox.com/directions/v5/mapbox/walking/${encodedLocation}?alternatives=true&continue_straight=true&geometries=geojson&language=en&exclude=ferry&overview=full&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN}`
        const response = await fetch(endpoint)
        const result = await response.json()

        const routeCoordinates = result.routes[0].geometry.coordinates
        return routeCoordinates
    } catch (error) {
        console.log('Error from: api.mapbox.com/directions/v5/mapbox/driving/ ', error)
        throw error
    }
}

module.exports = {
    getDirectionWalkingCoordinates
}
