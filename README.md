基于 `create-react-app` 创建的项目，使用 `craco` 来自定义部分`webpack`配置。UI 库为`nutui`

`nutui`简介：https://nutui.jd.com/react/#/

## 项目目录介绍

- component：公共组件库
- config：项目各环境的配置
- iconfont：图标
- locale：国际化的不同语言的文本文件
- mock：mock 数据
- pages：页面
- router：路由配置
- theme：自定义主题

## 运行

```shell
yarn install  # install package

yarn start  # start app

# view http://localhost:3000/#/approval?language=zh_CN&easyToken=XXXX
# language值可以是en_US或zh_CN
# 获取token：https://uatapp02.easyhro.com/WebMobile/auth/getTokenUser?clientCode=astcorehr&username=H7217851
```
