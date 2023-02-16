/* eslint-disable import/no-anonymous-default-export */
// https://github.com/dilanx/craco/blob/master/packages/craco/README.md#configuration-file
// https://www.npmjs.com/package/craco-babel-loader
import path from "path";
import config from "./src/config";
const CracoLessPlugin = require("craco-less");

const pathResolve = (pathUrl: string) => path.join(__dirname, pathUrl);

export default async function () {
  return {
    webpack: {
      alias: {
        "@": pathResolve("./src"),
      },
    },
    // 代理接口
    devServer: {
      // https: true,
      proxy: config.proxy || {
        "/api": {
          target: `http://localhost:8080/`,
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
      },
    ],
    babel: {
      plugins: [
        [
          "import",
          {
            libraryName: "zarm",
            style: true, // or 'css'
          },
        ],
        [
          "formatjs",
          {
            idInterpolationPattern: "[sha512:contenthash:base64:6]",
            ast: true,
          },
        ],
      ],
    },
  };
}
