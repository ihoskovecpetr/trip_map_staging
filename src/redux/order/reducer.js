import { countActionTypes } from "./actions";
import produce from "immer";
import { useSelector } from "react-redux";

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
      (size) => size.code === VARIANTS_PRINTFUL[4].sizeName
    ),
    variantId: VARIANTS_PRINTFUL[4].id,
    materialDesc: "Matný vylepšený papír",
    shippingCode: VARIANTS_PRINTFUL[4].shipping.codeCZ,
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
  konva: { isRendered: false, icons: [] },
};

const order = produce((state = orderInitialState, { type, data }) => {
  switch (type) {
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

    case countActionTypes.SET_IS_KONVA_RENDERED:
      state.konva.isRendered = data;
      return state;

    case countActionTypes.ADD_KONVA_ICON:
      state.konva.icons = [...state.konva.icons, data];
      return state;

    case countActionTypes.REMOVE_KONVA_ICON:
      const leftoverIcons = state.konva.icons.filter((icon) => icon.id != data);
      state.konva.icons = [...leftoverIcons];
      return state;

    case countActionTypes.UPDATE_KONVA_ICON:
      const filteredIcons = state.konva.icons.filter(
        (icon) => icon.id != data.id
      );
      state.konva.icons = [...filteredIcons, data];
      return state;

    default:
      return state;
  }
});

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

export const useIsKonvaRenderedSelector = () =>
  useSelector((store) => store.order.konva.isRendered);

export const useKonvaIconsSelector = () =>
  useSelector((store) => store.order.konva.icons);

export default order;
