import React from "react";
import type { RouteObject } from "react-router-dom";

const Message = React.lazy(() => import("@/pages/message"));
const AddMsg = React.lazy(() => import("@/pages/message/modules/AddMessage"));

export default [
  {
    path: "/msg/add",
    element: <AddMsg />,
  },
  {
    path: "/msg",
    element: <Message />,
  },
] as RouteObject[];
