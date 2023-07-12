import React from "react";
import type { RouteObject } from "react-router-dom";

const Portal = React.lazy(() => import("@/pages/portal"));

export default [
  {
    path: "/portal",
    element: <Portal />,
  },
] as RouteObject[];
