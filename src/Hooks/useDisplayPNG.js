import { useState, useEffect, useMemo } from 'react'

import GreenOrangeWEBP from 'assets/mapStyles/webp/GreenOrange.webp'

export function useDisplayPNG() {
    const [displayPNG, setDisplayPNG] = useState(false)

    useEffect(() => {
        const imageEl = document.createElement('img')

        if (imageEl) {
            imageEl.addEventListener('error', event => {
                setDisplayPNG(true)
            })

            imageEl.addEventListener('load', event => {
                setDisplayPNG(false)
            })
        }

        imageEl.src = GreenOrangeWEBP

        return () => {
            imageEl?.removeEventListener('error', event => {
                eventCallback('Error', event)
            })
        }
    }, [])

    const displayPNG_Memo = useMemo(() => {
        return displayPNG
    }, [displayPNG])

    return { displayPNG: displayPNG_Memo }
}
