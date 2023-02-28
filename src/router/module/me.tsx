import React from "react";
import type { RouteObject } from "react-router-dom";

const Me = React.lazy(() => import("@/pages/me"));

export default [
  {
    path: "/me",
    element: <Me />,
  },
] as RouteObject[];
