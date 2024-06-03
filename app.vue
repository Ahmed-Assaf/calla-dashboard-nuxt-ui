<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />

    <UModals />
  </div>
</template>

<script setup>
// route
// const route = useRoute();

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

// import { GeneralActionModal } from "#components";
// const modal = useModal();
onMounted(() => {
  // modal.open(GeneralActionModal, {
  //   actionData: {
  //     title: "Title",
  //   },
  //   onClose: () => {
  //     modal.close();
  //   },
  // });
});
</script>

<style>
/* .page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
} */
</style>
