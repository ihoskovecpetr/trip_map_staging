import React from 'react'
import { useGetCurrencySelector } from 'redux/order/reducer'

export function useGetCurrency() {
    const currency = useGetCurrencySelector()

    return currency
}
