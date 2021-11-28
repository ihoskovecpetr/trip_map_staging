import { countActionTypes } from "./actions";
import produce from "immer";
import { useSelector } from "react-redux";
import { HYDRATE } from "next-redux-wrapper"; // ADD HYDRATE!!

import { getMaxLocationIndex } from "LibGlobal/getMaxLocationIndex";

import {
  TITLES_DEFAULT,
  SIZES,
  VARIANTS_PRINTFUL,
  LAYOUT_STYLE_NAMES,
  MAP_STYLES_NAMES,
} from "constants/constants";

const _getDefaultLocation = (id, index) => {
  return {
    id: id,
    index: index,
    location: [14.42139, 50.08861],
    sourceId: "SourceId_" + Math.random(),
    title: "Prague",
    titleLabel: "Popisek Praha",
    titleLabelDisplayed: true,
    titleLocation: [14.42139, 50.08861],
    titleSourceId: "TitleSourceId_" + Math.random(),
  };
};

const orderInitialState = {
  product: {
    name: "Zakázková mapa dle vlastní konfigurace",
    price: null,
    currency: "CZK",
    sizeObject: SIZES[3],
    variantId: VARIANTS_PRINTFUL[3].id,
    materialDesc: "Matný vylepšený papír",
    shippingCode: VARIANTS_PRINTFUL[3].shipping.codeCZ,
    isLayoutColorSwitched: false,
    densityConstant: 2,
  },
  mapTitles: {
    heading: { text: TITLES_DEFAULT[0], size: 14 },
    subtitle: { text: TITLES_DEFAULT[1], size: 8 },
  },
  activeLayoutName: LAYOUT_STYLE_NAMES.BOTTOM_BLUR,
  activeMapStyleName: MAP_STYLES_NAMES.PALE_BLUE,
  mapCenterCoordinates: [13.303958804602132, 41.47437924957853],
  mapZoom: 5,
  mapPosition: {
    width: 400,
    height: 400,
    latitude: 51.08861,
    longitude: 14.42139,
    zoom: 4,
  },
  activeStepNumber: 0,
  seenPopup: false,
  uploadPercentage: 0,
  discount: { code: "", codeAccepted: false },
  string: "",
  storeId: "",
  journeysSpecs: {
    labelSizePrint: 10,
    isEnabled: true,
  },
  icons: [
    {
      groupIndex: 1,
      location: [11.48972, 40.75056],
      titleLocation: [14.48972, 40.75056],
      sourceId: "SourceId_1",
    },
  ],
  journeysDraggable: {
    locations: {
      "location-1": {
        id: "location-1",
        index: 1,
        content: "Take out the garbage",
        location: [14.42139, 50.08861],
        sourceId: "SourceId_0.3506115025981893",
        title: "Prague",
        titleLabel: "Praha",
        titleLabelDisplayed: true,
        titleLocation: [12.832277284787466, 45.644311055175336],
        titleSourceId: "TitleSourceId_0.234234",
      },
      "location-2": {
        id: "location-2",
        index: 2,
        content: "Make Sleep",
        location: [14.48972, 40.75056],
        sourceId: "SourceId_0.0578665585636553",
        title: "Pompeii",
        titleLabel: "Pompeii",
        titleLabelDisplayed: true,
        titleLocation: [14.48972, 40.75056],
        titleSourceId: "TitleSourceId_0.53453sdf",
      },
      "location-3": {
        id: "location-3",
        index: 3,
        content: "Make Small Goodness",
        location: [14.48972, 40.75056],
        sourceId: "SourceId_0.0578665585636553",
        title: "Pompeii",
        titleLabel: "Pompeii",
        titleLabelDisplayed: true,
        titleLocation: [14.48972, 40.75056],
        titleSourceId: "TitleSourceId_0.53453sdf",
      },
      "location-4": {
        id: "location-4",
        index: 4,
        content: "Make Sma Cinque",
        location: [9.736335, 44.100683],
        sourceId: "SourceId_0.9056085573382431",
        title: "Cinque Terre",
        titleLabel: "Cinque Terre",
        titleLabelDisplayed: true,
        titleLocation: [9.736335, 44.100683],
        titleSourceId: "TitleSourceId_0.70345fds",
      },
    },
    trips: {
      "trip-1": {
        id: "trip-1",
        title: "Spojený trip 1",
        locationIds: ["location-1", "location-2", "location-4"],
      },
      "trip-2": {
        id: "trip-2",
        title: "Spojený trip 2",
        locationIds: ["location-3"],
      },
    },
    // Facilitate reordering of the trips
    tripsOrder: ["trip-1", "trip-2"],
  },
};

