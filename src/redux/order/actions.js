export const countActionTypes = {
  SET_PRODUCT: "SET_PRODUCT",
  NEW_TITLE: "NEW_TITLE",
  NEW_SUBTITLE: "NEW_SUBTITLE",
  SET_ACTIVE_LAYOUT: "SET_ACTIVE_LAYOUT",
  SET_MAP_COORDINATES: "SET_MAP_COORDINATES",
  SET_MAP_ZOOM: "SET_MAP_ZOOM",
  SET_ACTIVE_MAP_STYLE: "SET_ACTIVE_MAP_STYLE",
  SET_IS_KONVA_RENDERED: "SET_IS_KONVA_RENDERED",
  SET_IS_KONVA_ENABLED: "SET_IS_KONVA_ENABLED",
  ADD_KONVA_ICON: "ADD_KONVA_ICON",
  REMOVE_KONVA_ICON: "REMOVE_KONVA_ICON",
  UPDATE_KONVA_ICON: "UPDATE_KONVA_ICON",
  SET_TAB_STEP_NUMBER: "SET_TAB_STEP_NUMBER",
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

export const setIsKonvaRendered = (bool) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_IS_KONVA_RENDERED,
    data: bool,
  });
};

export const setIsKonvaEnabled = (bool) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_IS_KONVA_ENABLED,
    data: bool,
  });
};

export const setAddKonvaIcon = (icon) => (dispatch) => {
  return dispatch({
    type: countActionTypes.ADD_KONVA_ICON,
    data: icon,
  });
};

export const setRemoveKonvaIcon = (iconId) => (dispatch) => {
  return dispatch({
    type: countActionTypes.REMOVE_KONVA_ICON,
    data: iconId,
  });
};

export const setUpdateKonvaIcon = (iconObj) => (dispatch) => {
  return dispatch({
    type: countActionTypes.UPDATE_KONVA_ICON,
    data: iconObj,
  });
};

export const setTabStepNumberAction = (number) => (dispatch) => {
  return dispatch({
    type: countActionTypes.SET_TAB_STEP_NUMBER,
    data: number,
  });
};
