import { useState } from 'react'

const getEndpoint = (event, map) => {
    if (map) {
        const mapCenterObject = map.getCenter()

        const encodedCentrum = encodeURIComponent(`${mapCenterObject.lng},${mapCenterObject.lat}`)
        return `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?proximity=${encodedCentrum}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN}&autocomplete=true`
    } else {
        return `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN}&autocomplete=true`
    }
}

const useGeocodeInput = (initialValue, map) => {
    const [value, setValue] = useState(initialValue)
    const [suggestions, setSuggestions] = useState([])
    const [fullResult, setFullResult] = useState()

    const handleChange = async event => {
        setValue(event.target.value)

        try {
            const endpoint = getEndpoint(event, map)
            const response = await fetch(endpoint)
            const result = await response.json()
            setSuggestions(result?.features)
            setFullResult(result)
        } catch (error) {
            console.log('Error fetching data, ', error)
        }
    }

    return {
        value,
        onChange: handleChange,
        setValue,
        suggestions,
        setSuggestions,
        fullResult
    }
}

export default useGeocodeInput
