import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";
import "./index.css";

const store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
