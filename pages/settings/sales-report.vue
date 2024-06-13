<template>
  <div>
    <GeneralPageHeading
      :title="[{ label: $t('settings.sales_report.title') }]"
    />

    <div class="grid grid-cols-12 mb-6">
      <div class="col col-span-12">
        <GeneralTheDataTable class="stripe-table" @update:page="fetchProducts">
          <UTable
            :columns="columns"
            :rows="products.sales"
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
          </UTable>
        </GeneralTheDataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "pages.products_management",
  permissionId: 1,
});

// i18n
const { t } = useI18n();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading, resultData: products } = useFetchData();

// table columns
const columns = computed(() => [
  {
    key: "id",
    label: t("general.table.id"),
  },
  {
    key: "image",
    label: t("general.table.image"),
  },
  {
    key: "title",
    label: t("product.table.name"),
    sortable: true,
  },
  {
    key: "qty",
    label: t("settings.sales_report.table.quantity"),
    sortable: true,
  },
  {
    key: "price",
    label: t("general.table.price"),
    sortable: true,
  },
  {
    key: "selling_count",
    label: t("settings.sales_report.table.selling_count"),
    sortable: true,
  },
  {
    key: "profits",
    label: t("settings.sales_report.table.profits"),
    sortable: true,
  },
  {
    key: "created_at",
    label: t("general.table.date"),
    sortable: true,
  },
  {
    key: "avg_rate",
    label: t("general.table.rate"),
  },
]);

// pagination
const paginateData = ref(null);
provide("paginateData", paginateData);

// fetch products
const fetchProducts = (page = 1) => {
  fetchData({
    url: "provider/products/sales",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      page,
    },
    onSuccess: () => {
      paginateData.value = products.value.pagination;
    },
  });
};

// on mounted
onMounted(() => {
  fetchProducts();
});
</script>
