import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";

/**
 * 路由守卫
 * 处理url中传递来的单点登录的用户信息和国际化配置
 */

type Iprops = { routes: RouteObject[] };
const RouterGurad = (props: Iprops) => {
  const { routes } = props;

  const route = useRoutes(routes);

  return route;
};

export default RouterGurad;
