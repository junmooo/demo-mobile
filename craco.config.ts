/* eslint-disable import/no-anonymous-default-export */
// https://github.com/dilanx/craco/blob/master/packages/craco/README.md#configuration-file
// https://www.npmjs.com/package/craco-babel-loader
import path from "path";
import config from "./src/config";

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
    style: {
      sass: {
        loaderOptions: {
          sourceMap: true,
          additionalData: `@import "@nutui/nutui-react/dist/styles/variables.scss";@import "./src/theme/custom_theme.scss";` /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */,
        },
      },
    },
    babel: {
      plugins: [
        [
          "import",
          {
            libraryName: "@nutui/nutui-react",
            libraryDirectory: "dist/esm",
            style: true,
            camel2DashComponentName: false,
          },
          "nutui-react",
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
