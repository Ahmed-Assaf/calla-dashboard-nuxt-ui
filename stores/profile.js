import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", () => {
  // auth store
  const { userInfo } = storeToRefs(useAuthStore());

  // country codes
  const profile = ref(null);

  // fetch country codes data
  const { fetchData, resultData, loading: profileLoading } = useFetchData();

  const fetchProfile = async (options) => {
    await fetchData({
      url: "provider/settings/profile",
      headers: {
        Authorization: `Bearer ${userInfo.value.token}`,
      },
      onSuccess: () => {
        profile.value = resultData.value;

        // if (options.onSuccess) {
        //   options.onSuccess();
        // }
      },
    });
  };

  return {
    profile,
    profileLoading,
    fetchProfile,
  };
});
