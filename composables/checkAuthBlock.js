export const useCheckAuthBlock = () => {
  const { isAuthed, userInfo } = storeToRefs(useAuthStore());

  const { fetchData } = useFetchData();

  const checkBlock = async () => {
    if (isAuthed.value) {
      return fetchData({
        url: "profile",
        headers: {
          Authorization: `Bearer ${userInfo.value.token}`,
        },
      });
    }
  };

  return {
    checkBlock,
  };
};
