export const countActionTypes = {
  SET_PRODUCT: "SET_PRODUCT",
  SET_POPUP_SEEN: "SET_POPUP_SEEN",
  NEW_TITLE: "NEW_TITLE",
  NEW_SUBTITLE: "NEW_SUBTITLE",
  SET_ACTIVE_LAYOUT: "SET_ACTIVE_LAYOUT",
  SET_MAP_COORDINATES: "SET_MAP_COORDINATES",
  SET_MAP_ZOOM: "SET_MAP_ZOOM",
  SET_ACTIVE_MAP_STYLE: "SET_ACTIVE_MAP_STYLE",
  SET_UPLOAD_PERCENTAGE: "SET_UPLOAD_PERCENTAGE",
  SET_DISCOUNT_CODE: "SET_DISCOUNT_CODE",
  SET_DISCOUNT_CODE_ACCEPTED: "SET_DISCOUNT_CODE_ACCEPTED",
  ADD_NEW_JOURNEY: "ADD_NEW_JOURNEY",
  UPDATE_JOURNEY: "UPDATE_JOURNEY",
  REMOVE_JOURNEY_POINT: "REMOVE_JOURNEY_POINT",
  SET_JOURNEYS_SPECS: "SET_JOURNEYS_SPECS",
  SET_JOURNEYS_ENABLED: "SET_JOURNEYS_ENABLED",
  RESET_STORE: "RESET_STORE",
  REMOVE_ALL_JOURNEYS: "REMOVE_ALL_JOURNEYS",
};

export const resetStore = () => (dispatch) => {
  return dispatch({
    type: countActionTypes.RESET_STORE,
  });
};

export const setProductAction = (newProduct) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_PRODUCT,
    data: newProduct,
  });
};

export const setPopupSeenAction = (bool) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_POPUP_SEEN,
    data: bool,
  });
};

export const setNewTitle = (title) => (dispatch) => {
  return dispatch({ type: countActionTypes.NEW_TITLE, data: title });
};

export const setNewSubtitle = (subtitle) => (dispatch) => {
  return dispatch({ type: countActionTypes.NEW_SUBTITLE, data: subtitle });
};

export const setActiveLayoutAction = (layoutName) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_ACTIVE_LAYOUT,
    data: layoutName,
  });
};

export const setActiveMapStyleAction = (mapStyleName) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_ACTIVE_MAP_STYLE,
    data: mapStyleName,
  });
};

export const setMapCoordinatesAction = (newCoordinates) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_MAP_COORDINATES,
    data: newCoordinates,
  });
};

export const setMapZoomAction = (newZoom) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_MAP_ZOOM,
    data: newZoom,
  });
};

export const setUploadPercentage = (number) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_UPLOAD_PERCENTAGE,
    data: number,
  });
};

export const setDiscountCode = (code) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_DISCOUNT_CODE,
    data: code,
  });
};

export const setDiscountCodeAccepted = (bool) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_DISCOUNT_CODE_ACCEPTED,
    data: bool,
  });
};

export const setHydrateFromLocalStorage = (string) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_HYDRATE_FROM_LOCAL,
    data: string,
  });
};

export const addNewJourney = (journey) => (dispatch) => {
  return dispatch({
    type: countActionTypes.ADD_NEW_JOURNEY,
    data: journey,
  });
};

export const updateJourneyPoint = (point) => (dispatch) => {
  return dispatch({
    type: countActionTypes.UPDATE_JOURNEY,
    data: point,
  });
};

export const removeJourneyPoint = (point) => (dispatch) => {
  return dispatch({
    type: countActionTypes.REMOVE_JOURNEY_POINT,
    data: point,
  });
};

export const setJourneysSpecs = (point) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_JOURNEYS_SPECS,
    data: point,
  });
};

export const setJourneysIsEnabled = (bool) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_JOURNEYS_ENABLED,
    data: bool,
  });
};

export const removeAllJourneys = () => (dispatch) => {
  return dispatch({
    type: countActionTypes.REMOVE_ALL_JOURNEYS,
  });
};
