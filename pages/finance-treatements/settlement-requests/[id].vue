<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('order.details.this') }]">
      <template #center>
        <OrderDetailsSteps :steps="steps" active="waiting_accept" />
      </template>
    </GeneralPageHeading>

    <div class="grid grid-cols-12 mb-8">
      <div class="col md:col-span-8 col-span-12">
        <FinanceTreatementsSummayCard />
      </div>

      <div class="col md:col-span-4 col-span-12">
        <FinanceTreatementsSloganCard
          :image="{ src: '/images/settlement-1.svg', width: '120px' }"
        >
          <div class="flex items-center gap-4 flex-1">
            <h5 class="font-bukra font-bold leading-loose text-sm">
              {{
                $t(
                  "finance_treatements.settlement.status.waiting_accept_description"
                )
              }}
            </h5>
          </div>
        </FinanceTreatementsSloganCard>
      </div>

      <div class="col col-span-12">
        <GeneralTheDataTable
          class="stripe-table"
          @update:page="fetchOrders(item.url, item.status)"
        >
          <UTable
            :columns="columns"
            :rows="orders"
            :loading="loading"
            :loadingState="{ label: $t('general.loading') }"
            :emptyState="{ label: $t('general.no_data') }"
            :ui="{
              wrapper: 'the-data-table',
            }"
          >
            <template #image-data="{ row }">
              <img
                :src="row.image ? row.image : '/images/product-default.svg'"
                alt=""
                class="w-12 aspect-[1] object-contain"
              />
            </template>

            <template #avg_rate-data="{ row }">
              <div>
                {{ row.avg_rate }}
                <UIcon
                  name="i-heroicons-star-solid"
                  dynamic
                  class="text-base text-starActive"
                />
              </div>
            </template>

            <template #is_available-data="{ row }">
              <ProductTableStatus
                :status="row.is_available"
                :product-id="row.id"
                @updated="fetchProducts"
              />
            </template>

            <template #actions-data="{ row }">
              <div class="flex items-center gap-2 w-max">
                <!-- delete -->
                <ProductTableDelete
                  :product-id="row.id"
                  @deleted="fetchProducts"
                />

                <!-- edit -->
                <UButton
                  :to="
                    localeRoute({
                      name: 'products-id',
                      params: { id: row.id },
                    })
                  "
                  square
                  class="rounded-full"
                  size="2xs"
                >
                  <img
                    src="/images/icons/pen-filled-white.svg"
                    :alt="$t('product.edit')"
                    class="w-4 h-4"
                  />
                </UButton>
              </div>
            </template>
          </UTable>
        </GeneralTheDataTable>
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
    name: "waiting_accept",
    label: t("finance_treatements.settlement.status.waiting_accept"),
  },
  {
    name: "finished",
    label: t("order.finished"),
  },
]);

// columns
const columns = computed(() => [
  {
    key: "id",
    label: t("general.table.id"),
  },
  {
    key: "number",
    label: t("order.table.number"),
    sortable: true,
  },
  {
    key: "client_name",
    label: t("general.table.client_name"),
  },
  {
    key: "total_price",
    label: t("order.table.total_price"),
    sortable: true,
  },
  {
    key: "date",
    label: t("order.table.date"),
    sortable: true,
  },
  {
    key: "address",
    label: t("order.table.address"),
  },
  {
    key: "actions",
  },
]);

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading, resultData: orders } = useFetchData();

// pagination
const paginateData = ref(null);
provide("paginateData", paginateData);

// fetch orders
const fetchOrders = async () => {
  fetchData({
    url: "",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      paginateData.value = orders.value.pagination;
    },
  });
};

onMounted(async () => {
  await fetchOrders();
});
</script>

<style></style>
