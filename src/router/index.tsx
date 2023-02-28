import NotFound from "@/pages/NotFound";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import home from "./module/home";
import article from "./module/article";
import upload from "./module/upload";
import message from "./module/message";
import login from "./module/login";
import me from "./module/me";

const routeConfig = [
  ...article,
  ...login,
  ...upload,
  ...message,
  ...home,
  ...me,
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
] as RouteObject[];

export default routeConfig;
