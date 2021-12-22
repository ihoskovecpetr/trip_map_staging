import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import order from "./order/reducer";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("redux-devtools-extension_required");
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  console.log("redux-devtools-extension_skipped");

  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  order,
});

const initStore = (props) => {
  return createStore(
    combinedReducer,
    { order: { ...props?.ctx?.req.meta } },
    bindMiddleware([thunkMiddleware])
  );
};

export const wrapper = createWrapper(initStore);
