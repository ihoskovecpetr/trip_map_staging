import React from 'react'
import { useDispatch } from 'react-redux'

import { createFinalImage } from 'LibGlobal/createFinalImage'
import { useTitlesSelector } from 'redux/order/reducer'
import { setJourneysSpecs } from 'redux/order/actions'
import { getCurrentPixelRatio } from 'LibGlobal/getCurrentPixelRatio'

import { PRINT_CANVAS_BASE_PX, ORIENTATIONS, LABEL_SIZE_KOEF } from 'constants/constants'

const mapWrapperId = 'map_wrap_id'

export function useQualityImageCreator() {
    const dispatch = useDispatch()
    const mapTitles = useTitlesSelector()

    return async ({ map, snapMapInstance, activeLayoutName, product, activeMapStyleName, options }) => {
        const { definitionConstant = 1, isLowResolution = false } = options

        let snapshotMapWrapper = document.getElementById('snapshot_map_wrapper')

        const height = document.getElementById(mapWrapperId)?.getBoundingClientRect().height
        const width = document.getElementById(mapWrapperId)?.getBoundingClientRect().width

        const isWideOrientation = product?.sizeObject?.orientation === ORIENTATIONS.wide

        const computedPixelBase = Math.floor(PRINT_CANVAS_BASE_PX / definitionConstant)

        const currentVersionPixelRatio = getCurrentPixelRatio(product.variantId)

        const computedPixelRatio = Number((currentVersionPixelRatio * definitionConstant).toFixed(2))

        let multiple
        let baseLongSize

        if (isWideOrientation) {
            multiple = computedPixelBase / width
            baseLongSize = width
        } else {
            multiple = computedPixelBase / height
            baseLongSize = height
        }
        if (isLowResolution) {
            multiple = multiple / 5
        }

        Object.assign(snapshotMapWrapper.style, {
            width: `${width * multiple}px`,
            height: `${height * multiple}px`,
            display: 'block'
        })

        dispatch(
            setJourneysSpecs({
                labelSizePrint: LABEL_SIZE_KOEF * baseLongSize * multiple
            })
        )

        return createFinalImage({
            originalMapObject: map,
            snapMapInstance,
            activeLayoutName,
            mapTitles: mapTitles,
            product,
            activeMapStyleName,
            options: {
                height: height,
                width: width,
                ...options,
                computedPixelRatio: computedPixelRatio
            }
        })
    }
}
