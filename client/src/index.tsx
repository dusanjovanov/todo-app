import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, Store } from "redux";
import App from "./components/App";
import "./index.css";
import reducer, { State } from "./redux/reducer";

type ExtendedWindow = Window & {
  store: Store;
  __PRELOADED_STATE__: State;
};

const preloadedState = (window as ExtendedWindow).__PRELOADED_STATE__;
delete (window as ExtendedWindow).__PRELOADED_STATE__;

const logAction = store => next => action => {
  console.log(action);
  next(action);
};

const middleware = [];

if (process.env.NODE_ENV === "DEVELOPMENT") {
  middleware.push(logAction);
}

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(...middleware)
);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
