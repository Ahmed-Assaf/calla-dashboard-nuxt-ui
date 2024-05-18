<template>
  <div>
    <GeneralPageHeading :title="$t('product.plural')" />

    <GeneralTheDataTable class="stripe-table">
      <UTable :columns="columns" :rows="products.products" :loading="loading">
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

      <!-- foot data -->
      <template #tfoot>
        <GeneralTheButton
          class="justify-between gap-7"
          :label="$t('product.create')"
          link="products-create"
          icon-image="/images/icons/plus-square-filled-white.svg"
        />
      </template>
    </GeneralTheDataTable>
  </div>
</template>

<script lang="ts" setup>
// page meta
definePageMeta({
  title: "pages.products_management",
});

// i18n
const { t } = useI18n();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading, resultData: products, pagination } = useFetchData();

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

onMounted(() => {
  fetchData({
    url: "provider/products/index",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      console.log(pagination.value);
    },
  });
});
</script>

<style></style>
