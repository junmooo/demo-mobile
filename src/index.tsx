import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ReactDOM from "react-dom";
import { SafeArea } from "antd-mobile";

ReactDOM.render(
  <div>
    <div>
      <SafeArea position="top" />
    </div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <div>
      <SafeArea position="bottom" />
    </div>
  </div>,
  document.getElementById("root")
);
