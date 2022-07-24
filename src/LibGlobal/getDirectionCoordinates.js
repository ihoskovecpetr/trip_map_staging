const getDirectionCoordinates = async (fromLocation, toLocation) => {
    const encodedLocation = encodeURIComponent(`${fromLocation};${toLocation}`)

    try {
        const endpoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${encodedLocation}?alternatives=true&continue_straight=true&geometries=geojson&overview=full&steps=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN}`
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
    getDirectionCoordinates
}
