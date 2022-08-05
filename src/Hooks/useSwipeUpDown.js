import React, { useEffect } from 'react'

let touchstartY = 0
let touchendY = 0

export function useSwipeUpDown({ setIsOpen }) {
    function checkDirection() {
        if (touchendY < touchstartY) {
        }
        if (touchendY > touchstartY) {
            setIsOpen(false)
        }
    }

    const setTouchStartY = e => {
        touchstartY = e.changedTouches[0].screenY
    }

    const measureTouchDirection = e => {
        touchendY = e.changedTouches[0].screenY
        checkDirection()
    }

    useEffect(() => {
        document.addEventListener('touchstart', setTouchStartY)

        document.addEventListener('touchend', measureTouchDirection)
        return () => {
            document.removeEventListener('touchstart', setTouchStartY)
            document.removeEventListener('touchend', measureTouchDirection)
        }
    }, [])

    return {}
}
