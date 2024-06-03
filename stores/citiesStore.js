import { defineStore } from "pinia";

export const useCitiesStore = defineStore("cities", () => {
  // country codes
  const cities = ref([]);

  // fetch country codes data
  const { fetchData, resultData, loading: citiesLoading } = useFetchData();
  citiesLoading.value = false;

  const fetchCities = async (options) => {
    if (!cities.value.length) {
      await fetchData({
        url: "cities",
        onSuccess: () => {
          cities.value = resultData.value;

          // if (options.onSuccess) {
          //   options.onSuccess();
          // }
        },
      });
    }
    // else {
    //   if (options.onSuccess) {
    //     options.onSuccess();
    //   }
    // }
  };

  return {
    cities,
    citiesLoading,
    fetchCities,
  };
});
