import appConfig from "@/config";
import { Toast } from "@nutui/nutui-react";
import axios from "axios";
import { myIntl } from "@/locale";

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */

type Config = {
  url?: string | undefined;
  method?: string;
  params?: object;
  data?: object | string;
  headers?: any;
};

function request(axiosConfig: Config) {
  const service = axios.create({
    baseURL: "/",
    timeout: 60000,
  });

  service.interceptors.request.use(
    (config: Config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      Toast.show({
        content: error,
        icon: "fail",
      });
      return Promise.reject(error);
    }
  );

  return service(axiosConfig);
}

export default request;
