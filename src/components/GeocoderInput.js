import React, { useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'

import { color } from 'utils'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_REFRESH_TOKEN
let geocoder

export default function GeocoderInput({
    id,
    value,
    setResult,
    placeholder,
    clearAfterResult = true,
    style,
    focusCallback,
    blurCallback
}) {
    const ref = useRef()

    useEffect(() => {
        geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: {
                // color: "transparent",
            },
            placeholder: placeholder ?? 'Další bod cesty'
        })
        // document.getElementById(id).appendChild(geocoder.onAdd(map));

        geocoder.addTo(ref.current)

        geocoder._inputEl.addEventListener('focus', focusCallback)

        return () => {
            geocoder._inputEl.removeEventListener('focus', focusCallback)
        }
    }, [id])

    useEffect(() => {
        // document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0].focus();
    }, [])

    useEffect(() => {
        const childNodes = ref.current?.childNodes

        if (childNodes && value) {
            childNodes[0].childNodes[1].value = value
        }

        geocoder.on('result', transformResult)
        geocoder.on('init', () => {})

        return () => {
            geocoder.off('result', transformResult)
        }
    }, [])

    const transformResult = e => {
        setResult(e)

        if (clearAfterResult) {
            console.log('Clearing_result')
            geocoder.clear() // to remove blue dot
        }
        // document.getElementById(id).innerHTML = "Filled";
        // document.getElementById(id).innerHTML = value;
    }

    return <StyledDiv id={id} ref={ref} style={style}></StyledDiv>
}

const StyledDiv = styled.div`
    input {
        // border: 1px solid ${color('cta_color')};
        // border-radius: 5px;
    }
    :nth-child(1) {
        box-shadow: 0 0 0;
        border-bottom: 1px solid black;
        border-radius: 0px;
        width: 100%;
    }
`
