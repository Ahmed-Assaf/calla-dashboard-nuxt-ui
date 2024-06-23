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
            refund
          />

          <UButton
            v-if="order.actions.finished_button"
            :label="$t('refund.confirm_receive')"
            class="rounded-xl"
            @click="confirmReceiveOrder"
            :loading
          />
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

        <OrderInfo class="h-fit" :data="order" v-if="!orderLoading" refund />
      </div>

      <div class="col lg:col-span-6 col-span-12">
        <OrderRefundReason
          class="h-fit mb-4"
          :data="order"
          v-if="!orderLoading"
        />

        <OrderClient :data="order.user" v-if="!orderLoading" class="mb-4" />

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
    url: `provider/retrieval-orders/details/${route.params.id}`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      order.value = resultData.value;
    },
  });
  orderLoading.value = false;
};

// order steps
const steps = computed(() => {
  if (order.value.status < 16) {
    return [
      {
        id: 10,
        label: t("refund.pending_approve"),
      },
      {
        id: 11 || 12,
        label: t("refund.received"),
      },
      {
        id: 13 || 14,
        label: t("refund.on_way_provider"),
      },
      {
        id: 15,
        label: t("order.finished"),
      },
    ];
  } else if (order.value.status === 16) {
    return [
      {
        id: 16,
        label: t("order.rejected"),
        error: true,
      },
    ];
  }
});

// accept order
const acceptOrder = async () => {
  await fetchData({
    url: `provider/retrieval-orders/accept/${route.params.id}`,
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

// confirm receive order
const confirmReceiveOrder = async () => {
  await fetchData({
    url: `provider/retrieval-orders/finished/${route.params.id}`,
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
