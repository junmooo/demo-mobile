import React from "react";
import type { RouteObject } from "react-router-dom";

const Upload = React.lazy(() => import("@/pages/upload"));

export default [
  {
    path: "/upload",
    element: <Upload />,
  },
] as RouteObject[];
