import Cookies from "js-cookie";
import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";

/**
 * 路由守卫
 * 处理url中传递来的单点登录的用户信息和国际化配置
 */

type Iprops = { routes: RouteObject[] };
const RouterGurad = (props: Iprops) => {
  const { routes } = props;
  const route = useRoutes(routes);
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const exclude = ["/login", "/register"];

  if (!exclude.includes(location.pathname) && !token) {
    navigate("/login");
  }
  return route;
};

export default RouterGurad;
