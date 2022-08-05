import { countActionTypes } from './actions'
import produce from 'immer'
import { useSelector } from 'react-redux'
import { HYDRATE } from 'next-redux-wrapper' // ADD HYDRATE!!
import { MODE_OF_TRANSPORT } from 'constants/constants'
import { getMaxLocationIndex } from 'LibGlobal/getMaxLocationIndex'

import {
    TITLES_DEFAULT,
    SIZES,
    VARIANTS_PRINTFUL,
    LAYOUT_STYLE_NAMES,
    MAP_STYLES_NAMES,
    VALID_DISCOUNT_CODES
} from 'constants/constants'

const _getDefaultLocation = (id, index) => {
    return {
        id: id,
        index: index,
        location: [2.35183, 48.85658],
        sourceId: 'Default_SourceId_' + Math.random(),
        title: 'Paris, Tour Eiffel',
        titleLabel: 'Paris',
        titleLabelDisplayed: true,
        titleLocation: [2.35183, 48.85658],
        titleSourceId: 'TitleSourceId_' + Math.random()
    }
}

const orderInitialState = {
    product: {
        price: null,
        sizeObject: SIZES[3],
        variantId: VARIANTS_PRINTFUL[3].id,
        materialDesc: 'material.mattedPaper',
        shippingCode: VARIANTS_PRINTFUL[3].shipping['CZK'].codeCZ,
        isLayoutColorSwitched: false,
        densityConstant: 2
    },
    mapTitles: {
        heading: { text: TITLES_DEFAULT[0], size: 14 },
        subtitle: { text: TITLES_DEFAULT[1], size: 8 }
    },
    activeLayoutName: LAYOUT_STYLE_NAMES.ISLAND_BOX,
    activeMapStyleName: MAP_STYLES_NAMES.SANDY_DARK,
    mapCenterCoordinates: [13.303958804602132, 41.47437924957853],
    mapZoom: 5,
    mapBbox: [],
    activeStepNumber: 0,
    seenPopup: false,
    uploadPercentage: 0,
    discount: { code: VALID_DISCOUNT_CODES[0].code, codeAccepted: true },
    string: '',
    storeId: '',
    currency: 'EUR',
    deliveryRegion: 'EU',
    journeysSpecs: {
        labelSizePrint: 10,
        isEnabled: true
    },
    icons: [
        {
            groupIndex: 1,
            location: [11.48972, 40.75056],
            titleLocation: [14.48972, 40.75056],
            sourceId: 'SourceId_1'
        }
    ],
    journeysDraggable: {
        locations: {
            'location-1': {
                id: 'location-1',
                index: 1,
                location: [8.541042, 47.374449],
                sourceId: 'SourceId_0.900301282366442',
                title: 'Zurich',
                titleLabel: 'Zurich',
                modeOfTransport: MODE_OF_TRANSPORT.driving,
                titleLabelDisplayed: true,
                titleLocation: [8.571921669882101, 47.14074969054528],
                titleSourceId: 'TitleSourceId_0.9464388321842834'
            },
            'location-2': {
                id: 'location-2',
                index: 2,
                location: [14.48972, 40.75056],
                sourceId: 'SourceId_0.0578665585636553',
                title: 'Pompeii',
                titleLabel: 'Pompeii',
                modeOfTransport: MODE_OF_TRANSPORT.driving,
                titleLabelDisplayed: true,
                titleLocation: [14.48972, 40.75056],
                titleSourceId: 'TitleSourceId_0.53453sdf'
            },
            'location-4': {
                id: 'location-4',
                index: 4,
                location: [10.4, 43.71667],
                sourceId: 'SourceId_0.35696641244013017',
                title: 'Pisa',
                titleLabel: 'Pisa',
                modeOfTransport: MODE_OF_TRANSPORT.flying,
                titleLabelDisplayed: true,
                titleLocation: [10.4, 43.71667],
                titleSourceId: 'TitleSourceId_0.16435689126355468'
            },
            'location-5': {
                index: 5,
                id: 'location-5',
                location: [12.48278, 41.89306],
                sourceId: 'SourceId_0.8126406360866487',
                titleSourceId: 'TitleSourceId_0.5097616552704971',
                title: 'Roma',
                titleLabel: 'Roma',
                modeOfTransport: MODE_OF_TRANSPORT.driving,

                titleLabelDisplayed: true,
                titleLocation: [12.48278, 41.89306]
            }
        },
        trips: {
            'trip-1': {
                id: 'trip-1',
                locationIds: ['location-1', 'location-4', 'location-5', 'location-2']
            },
            'trip-2': {
                id: 'trip-2',
                locationIds: []
            }
        },
        tripsOrder: ['trip-1', 'trip-2']
    },
    languageServer: 'default'
}

