export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const { isAuthed } = storeToRefs(useAuthStore());
    const { setAuth } = useAuthStore();
    const { $i18n } = useNuxtApp();

    // local route
    const localeRoute = useLocaleRoute();

    if (useCookie("auth").value) {
      setAuth();
    }

    if (!isAuthed.value) {
      // Check if user is not authenticated
      if (!to.name.includes("auth-login")) {
        // Check if not already on login page
        return await navigateTo(localeRoute({ name: "auth-login" }));
      }
    } else {
      setAuth();
    }
  }
});
