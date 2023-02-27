import request from "@/api/axios";
import { md5 } from "@/utils/md5";
import Cookies from "js-cookie";

const login = async (params: LoginParam) => {
  params.pwd = md5(params.pwd || "");
  const res = await request({
    url: `/api/user/login`,
    method: "POST",
    data: { ...params },
  });

  Cookies.set("token", res?.data.token);
  return Promise.resolve(res?.data || {});
};

const register = async (params: RegisterParam) => {
  params.pwd = md5(params.pwd || "");
  return await request({
    url: `/api/user/register`,
    method: "POST",
    data: { ...params },
  });
};

const getName = async (params: RegisterParam) => {
  return await request({
    url: `/api/user/getName`,
    method: "GET",
    params,
  });
};

const auth = {
  login,
  register,
  getName,
};
export default auth;
