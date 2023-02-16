import React from "react";
import "./iconfont/iconfont.css";
import routeConfig from "./router";
import RouterGurad from "./router/RouterGurad";
import "zarm/dist/zarm.css";

function App() {
  return (
    <React.Suspense fallback={<></>}>
      <RouterGurad routes={routeConfig} />
    </React.Suspense>
  );
}

export default App;
