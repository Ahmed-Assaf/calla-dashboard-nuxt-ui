<template>
  <div>
    <GeneralPageHeading :title="$t('product.plural')" />

    <GeneralTheDataTable
      class="stripe-table"
      :columns
      :rows="products.products"
      :loading
    >
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
  },
  {
    key: "price",
    label: t("general.table.price"),
  },
  {
    key: "price_after_discount",
    label: t("general.table.discount"),
  },
  {
    key: "created_at",
    label: t("general.table.date"),
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
