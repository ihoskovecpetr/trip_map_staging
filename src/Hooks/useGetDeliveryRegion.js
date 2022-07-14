import React from 'react'
import { useGetDeliveryRegionSelector } from 'redux/order/reducer'

export function useGetDeliveryRegion() {
    const deliveryRegion = useGetDeliveryRegionSelector()

    return deliveryRegion
}
