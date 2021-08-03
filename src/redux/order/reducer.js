import { countActionTypes } from "./actions";
import produce from "immer";
import { useSelector } from "react-redux";

import { TITLES_DEFAULT } from "constants/constants";

const orderInitialState = {
  mapTitles: {
    heading: { text: TITLES_DEFAULT[0], size: 14 },
    subtitle: { text: TITLES_DEFAULT[1], size: 8 },
  },
};

const order = produce((state = orderInitialState, { type, data }) => {
  switch (type) {
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

    default:
      return state;
  }
});

export const useTitlesSelector = () =>
  useSelector((store) => store.order.mapTitles);

export default order;
