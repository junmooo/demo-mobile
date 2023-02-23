import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ReactDOM from "react-dom";
import { SafeArea } from "antd-mobile";

ReactDOM.render(
  <React.StrictMode>
    <div style={{ background: "#ace0ff" }}>
      <SafeArea position="top" />
    </div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <div style={{ background: "#ffcfac" }}>
      <SafeArea position="bottom" />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
