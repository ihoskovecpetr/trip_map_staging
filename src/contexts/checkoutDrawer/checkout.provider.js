import React, { useReducer } from 'react'
import { CheckoutDrawerContext } from './checkout.context'
const initialState = {
    isOpen: true
}

function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE':
            return {
                ...state,
                isOpen: !state.isOpen
            }
        default:
            return state
    }
}
export const CheckoutDrawerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <CheckoutDrawerContext.Provider value={{ state, dispatch }}>{children}</CheckoutDrawerContext.Provider>
}
