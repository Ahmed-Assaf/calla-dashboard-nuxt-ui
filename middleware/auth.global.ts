export default defineNuxtRouteMiddleware(async (to, from) => {
  const requiresAuth = to.meta.requiresAuth;

  if (process.client) {
    const { isAuthed } = storeToRefs(useAuthStore());
    const { setAuth } = useAuthStore();
    const { $i18n } = useNuxtApp();

    // local route
    const localeRoute = useLocaleRoute();

    if (!isAuthed.value) {
      // Check if user is not authenticated
      console.log("User is not authenticated");

      console.log(to.name.includes("auth-login"));

      if (!to.name.includes("auth-login")) {
        // Check if not already on login page
        return await navigateTo(localeRoute({ name: "auth-login" }));
      }
    } else {
      setAuth();
    }
  }
});
