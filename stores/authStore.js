import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isAuthed = ref(false);
  const userInfo = ref({});

  const setAuth = () => {
    isAuthed.value = true;
    userInfo.value = useCookie("auth").value;
  };

  const deleteAuth = () => {
    isAuthed.value = false;
    useCookie("auth").value = null;
    userInfo.value = {};
  };

  return {
    isAuthed,
    userInfo,
    setAuth,
    deleteAuth,
  };
});
