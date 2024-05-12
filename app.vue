<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// route
const route = useRoute();

// // auth store
// const { setAuth } = useAuthStore();

// // check account block
// const { checkBlock } = useCheckAuthBlock();

// watch(
//   () => route.fullPath,
//   async (newVal) => {
//     if (newVal) {
//       await checkBlock();
//     }
//   }
// );

// onBeforeMount(async () => {
//   if (localStorage.getItem("mac_address")) {
//     return localStorage.getItem("mac_address");
//   } else {
//     const ma = Math.random().toString(36).substring(2, 9);
//     return localStorage.setItem("mac_address", ma);
//   }
// });

// onMounted(async () => {
//   if (useCookie("auth").value) {
//     setAuth();
//   }
// });
</script>
