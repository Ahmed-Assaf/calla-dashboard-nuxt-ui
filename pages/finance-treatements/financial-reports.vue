<template>
  <div>
    <GeneralPageHeading
      :title="[{ label: $t('finance_treatements.financial_history') }]"
    />

    <div class="grid grid-cols-12 mb-8">
      <div class="col md:col-span-6 col-span-12">
        <FinanceTreatementsSummayCard />
      </div>

      <div class="col md:col-span-6 col-span-12">
        <FinanceTreatementsSloganCard
          :image="{ src: '/images/settlement.svg', width: '100px' }"
        >
          <div class="flex items-center gap-4 flex-1">
            <p class="font-bukra text-xs leading-loose">
              {{ $t("finance_treatements.settlement.description") }}
            </p>

            <GeneralTheButton
              :label="$t('finance_treatements.settlement.request')"
              class="w-fit px-5"
              :ui="{
                rounded: 'rounded-xl',
              }"
              size="xl"
            />
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
  title: "pages.financial_reports",
});

// i18n
const { t } = useI18n();

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
const paginateData = ref({});
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
