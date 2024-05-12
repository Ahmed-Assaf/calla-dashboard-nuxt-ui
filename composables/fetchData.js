export const useFetchData = () => {
  // toast
  const toast = useToast();

  // axios
  const axios = useNuxtApp().$axios;

  // local route
  const { locale } = useI18n();

  // auth store
  const { isAuthed, userInfo } = storeToRefs(useAuthStore());
  const { deleteAuth } = useAuthStore();

  // i18n
  const localeRoute = useLocaleRoute();

  const resultData = ref([]);
  const pagination = ref({});
  const loading = ref(true);
  const noData = ref(false);

  const fetchData = async (options) => {
    const needActivateQuery = computed(() => {
      return !isAuthed.value
        ? {
            ...options.activateQuery,
          }
        : {
            phone: userInfo.value.phone,
            country_code: userInfo.value.country_code,
          };
    });

    // loading
    loading.value = true;

    await axios({
      url: options.url,
      method: options.method || "GET",
      headers: { lang: locale.value || "ar", ...options.headers },
      params: { ...options.params },
      data: options.body,
    })
      .then(async (response) => {
        const res = response.data;
        if (response.status === 200) {
          if (res.key === "success") {
            if (res.data) {
              // pagination
              if (res.data.pagination) {
                resultData.value = res.data.data;
                pagination.value = res.data.pagination;
              } else {
                resultData.value = res.data;
              }
            }

            if (options.getSuccess) {
              // toast
              toast.add({
                severity: "success",
                detail: res.msg,
                life: 3000,
              });
            }

            if (options.onSuccess) {
              options.onSuccess();
            }

            if (resultData.value && resultData.value.length === 0) {
              noData.value = true;
            } else {
              noData.value = false;
            }

            // loading
            loading.value = false;
          } else if (res.key === "needActive") {
            // if () {
            await navigateTo(
              localeRoute({
                name: "auth-verification-code",
                query: needActivateQuery.value,
              })
            );
            // }
          } else {
            if (res.key === "blocked") {
              await navigateTo(
                localeRoute({ name: "auth-login", replace: true })
              );
              deleteAuth();
            }
            // toast
            toast.add({
              severity: "error",
              detail: res.msg,
              life: 3000,
            });

            if (options.onError) {
              options.onError();
            }
          }
        } else {
          toast.add({
            severity: "error",
            detail: res.msg,
            life: 3000,
          });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => (loading.value = false));
  };

  return { fetchData, resultData, pagination, loading, noData };
};