const order = produce((state = orderInitialState, { type, data, payload }) => {
  switch (type) {
    case HYDRATE:
      if (typeof window !== "undefined") {
        const storedPopupState = localStorage.getItem("seenPopup");
        console.log("HYdrate_str", { payload_order: payload.order });
        return {
          ...orderInitialState,
          ...state,
          seenPopup: !!storedPopupState,
          // isHydrated: true,
          ...payload.order, // in payload is server store state !!!!
        };
      }

      return {
        ...orderInitialState,
        ...state,
        // isHydrated: true,
        ...payload.order, // in payload is server store state !!!!
      };

    case countActionTypes.RESET_STORE:
      state = {};
      return state;

    case countActionTypes.SET_PRODUCT:
      state.product = {
        ...state.product,
        ...data,
      };
      return state;

    case countActionTypes.RESET_STORE:
      return {
        ...orderInitialState,
      };

    case countActionTypes.SET_POPUP_SEEN:
      state.seenPopup = data;
      return state;

    case countActionTypes.NEW_TITLE:
      state.mapTitles = {
        ...state.mapTitles,
        heading: { ...state.mapTitles.heading, text: data },
      };
      return state;

    case countActionTypes.NEW_SUBTITLE:
      state.mapTitles = {
        ...state.mapTitles,
        subtitle: { ...state.mapTitles.subtitle, text: data },
      };
      return state;

    case countActionTypes.SET_ACTIVE_LAYOUT:
      state.activeLayoutName = data;
      return state;

    case countActionTypes.SET_ACTIVE_MAP_STYLE:
      state.activeMapStyleName = data;
      return state;
    //remove
    case countActionTypes.SET_MAP_COORDINATES:
      state.mapCenterCoordinates = data;
      return state;

    case countActionTypes.SET_MAP_ZOOM:
      state.mapZoom = data;
      return state;
    // to here

    case countActionTypes.UPDATE_MAP_POSITION:
      state.mapPosition = { ...state.mapPosition, ...data };
      return state;

    case countActionTypes.SET_UPLOAD_PERCENTAGE:
      state.uploadPercentage = data;
      return state;

    case countActionTypes.SET_DISCOUNT_CODE:
      state.discount.code = data;
      return state;

    case countActionTypes.SET_DISCOUNT_CODE_ACCEPTED:
      state.discount.codeAccepted = data;
      return state;

    case countActionTypes.ADD_NEW_LOCATION_DRAGGABLE:
      const nextLocationIndex = getMaxLocationIndex(
        state.journeysDraggable.locations
      );
      const nextLocationId = "location-" + nextLocationIndex;
      state.journeysDraggable.locations[nextLocationId] = {
        index: nextLocationIndex,
        id: nextLocationId,
        ...data.body,
      };
      state.journeysDraggable.trips[data.tripId].locationIds.push(
        nextLocationId
      );
      return state;

    case countActionTypes.UPDATE_LOCATION_SEQUENCE:
      state.journeysDraggable.trips[data.source.droppableId].locationIds.splice(
        data.source.index,
        1
      );
      state.journeysDraggable.trips[
        data.destination.droppableId
      ].locationIds.splice(data.destination.index, 0, data.draggableId);
      return state;

    case countActionTypes.UPDATE_LOCATION:
      state.journeysDraggable.locations[data.id] = data;
      return state;

    case countActionTypes.REMOVE_LOCATION:
      delete state.journeysDraggable.locations[data.locationId];

      const newLocationIds = state.journeysDraggable.trips[
        data.tripId
      ].locationIds.filter((id) => id != data.locationId);

      if (!newLocationIds.length) {
        delete state.journeysDraggable.trips[data.tripId];

        const newTripsOrderArr = state.journeysDraggable.tripsOrder.filter(
          (trip) => trip != data.tripId
        );

        state.journeysDraggable.tripsOrder = newTripsOrderArr;
      } else {
        state.journeysDraggable.trips[data.tripId].locationIds = newLocationIds;
      }
      return state;

    case countActionTypes.REMOVE_ALL_LOCATIONS:
      state.journeysDraggable.locations = {};
      state.journeysDraggable.trips = {};
      state.journeysDraggable.tripsOrder = [];
      return state;

    case countActionTypes.ADD_TRIP:
      const tripIdsArr = Object.keys(state.journeysDraggable.trips).map(
        (name) => name.split("-")[1]
      );
      const tripsMaxId = Math.max(...tripIdsArr);
      const nextLocIndex = getMaxLocationIndex(
        state.journeysDraggable.locations
      );

      const newLocationId = `location-${nextLocIndex}`;

      state.journeysDraggable.locations[newLocationId] = _getDefaultLocation(
        newLocationId,
        nextLocIndex
      );

      const newTripName = `trip-${tripsMaxId + 1}`;

      state.journeysDraggable.trips[newTripName] = {
        id: newTripName,
        title: "Spojený trip 2",
        locationIds: [newLocationId],
      };

      state.journeysDraggable.tripsOrder.unshift(newTripName);

      return state;

    case countActionTypes.SET_JOURNEYS_SPECS:
      state.journeysSpecs = { ...state.journeysSpecs, ...data };
      return state;

    case countActionTypes.SET_JOURNEYS_ENABLED:
      state.journeysSpecs = { ...state.journeysSpecs, isEnabled: data };
      return state;

    case countActionTypes.ADD_NEW_ICON:
      state.icons = [...state.icons, data];
      return state;

    case countActionTypes.UPDATE_ICON:
      const updatingIconIndex = state.icons.findIndex(
        (item) => item.sourceId === data.sourceId
      );

      const newIcons = [...state.icons];
      newIcons[updatingIconIndex] = data;

      state.icons = newIcons;
      return state;

    case countActionTypes.SET_ACTIVE_STEP_NUMBER:
      state.activeStepNumber = data;
      return state;

    default:
      return state;
  }
});

