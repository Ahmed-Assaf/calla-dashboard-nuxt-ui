export const useSwitchLang = (code) => {
  const { locale, locales, getLocaleCookie, setLocaleCookie } = useI18n();

  const switchLocalePath = useSwitchLocalePath(code);

  const cookie = computed(() => {
    return setLocaleCookie(locale);
  });

  console.log("cookie", locale.value);

  // current locale
  const currentLocaleName = computed(() => {
    let obj = locales.value.find((l) => l.code === locale.value);

    return obj.name;
  });

  return { availableLocales: locales, currentLocaleName, switchLocalePath };
};
