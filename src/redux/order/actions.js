export const countActionTypes = {
  NEW_TITLE: "NEW_TITLE",
  NEW_SUBTITLE: "NEW_SUBTITLE",
};

export const setNewTitle = (title) => (dispatch) => {
  return dispatch({ type: countActionTypes.NEW_TITLE, data: title });
};

export const setNewSubtitle = (subtitle) => (dispatch) => {
  return dispatch({ type: countActionTypes.NEW_SUBTITLE, data: subtitle });
};
