import NotFound from "@/pages/NotFound";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import home from "./module/home";
import article from "./module/article";
import upload from "./module/upload";
import questions from "./module/questions";
import login from "./module/login";

const routeConfig = [
  ...article,
  ...login,
  ...upload,
  ...questions,
  ...home,
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
