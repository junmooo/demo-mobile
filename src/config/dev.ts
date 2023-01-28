import type { ConfigType } from './index';

export default {
  // API_BASR_URL: 'https://uatapp02.easyhro.com/WebMobile/api',
  API_BASR_URL: '',
  JWT_LOCALSTORAGE_KEY: 'dev_Authorization',
  proxy: {
    '/WebMobile': {
      target: `https://uatapp02.easyhro.com/`,
      changeOrigin: true,
      pathRewrite: {
        '^/WebMobile': '/WebMobile',
      },
    },
  },
} as Partial<ConfigType>;
