<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('product.plural') }]" />

    <GeneralTheDataTable class="stripe-table" @update:page="fetchProducts">
      <UTable
        :columns="columns"
        :rows="products.products"
        :loading="loading"
        :loadingState="{ label: $t('general.loading') }"
        :emptyState="{ label: $t('general.no_data') }"
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
            <ProductTableDelete :product-id="row.id" @deleted="fetchProducts" />

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

      <!-- foot data -->
      <template #tfoot>
        <GeneralTheButton
          class="justify-between gap-7"
          :label="$t('product.create')"
          link="products-create"
          icon-image="/images/icons/plus-square-filled-white.svg"
          :to="localeRoute({ name: 'products-id', params: { id: 'create' } })"
        />
      </template>
    </GeneralTheDataTable>
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "pages.products_management",
});

// i18n
const { t } = useI18n();

const localeRoute = useLocaleRoute();

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
    key: "price",
    label: t("general.table.price"),
    sortable: true,
  },
  {
    key: "price_after_discount",
    label: t("general.table.discount"),
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
  {
    key: "is_available",
    label: t("product.table.show.title"),
  },
  {
    key: "actions",
  },
]);

// pagination
const paginateData = ref({});
provide("paginateData", paginateData);

// fetch products
const fetchProducts = (page = 1) => {
  fetchData({
    url: "provider/products/index",
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