export const useFullStoreSelector = () => useSelector((store) => store.order);

export const useProductSelector = () =>
  useSelector((store) => store.order.product);

export const useTitlesSelector = () =>
  useSelector((store) => store.order.mapTitles);

export const useActiveLayoutSelector = () =>
  useSelector((store) => store.order.activeLayoutName);

export const useActiveMapStyleSelector = () =>
  useSelector((store) => store.order.activeMapStyleName);

export const useMapCoordinatesSelector = () =>
  useSelector((store) => store.order.mapCenterCoordinates);

export const useMapZoomSelector = () =>
  useSelector((store) => store.order.mapZoom);

export const useMapPosition = () =>
  useSelector((store) => store.order.mapPosition);

export const useUploadPercentageSelector = () =>
  useSelector((store) => store.order.uploadPercentage);

export const useDiscountSelector = () =>
  useSelector((store) => store.order.discount);

export const useSeenPopupSelector = () =>
  useSelector((store) => store.order.seenPopup);

export const useGetJourneysDraggable = () =>
  useSelector((store) => store.order.journeysDraggable);

export const useGetJourneysSpecsSelector = () =>
  useSelector((store) => store.order.journeysSpecs);

export const useStoreIdSelector = () =>
  useSelector((store) => store.order.storeId);

export const useJourneysEnabledSelector = () =>
  useSelector((store) => store.order.journeysSpecs.isEnabled);

export const useGetIcons = () => useSelector((store) => store.order.icons);

export const useGetActiveStepNumber = () =>
  useSelector((store) => store.order.activeStepNumber);

export default order;
