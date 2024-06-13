<template>
  <UToggle
    color="primaryColor"
    v-model="receive_new_orders"
    id="receive_new_orders"
    @click="switchOrderReceive"
  />
</template>

<script setup>
// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { resultData, fetchData } = useFetchData();

const orderCookie = useCookie("receive_new_orders");

// page heading
const receive_new_orders = ref(orderCookie.value || false);

// switch receive new orders
const switchOrderReceive = async () => {
  fetchData({
    url: "provider/switch-receiving-order-status",
    method: "POST",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      _method: "PATCH",
    },
    getSuccess: true,
    onSuccess: () => {
      orderCookie.value = resultData.value;
    },
  });
};
</script>

<style></style>
