import appConfig from '@/config';
import { Toast } from '@nutui/nutui-react';
import axios from 'axios';
import { myIntl } from '@/locale';

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
  if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
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

function request(axiosConfig: Config, customOptions?: { repeat_request_cancel: boolean }) {
  const service = axios.create({
    baseURL: '/',
    timeout: 60000,
  });

  // 自定义配置
  const custom_options = Object.assign(
    {
      repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
    },
    customOptions,
  );

  service.interceptors.request.use(
    (config: Config) => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      // 自动携带token
      if (
        // config.method?.toUpperCase() === 'GET' &&
        localStorage.getItem(appConfig.JWT_LOCALSTORAGE_KEY) &&
        typeof window !== 'undefined'
      ) {
        config.url += config.url && config.url.indexOf('?') >= 0 ? '&' : '?';
        config.url +=
          'easyToken=' +
          localStorage.getItem(appConfig.JWT_LOCALSTORAGE_KEY) +
          '&language=' +
          localStorage.getItem(appConfig.LANG_LOCALSTORAGE_KEY);
        // 修复 从 local Storage 中拿的数据带引号的问题
        config.url = config.url?.replaceAll('"', '');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  service.interceptors.response.use(
    (response) => {
      // response.data.retStatus = '0';
      removePending(response.config);
      if (response?.data.errmsg === 'token is out of date') {
        Toast.fail(myIntl.formatMessage({ id: 'tokenOut' }), { duration: 5 });
        response.data.retStatus = '-1';
      }
      if (response.data.retStatus !== '1' && response.data.retStatus !== '-1') {
        Toast.fail(response?.data.errmsg || myIntl.formatMessage({ id: 'sysErr' }), {
          duration: 5,
        });
        // Toast.fail(response?.data.errmsg || '网络错误', { duration: 5 });
        return Promise.reject(response.data);
      }
      return response;
    },
    (error) => {
      error.config && removePending(error.config);
      return Promise.reject(error);
    },
  );

  return service(axiosConfig);
}

export default request;
