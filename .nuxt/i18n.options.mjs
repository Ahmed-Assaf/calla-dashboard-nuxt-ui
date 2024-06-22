
// @ts-nocheck
import locale_F_58_F_58_My_32files_Front_32end_Projects_calla_dashboard_nuxt_ui_locales_en_json from "../locales/en.json";
import locale_F_58_F_58_My_32files_Front_32end_Projects_calla_dashboard_nuxt_ui_locales_ar_json from "../locales/ar.json";


export const localeCodes =  [
  "en",
  "ar"
]

export const localeLoaders = {
  "en": [{ key: "../locales/en.json", load: () => Promise.resolve(locale_F_58_F_58_My_32files_Front_32end_Projects_calla_dashboard_nuxt_ui_locales_en_json), cache: false }],
  "ar": [{ key: "../locales/ar.json", load: () => Promise.resolve(locale_F_58_F_58_My_32files_Front_32end_Projects_calla_dashboard_nuxt_ui_locales_ar_json), cache: false }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "en",
      "iso": "en",
      "name": "English",
      "dir": "ltr",
      "files": [
        "locales/en.json"
      ]
    },
    {
      "code": "ar",
      "iso": "ar",
      "name": "العربية",
      "dir": "rtl",
      "files": [
        "locales/ar.json"
      ]
    }
  ],
  "defaultLocale": "ar",
  "defaultDirection": "rtl",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": false,
  "langDir": "locales",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "iso": "en",
    "name": "English",
    "dir": "ltr",
    "files": [
      {
        "path": "locales/en.json",
        "cache": false
      }
    ]
  },
  {
    "code": "ar",
    "iso": "ar",
    "name": "العربية",
    "dir": "rtl",
    "files": [
      {
        "path": "locales/ar.json",
        "cache": false
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
