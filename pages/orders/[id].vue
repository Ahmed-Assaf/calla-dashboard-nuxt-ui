<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('order.details.this') }]">
      <template #center>
        <OrderDetailsSteps
          v-if="order && !orderLoading"
          :steps="steps"
          :active="order.status"
        />
      </template>

      <template #end v-if="!orderLoading">
        <div class="flex items-center justif-end gap-3 flex-wrap">
          <UButton
            v-if="order.actions.accept_button"
            :label="$t('order.details.actions.accept')"
            class="rounded-xl"
            @click="acceptOrder"
            :loading
          />

          <OrderReject
            v-if="order.actions.refuse_button"
            @refuse="fetchDetails"
          />

          <UButton
            v-if="order.actions.in_progress_button"
            :label="$t('order.details.actions.processed')"
            class="rounded-xl"
            @click="startProcessOrder"
            :loading
          />

          <template v-if="order.actions.deliver_to_delegate_button">
            <UButton
              :label="$t('order.delivered_representative')"
              class="rounded-xl"
              @click="deliverOrder"
              :loading
            />
          </template>
        </div>
      </template>
    </GeneralPageHeading>

    <div class="grid grid-cols-12 mb-8">
      <div class="col lg:col-span-6 col-span-12">
        <OrderProductsTable
          class="ring-0 mb-4"
          :data="order.items"
          :loading="orderLoading"
        />

        <OrderInfo class="h-fit" :data="order" />
      </div>

      <div class="col lg:col-span-6 col-span-12">
        <OrderSummary
          class="h-fit mb-4"
          :data="order.order_summery"
          v-if="!orderLoading"
        />

        <OrderClient :data="order.user" v-if="!orderLoading" />

        <OrderDelegate
          :data="order.delegate"
          v-if="!orderLoading && order.delegate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "order.details.this",
});

// i18n
const { t } = useI18n();

// order steps
const steps = computed(() => {
  if (order.value.status < 7) {
    return [
      {
        id: 0,
        label: t("order.details.status.new"),
      },
      {
        id: 1,
        label: t("order.wait_pay"),
      },
      {
        id: 2,
        label: t("order.preparing"),
      },
      {
        id: 3,
        label: t("order.prepared"),
      },
      {
        id: 4,
        label: t("order.delivering_representative"),
      },
      {
        id: 5,
        label: t("order.delivering"),
      },
      {
        id: 6,
        label: t("order.finished"),
      },
    ];
  } else if (order.value.status === 7) {
    return [
      {
        id: 7,
        label: t("order.rejected"),
        error: true,
      },
    ];
  } else if (order.value.status === 8) {
    return [
      {
        id: 8,
        label: t("order.cancelled"),
        error: true,
      },
    ];
  }
});

const route = useRoute();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading, resultData } = useFetchData();
loading.value = false;

// order loading
const order = ref({}),
  orderLoading = ref(true);

// fetch order details
const fetchDetails = async () => {
  orderLoading.value = true;

  await fetchData({
    url: `provider/orders/details/${route.params.id}`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      order.value = resultData.value;
    },
  });
  orderLoading.value = false;
};

// accept order
const acceptOrder = async () => {
  await fetchData({
    url: `provider/orders/accept/${route.params.id}`,
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    getSuccess: true,
    onSuccess: async () => {
      await fetchDetails();
    },
  });
};

// start processing order
const startProcessOrder = async () => {
  await fetchData({
    url: `provider/orders/in-progress/${route.params.id}`,
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    getSuccess: true,
    onSuccess: async () => {
      await fetchDetails();
    },
  });
};

// deliver order
const deliverOrder = async () => {
  await fetchData({
    url: `provider/orders/process/${route.params.id}`,
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    getSuccess: true,
    onSuccess: async () => {
      await fetchDetails();
    },
  });
};

onMounted(async () => {
  await fetchDetails();
});
</script>

<style></style>
