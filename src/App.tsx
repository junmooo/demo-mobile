import React from "react";
import "./iconfont/iconfont.css";
import routeConfig from "./router";
import RouterGurad from "./router/RouterGurad";

function App() {
  return (
    <React.Suspense fallback={<></>}>
      <RouterGurad routes={routeConfig} />
    </React.Suspense>
  );
}

export default App;
