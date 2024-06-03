import { defineStore } from "pinia";

export const useAbilitiesStore = defineStore("abilities", () => {
  // auth store
  const { userInfo } = storeToRefs(useAuthStore());
  // abilities
  const abilities = ref([]);

  // fetch abilities data
  const { fetchData, resultData, loading: abilitiesLoading } = useFetchData();

  const fetchAbilities = async () => {
    if (!abilities.value.length) {
      await fetchData({
        url: "provider/abilities/list",
        headers: {
          Authorization: `Bearer ${userInfo.value.token}`,
        },
        onSuccess: () => {
          abilities.value = resultData.value;
        },
      });
    }
  };

  return {
    abilities,
    abilitiesLoading,
    fetchAbilities,
  };
});
