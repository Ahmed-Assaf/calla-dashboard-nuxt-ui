<template>
  <div>
    <GeneralPageHeading :title="$t('product.plural')" />

    <GeneralTheDataTable
      class="stripe-table"
      :columns="columns"
      :rows="products"
      :loading
    >
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

// auth store
const { useInfo } = storeToRefs(useAuthStore());

// fetch data
const { resultData: products, fetchData, loading } = useFetchData();

onMounted(() => {
  fetchData({
    url: "provider/products/index",
    headers: {
      Authorization: `Bearer ${useInfo.value.token}`,
    },
  });
});
</script>

<style></style>
