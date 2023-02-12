import { NoResult } from "@/components";
import { loadLocale } from "@/locale";
import { ConfigProvider } from "@nutui/nutui-react";
import type { BaseLang } from "@nutui/nutui-react/dist/locales/base";
import enUS from "@nutui/nutui-react/dist/locales/en-US";
import zhCN from "@nutui/nutui-react/dist/locales/zh-CN";
import { useLocalStorageState } from "ahooks";
import React, { Fragment, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import type { RouteObject } from "react-router-dom";
import { useRoutes, useSearchParams } from "react-router-dom";
import config from "../config";

const UILocaleMap: Record<string, BaseLang> = {
  zhCN,
  enUS,
};

/**
 * 路由守卫
 * 处理url中传递来的单点登录的用户信息和国际化配置
 */
const RouterGurad = React.memo(function RouterGurad(props: {
  routes: RouteObject[];
}) {
  const { routes } = props;

  const [searchParams] = useSearchParams();

  const [authorization, setAuthorization] = useLocalStorageState(
    config.JWT_LOCALSTORAGE_KEY
  ); // 当前登录用户信息
  const [lang, setLang] = useLocalStorageState(config.LANG_LOCALSTORAGE_KEY, {
    defaultValue: "zh_CN",
  }); // 当前语言
  const [UILocale, setUILocale] = useState(zhCN); // UI组件库的国际化配置
  const [appLocale, setAppLocale] = useState<{
    locale: string;
    message: any;
  }>(); // app的国际化配置

  useEffect(() => {
    if (appLocale?.message) {
      document.title = appLocale?.message["page.title"];
    }
  }, [appLocale?.message]);

  useEffect(() => {
    const authorization = searchParams.get("easyToken");
    setLang(searchParams.get("language") ?? "zh_CN");
    setAuthorization(authorization);
    // setLang(lang ?? '');
  }, [searchParams, setAuthorization, setLang]);

  useEffect(() => {
    setUILocale(UILocaleMap[lang]);
    setAppLocale(loadLocale(lang));
  }, [lang]);

  const route = useRoutes(routes);

  return appLocale ? (
    <IntlProvider messages={appLocale.message} locale={appLocale.locale}>
      <ConfigProvider locale={UILocale}>{route}</ConfigProvider>
    </IntlProvider>
  ) : (
    <></>
  );
});

export default RouterGurad;
