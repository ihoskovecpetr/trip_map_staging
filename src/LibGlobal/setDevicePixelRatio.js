export const setDevicePixelRatio = ratio => {
    Object.defineProperty(window, 'devicePixelRatio', {
        get: function () {
            return ratio
        }
    })
}
