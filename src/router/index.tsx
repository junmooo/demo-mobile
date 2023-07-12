import NotFound from "@/pages/NotFound";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import portal from "./module/portal";

const routeConfig = [
  ...portal,
  {
    path: "/",
    element: <Navigate to="/portal" replace />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
] as RouteObject[];

export default routeConfig;
