export const usePasswordToggle = () => {
  const type = ref("password");
  const togglePassword = () => {
    type.value = type.value === "password" ? "text" : "password";
  };

  const passIcon = computed(() => {
    return type.value === "password"
      ? "/images/icons/eye.svg"
      : "/images/icons/eye-slash.svg";
  });

  return {
    type,
    passIcon,
    togglePassword,
  };
};
