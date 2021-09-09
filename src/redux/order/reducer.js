import { countActionTypes } from "./actions";
import produce from "immer";
import { useSelector } from "react-redux";
import { HYDRATE } from "next-redux-wrapper"; // ADD HYDRATE!!

import {
  TITLES_DEFAULT,
  SIZES,
  VARIANTS_PRINTFUL,
  LAYOUT_STYLE_NAMES,
  MAP_STYLES_NAMES,
} from "constants/constants";

const orderInitialState = {
  product: {
    name: "Zakázková mapa dle vlastního designu",
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
  mapCoordinates: [13.303958804602132, 41.47437924957853],
  mapZoom: 5,
  isHydrated: false,
  seenPopup: false,
  uploadPercentage: 0,
  discount: { code: "", codeAccepted: false },
  string: "",
  journeys: [
    {
      groupIndex: 0,
      index: 0,
      location: [14.42139, 50.08861],
      sourceId: "SourceId_0.3506115025981893",
      title: "Prague",
      titleLabel: "Praha",
      titleLabelDisplayed: true,
      titleLocation: [12.832277284787466, 45.644311055175336],
      titleSourceId: "TitleSourceId_0.234234",
    },
    {
      groupIndex: 0,
      index: 1,
      location: [12.48278, 41.89306],
      sourceId: "SourceId_0.5361843612493742",
      title: "Rome",
      titleLabel: "Rome",
      titleLabelDisplayed: true,
      titleLocation: [12.48278, 41.89306],
      titleSourceId: "TitleSourceId_0.37sefsfse",
    },

    {
      groupIndex: 1,
      index: 2,
      location: [9.736335, 44.100683],
      sourceId: "SourceId_0.9056085573382431",
      title: "Cinque Terre",
      titleLabel: "Cinque Terre",
      titleLabelDisplayed: true,
      titleLocation: [9.736335, 44.100683],
      titleSourceId: "TitleSourceId_0.70345fds",
    },
    {
      groupIndex: 2,
      index: 3,
      location: [14.48972, 40.75056],
      sourceId: "SourceId_0.0578665585636553",
      title: "Pompeii",
      titleLabel: "Pompeii",
      titleLabelDisplayed: true,
      titleLocation: [14.48972, 40.75056],
      titleSourceId: "TitleSourceId_0.53453sdf",
    },
  ],
  journeysSpecs: {
    labelSizePrint: 10,
  },
};

const order = produce((state = orderInitialState, { type, data, payload }) => {
  switch (type) {
    case HYDRATE:
      if (typeof window !== "undefined") {
        const storedPopupState = localStorage.getItem("seenPopup");

        return {
          ...orderInitialState,
          ...state,
          seenPopup: !!storedPopupState,
          isHydrated: true,
          ...payload.order, // in payload is server store state !!!!
        };
      }
      return {
        ...orderInitialState,
        ...state,
        isHydrated: true,
        ...payload.order, // in payload is server store state !!!!
      };
    case countActionTypes.SET_PRODUCT:
      state.product = {
        ...state.product,
        ...data,
      };
      return state;

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

    case countActionTypes.SET_MAP_COORDINATES:
      state.mapCoordinates = data;
      return state;

    case countActionTypes.SET_MAP_ZOOM:
      state.mapZoom = data;
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

    case countActionTypes.ADD_NEW_JOURNEY:
      state.journeys = [...state.journeys, data];
      return state;

    case countActionTypes.UPDATE_JOURNEY:
      const updatingIndex = state.journeys.findIndex(
        (item) => item.sourceId === data.sourceId
      );

      const newJourneys = [...state.journeys];
      newJourneys[updatingIndex] = data;

      state.journeys = newJourneys;
      return state;

    case countActionTypes.REMOVE_JOURNEY_POINT:
      const filteredJourneys = state.journeys.filter(
        (item) => item.sourceId != data.sourceId
      );

      state.journeys = filteredJourneys;
      return state;

    case countActionTypes.SET_JOURNEYS_SPECS:
      state.journeysSpecs = { ...state.journeysSpecs, ...data };
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
  useSelector((store) => store.order.mapCoordinates);

export const useMapZoomSelector = () =>
  useSelector((store) => store.order.mapZoom);

export const useUploadPercentageSelector = () =>
  useSelector((store) => store.order.uploadPercentage);

export const useDiscountSelector = () =>
  useSelector((store) => store.order.discount);

export const useSeenPopupSelector = () =>
  useSelector((store) => store.order.seenPopup);

export const useGetJourneys = () =>
  useSelector((store) => store.order.journeys);

export const useGetJourneysSpecsSelector = () =>
  useSelector((store) => store.order.journeysSpecs);

export default order;
