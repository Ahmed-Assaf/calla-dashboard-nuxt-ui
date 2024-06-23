// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // app: {
  //   pageTransition: { name: "page", mode: "out-in" },
  // },
  modules: ["@nuxt/ui", "@nuxtjs/i18n", "@pinia/nuxt"],
  css: ["~/assets/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    public: {
      GOOGLE_MAPS_API_KEY: "AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA",
      base_url: "https://dashboard.calla-app.com/api/",
      device_id: "1",
    },
  },
  i18n: {
    // lazy: true,
    strategy: "prefix_except_default",
    langDir: "locales",
    defaultLocale: "ar",
    defaultDirection: "rtl",
    locales: [
      {
        code: "en",
        iso: "en",
        name: "English",
        file: { path: "en.json", cache: false },
        dir: "ltr",
      },
      {
        code: "ar",
        iso: "ar",
        name: "العربية",
        file: { path: "ar.json", cache: false },
        dir: "rtl",
      },
    ],
  },
});