const order = produce((state = orderInitialState, { type, data, payload }) => {
    switch (type) {
        case HYDRATE:
            const { product: metaProduct, mapTitles: metaMapTitles, ...metaPayloadStripped } = payload.order //This is fixing that recurring error on DEV
            let metaPayload
            const isProductPropperlySaved = metaMapTitles?.heading
            // const isProductPropperlySaved = metaProduct?.name && metaMapTitles?.heading
            if (isProductPropperlySaved) {
                metaPayload = payload.order
            } else {
                metaPayload = { ...orderInitialState, ...metaPayloadStripped }
            }

            if (typeof window !== 'undefined') {
                const storedPopupState = localStorage.getItem('seenPopup')
                return {
                    ...orderInitialState,
                    ...state,
                    seenPopup: !!storedPopupState,
                    ...metaPayload

                    // ...payload.order, // this was coming with empty product: {} // in payload is server store state !!!!
                }
            }

            return {
                ...orderInitialState,
                ...state,
                ...metaPayload

                // ...payload.order, // this was coming with empty product: {} // in payload is server store state !!!!
            }

        // case countActionTypes.RESET_STORE:
        //     state = {}
        //     return state

        case countActionTypes.SET_PRODUCT:
            state.product = {
                ...state.product,
                ...data
            }
            return state

        case countActionTypes.RESET_STORE:
            return {
                ...orderInitialState
            }

        case countActionTypes.SET_POPUP_SEEN:
            state.seenPopup = data
            return state

        case countActionTypes.NEW_TITLE:
            state.mapTitles = {
                ...state.mapTitles,
                heading: { ...state.mapTitles.heading, text: data }
            }
            return state

        case countActionTypes.NEW_SUBTITLE:
            state.mapTitles = {
                ...state.mapTitles,
                subtitle: { ...state.mapTitles.subtitle, text: data }
            }
            return state

        case countActionTypes.SET_ACTIVE_LAYOUT:
            state.activeLayoutName = data
            return state

        case countActionTypes.SET_ACTIVE_MAP_STYLE:
            state.activeMapStyleName = data
            return state

        case countActionTypes.SET_MAP_COORDINATES:
            state.mapCenterCoordinates = data
            return state

        case countActionTypes.SET_MAP_ZOOM:
            state.mapZoom = data
            return state

        case countActionTypes.SET_MAP_BBOX:
            state.mapBbox = data
            return state

        case countActionTypes.SET_UPLOAD_PERCENTAGE:
            state.uploadPercentage = data
            return state

        case countActionTypes.SET_DISCOUNT_CODE:
            state.discount.code = data
            return state

        case countActionTypes.SET_DISCOUNT_CODE_ACCEPTED:
            state.discount.codeAccepted = data
            return state

        case countActionTypes.ADD_NEW_LOCATION_DRAGGABLE:
            const nextLocationIndex = getMaxLocationIndex(state.journeysDraggable.locations)
            const nextLocationId = 'location-' + nextLocationIndex

            state.journeysDraggable.locations[nextLocationId] = {
                index: nextLocationIndex,
                id: nextLocationId,
                ...data.body
            }

            if (data.reverse) {
                state.journeysDraggable.trips[data.tripId].locationIds.unshift(nextLocationId)
            } else {
                state.journeysDraggable.trips[data.tripId].locationIds.push(nextLocationId)
            }

            return state

        case countActionTypes.UPDATE_LOCATION_SEQUENCE:
            state.journeysDraggable.trips[data.source.droppableId].locationIds.splice(data.source.index, 1)

            state.journeysDraggable.trips[data.destination.droppableId].locationIds.splice(
                data.destination.index,
                0,
                data.draggableId
            )

            return state

        case countActionTypes.UPDATE_LOCATION:
            state.journeysDraggable.locations[data.id] = { ...state.journeysDraggable.locations[data.id], ...data }
            return state

        case countActionTypes.REMOVE_LOCATION:
            delete state.journeysDraggable.locations[data.locationId]

            const newLocationIds = state.journeysDraggable.trips[data.tripId].locationIds.filter(
                id => id != data.locationId
            )

            if (!newLocationIds.length) {
                delete state.journeysDraggable.trips[data.tripId]

                const newTripsOrderArr = state.journeysDraggable.tripsOrder.filter(trip => trip != data.tripId)

                state.journeysDraggable.tripsOrder = newTripsOrderArr
            } else {
                state.journeysDraggable.trips[data.tripId].locationIds = newLocationIds
            }
            return state

        case countActionTypes.REMOVE_ALL_JOURNEYS:
            state.journeysDraggable.locations = {}
            state.journeysDraggable.trips = {
                'trip-1': {
                    id: 'trip-1',
                    locationIds: []
                }
            }
            state.journeysDraggable.tripsOrder = ['trip-1']
            return state

        case countActionTypes.ADD_EMPTY_TRIP:
            const tripIdsArr_1 = Object.keys(state.journeysDraggable.trips).map(name => name.split('-')[1])
            const tripsMaxId_1 = Math.max(...tripIdsArr_1)

            const newTripName_1 = `trip-${tripsMaxId_1 + 1}`

            state.journeysDraggable.trips[newTripName_1] = {
                id: newTripName_1,
                title: '__',
                locationIds: []
            }

            state.journeysDraggable.tripsOrder.push(newTripName_1)

            return state

        case countActionTypes.ADD_TRIP:
            const tripIdsArr = Object.keys(state.journeysDraggable.trips).map(name => name.split('-')[1])
            const tripsMaxId = Math.max(...tripIdsArr)
            const nextLocIndex = getMaxLocationIndex(state.journeysDraggable.locations)

            const newLocationId = `location-${nextLocIndex}`

            state.journeysDraggable.locations[newLocationId] = _getDefaultLocation(newLocationId, nextLocIndex)

            const newTripName = `trip-${tripsMaxId + 1}`

            state.journeysDraggable.trips[newTripName] = {
                id: newTripName,
                locationIds: [newLocationId]
            }

            state.journeysDraggable.tripsOrder.push(newTripName)

            return state

        case countActionTypes.SET_JOURNEYS_SPECS:
            state.journeysSpecs = { ...state.journeysSpecs, ...data }
            return state

        case countActionTypes.SET_JOURNEYS_ENABLED:
            state.journeysSpecs = { ...state.journeysSpecs, isEnabled: data }
            return state

        case countActionTypes.ADD_NEW_ICON:
            state.icons = [...state.icons, data]
            return state

        case countActionTypes.UPDATE_ICON:
            const updatingIconIndex = state.icons.findIndex(item => item.sourceId === data.sourceId)

            const newIcons = [...state.icons]
            newIcons[updatingIconIndex] = data

            state.icons = newIcons
            return state

        case countActionTypes.SET_ACTIVE_STEP_NUMBER:
            state.activeStepNumber = data
            return state

        case countActionTypes.SET_CURRENCY_REGION:
            state = { ...state, ...data }

            return state

        default:
            return state
    }
})

