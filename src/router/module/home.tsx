import React from "react";
import type { RouteObject } from "react-router-dom";

const Home = React.lazy(() => import("@/pages/home"));

export default [
  {
    path: "/home",
    element: <Home />,
  },
] as RouteObject[];
