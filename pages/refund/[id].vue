<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('order.details.this') }]">
      <template #center>
        <OrderDetailsSteps
          v-if="order && !loading"
          :steps="steps"
          :active="order.status"
        />
      </template>

      <template #end>
        <div class="flex items-center justif-end gap-3 flex-wrap">
          <template v-if="order.status === 0">
            <UButton
              :label="$t('order.details.actions.accept')"
              class="rounded-xl"
            />

            <OrderReject />
          </template>

          <UButton
            v-if="order.status === 2"
            :label="$t('order.details.actions.processed')"
            class="rounded-xl"
          />
        </div>
      </template>
    </GeneralPageHeading>

    <div class="grid grid-cols-12 mb-8">
      <div class="col lg:col-span-6 col-span-12">
        <OrderProductsTable class="ring-0 mb-4" :data="order.items" />

        <OrderInfo class="h-fit" :data="order" />
      </div>

      <div class="col lg:col-span-6 col-span-12">
        <OrderSummary
          class="h-fit mb-4"
          :data="order.order_summery"
          v-if="!loading"
        />

        <OrderClient :data="order.user" v-if="!loading" />
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
const steps = computed(() => [
  {
    id: 0,
    label: t("refund.pending_approve"),
  },
  {
    id: 1,
    label: t("refund.received"),
  },
  {
    id: 2,
    label: t("refund.on_way_provider"),
  },
  {
    id: 6,
    label: t("order.finished"),
  },
]);

const route = useRoute();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading, resultData: order } = useFetchData();

// fetch order details
const fetchDetails = async () => {
  await fetchData({
    url: `provider/orders/details/${route.params.id}`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
  });
};

onMounted(async () => {
  await fetchDetails();
});
</script>

<style></style>
