import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import { Get } from "./modules/Function";
import { PATH, V } from './config/site.config';

export const lang = Get( 'lang' ) ? Get( 'lang' ) : 'zh-CN';
export const allLang = {
    'zh-CN': '简体中文'
};
i18n.use( Backend ).use( initReactI18next ).init({
    backend: {
        loadPath: `${PATH}/lib/lang/{{lng}}.json?${V}`,
    },
    lng: lang,
    fallbackLng: 'zh-CN',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;