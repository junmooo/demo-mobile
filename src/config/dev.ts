import type { ConfigType } from "./index";

export default {
  proxy: {
    "/api": {
      target: `http://localhost:8088/`,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    },
  },
} as Partial<ConfigType>;
