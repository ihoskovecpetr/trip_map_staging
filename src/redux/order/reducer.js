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
    sizeObject: SIZES.find(
      (size) => size.code === VARIANTS_PRINTFUL[3].sizeName
    ),
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
  activeLayoutName: LAYOUT_STYLE_NAMES.ISLAND_BOX,
  activeMapStyleName: MAP_STYLES_NAMES.RED_BLUE,
  mapCoordinates: [-73.985542, 40.7484665],
  mapZoom: 10,
  isHydrated: false,
  seenPopup: false,
  uploadPercentage: 0,
  discount: { code: "", codeAccepted: false },
  string: "",
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

    case countActionTypes.SET_HYDRATE_FROM_LOCAL:
      const reduxState = localStorage.getItem("reduxState");
      const parsedState = JSON.parse(reduxState);
      console.log({ reduxState: parsedState });

      state = {
        ...parsedState,
        string: data,
      };
      return state;

    case countActionTypes.SET_PRODUCT:
      state.product = {
        ...state.product,
        ...data,
      };
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

export default order;
