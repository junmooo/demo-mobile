import enUS from './en_US';
import zhCN from './zh_CN';
import { createIntl, createIntlCache } from 'react-intl';
import appConfig from '@/config';

/**
 * 扁平化对象
 * @param obj
 * @param prefix 前缀
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flattenObject = (obj: any, prefix = '') =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.keys(obj).reduce((acc: any, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && Object.keys(obj[k]).length > 0)
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

/**
 * 加载多语言配置文件
 * @param lang
 * @returns
 */
export function loadLocale(lang?: string) {
  let locale = 'zh';
  let message = zhCN;
  switch (lang) {
    case 'en_US':
      locale = 'en';
      message = enUS;
      break;
    default:
      break;
  }
  return {
    locale,
    message: flattenObject(message),
  };
}

const cache = createIntlCache();
const myIntlConfig = () => {
  const res = loadLocale(
    localStorage.getItem(appConfig.LANG_LOCALSTORAGE_KEY)?.replaceAll('"', ''),
  );
  return { locale: res.locale, messages: res.message };
};

export const myIntl = createIntl(myIntlConfig(), cache);
