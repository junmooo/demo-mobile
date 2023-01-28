import React from "react";
import type { RouteObject } from "react-router-dom";

const Demo = React.lazy(() => import("@/pages/demo/"));

export default [
  {
    path: "/demo",
    element: <Demo />,
  },
] as RouteObject[];
