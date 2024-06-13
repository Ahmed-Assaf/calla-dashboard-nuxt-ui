import { GeneralActionModal } from "#components";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const permissionId = to.meta.permissionId;

  if (process.client) {
    const { isAuthed, userInfo } = storeToRefs(useAuthStore());
    const { $i18n } = useNuxtApp();
    const localeRoute = useLocaleRoute();

    // modal
    const modal = useModal();

    const isAllowed = computed(() => {
      if (isAuthed.value) {
        const userAbility = userInfo.value.abilities.find(
          (ab) => ab.id == permissionId
        );

        return userAbility ? true : false;
      }
    });

    if (permissionId && !isAllowed.value) {
      modal.open(GeneralActionModal, {
        actionData: {
          image: "/images/warning.svg",
          title: $i18n.t("user.permissions.no_access"),
        },
        onClose: async () => {
          modal.close();
          await navigateTo(localeRoute({ name: "index" }));
        },
      });
      return false;
    }
  }
});
