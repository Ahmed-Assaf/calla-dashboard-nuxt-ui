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
  const resMsg = ref(undefined);

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
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
        lang: locale.value || "ar",
        ...options.headers,
      },
      params: { ...options.params },
      data: options.body,
    })
      .then(async (response) => {
        const res = response.data;
        resMsg.value = res.msg;
        if (response.status === 200) {
          if (res.key === "success") {
            // pagination
            if (res.data?.pagination) {
              pagination.value = res.data.pagination;
            }

            resultData.value = res.data;

            if (options.getSuccess) {
              // toast
              toast.add({
                description: resMsg.value,
                timeout: 3000,
                color: "primary",
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
          } else if (res.key === "needCompleteInfo") {
            if (res.data) {
              // pagination
              if (res.data.pagination) {
                pagination.value = res.data.pagination;
              }

              resultData.value = res.data;
            }

            if (options.getSuccess) {
              // toast
              toast.add({
                description: resMsg.value,
                timeout: 3000,
                color: "primary",
              });
            }

            if (options.onNeedCompleteInfo) {
              options.onNeedCompleteInfo();
            }
          } else if (res.key === "needActive") {
            if (res.data) {
              // pagination
              if (res.data.pagination) {
                pagination.value = res.data.pagination;
              }

              resultData.value = res.data;
            }

            if (options.getSuccess) {
              // toast
              toast.add({
                description: resMsg.value,
                timeout: 3000,
                color: "warning",
              });
            }

            if (options.onNeedActive) {
              options.onNeedActive();
            }
          } else {
            if (res.key === "blocked" || res.key === "unAuthenticated") {
              await navigateTo(
                localeRoute({ name: "auth-login", replace: true })
              );
              deleteAuth();
            }

            // toast
            toast.add({
              description: resMsg.value,
              timeout: 3000,
              color: "red",
            });

            if (options.onError) {
              options.onError();
            }
          }
        } else {
          // toast
          toast.add({
            description: resMsg.value,
            timeout: 3000,
            color: "red",
          });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => (loading.value = false));
  };

  return { fetchData, resultData, pagination, loading, noData, resMsg };
};
