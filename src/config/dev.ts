import type { ConfigType } from "./index";

export default {
  API_BASR_URL: `https://localhost:8080/`,
  JWT_LOCALSTORAGE_KEY: "dev_Authorization",
  proxy: {
    "/api": {
      target: `http://localhost:8080/`,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    },
  },
} as Partial<ConfigType>;