export const useFullStoreSelector = () => useSelector(store => ({ ...store.order, ...store.intl }))

export const useProductSelector = () => useSelector(store => store.order.product)

export const useTitlesSelector = () => useSelector(store => store.order.mapTitles)

export const useActiveLayoutSelector = () => useSelector(store => store.order.activeLayoutName)
export const useActiveMapStyleSelector = () => useSelector(store => store.order.activeMapStyleName)

export const useMapCoordinatesSelector = () => useSelector(store => store.order.mapCenterCoordinates)
export const useMapZoomSelector = () => useSelector(store => store.order.mapZoom)
export const useMapBboxSelector = () => useSelector(store => store.order.mapBbox)

export const useUploadPercentageSelector = () => useSelector(store => store.order.uploadPercentage)

export const useDiscountSelector = () => useSelector(store => store.order.discount)

export const useSeenPopupSelector = () => useSelector(store => store.order.seenPopup)

export const useGetJourneysDraggableSelector = () => useSelector(store => store.order.journeysDraggable)

export const useGetJourneysSpecsSelector = () => useSelector(store => store.order.journeysSpecs)

export const useStoreIdSelector = () => useSelector(store => store.order.storeId)

export const useJourneysEnabledSelector = () => useSelector(store => store.order.journeysSpecs.isEnabled)

export const useGetIcons = () => useSelector(store => store.order.icons)

export const useGetActiveStepNumber = () => useSelector(store => store.order.activeStepNumber)

export const useGetCurrencySelector = () => useSelector(store => store.order.currency)

export const useGetDeliveryRegionSelector = () => useSelector(store => store.order.deliveryRegion)

export const useMaxTripIdSelector = () =>
    useSelector(store => {
        const tripIdsArr_selector = Object.keys(store.order.journeysDraggable.trips).map(name => name.split('-')[1])

        const tripsMaxId_selector = Math.max(...tripIdsArr_selector)

        return `trip-${tripsMaxId_selector}`
    })

export const useNumberOfEmptyTripsSelector = () =>
    useSelector(store => {
        const arr_empty = Object.keys(store.order.journeysDraggable.trips).map(name => {
            if (!store.order.journeysDraggable.trips[name].locationIds.length) {
                return 1
            } else {
                return 0
            }
        })

        return eval(arr_empty.join('+'))
    })

export default order
