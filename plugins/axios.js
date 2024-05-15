import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  axios.defaults.baseURL = config.public.base_url;

  return { provide: { axios } };
});
