import React from "react";
import App from "./App";
import { HashRouter } from "react-router-dom";
import "./index.css";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
