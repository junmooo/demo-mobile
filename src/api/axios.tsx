import axios from "axios";
import { myIntl } from "@/locale";
import { Toast } from "zarm";
import Cookies from "js-cookie";

const pendingMap = new Map();
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
  cancelToken?: any;
  headers?: any;
};

function getPendingKey(config: Config) {
  const { url, method, params } = config || {};
  let { data } = config || {};
  if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config: Config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config: Config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

function request(
  axiosConfig: Config,
  customOptions?: { repeat_request_cancel: boolean }
) {
  const service = axios.create({
    baseURL: "/",
    timeout: 60000,
  });

  // 自定义配置
  const custom_options = Object.assign(
    {
      repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
    },
    customOptions
  );

  service.interceptors.request.use(
    (config: Config) => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      // 自动携带token
      config.headers.token = Cookies.get("token");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      removePending(response.config);
      if (response?.data?.code !== 1) {
        Toast.show({
          content: response?.data.msg || myIntl.formatMessage({ id: "sysErr" }),
          stayTime: 3000,
        });
      }
      return response.data;
    },
    (error) => {
      error.config && removePending(error.config);
      if (error.response?.status === 403) {
        window.location.href = "/login";
        Toast.show({
          icon: "fail",
          content: "token 失效",
        });
      } else {
        Toast.show({
          icon: "fail",
          content: error.message || myIntl.formatMessage({ id: "sysErr" }),
        });
      }
    }
  );

  return service(axiosConfig);
}

export default request;
