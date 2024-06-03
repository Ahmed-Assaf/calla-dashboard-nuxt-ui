import { defineStore } from "pinia";

export const useCountryCodesStore = defineStore("country-codes", () => {
  // country codes
  const countryCodes = ref(null);

  // fetch country codes data
  const {
    fetchData,
    resultData,
    loading: countryCodesLoading,
  } = useFetchData();

  const fetchCountryCodes = async (options) => {
    if (!countryCodes.value) {
      await fetchData({
        url: "country-keys",
        onSuccess: () => {
          countryCodes.value = resultData.value;

          if (options.onSuccess) {
            options.onSuccess();
          }
        },
      });
    } else {
      if (options.onSuccess) {
        options.onSuccess();
      }
    }
  };

  return {
    countryCodes,
    countryCodesLoading,
    fetchCountryCodes,
  };
});
