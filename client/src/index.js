import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./_reducers";
import promiseMiddleware from "redux-promise";
import { thunk } from "redux-thunk";

// Redux DevTools와 미들웨어를 함께 적용하는 코드
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(promiseMiddleware, thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
