export const countActionTypes = {
  SET_PRODUCT: "SET_PRODUCT",
  NEW_TITLE: "NEW_TITLE",
  NEW_SUBTITLE: "NEW_SUBTITLE",
  SET_ACTIVE_LAYOUT: "SET_ACTIVE_LAYOUT",
  SET_MAP_COORDINATES: "SET_MAP_COORDINATES",
  SET_MAP_ZOOM: "SET_MAP_ZOOM",
  SET_ACTIVE_MAP_STYLE: "SET_ACTIVE_MAP_STYLE",
};

export const setProductAction = (newProduct) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_PRODUCT,
    data: newProduct,
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
