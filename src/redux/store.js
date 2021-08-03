import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper"; // ADD HYDRATE!!
import thunkMiddleware from "redux-thunk";
import order from "./order/reducer";
// import tick from './tick/reducer'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  order,
  //   tick,
});

const initStore = () => {
  return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
