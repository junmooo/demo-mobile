import React from "react";
import type { RouteObject } from "react-router-dom";

const Questions = React.lazy(() => import("@/pages/questions"));

export default [
  {
    path: "/question",
    element: <Questions />,
  },
] as RouteObject[];
