<template>
  <div class="grid grid-cols-12 mb-8">
    <div class="col md:col-span-6">
      <GeneralTheCard class="card">
        <ProductGroupAttributesForm secondBtn @add-group="fetchAttributes" />
      </GeneralTheCard>
    </div>

    <div class="col md:col-span-6">
      <GeneralTheCard class="card">
        <ProductGroupAttributesTable
          :table-data="{
            attributes,
            tableLoading,
            paginateData,
            columns: groupsColumns,
          }"
          @update="fetchAttributes"
        />
      </GeneralTheCard>
    </div>

    <div class="col col-span-12">
      <div class="flex items-center gap-3 flex-wrap">
        <ProductGroupDefaultProduct
          :table-data="{
            attributes,
            tableLoading,
            paginateData,
            columns: defaultGroupColumns,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// route
const route = useRoute();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// locale route
const localeRoute = useLocaleRoute();

// groups table

// table columns
const groupsColumns = computed(() => [
  {
    key: "image",
  },
  {
    key: "options_ids",
  },
  {
    key: "stock",
  },
  {
    key: "price_after_discount",
  },
  {
    key: "price",
  },
  {
    key: "actions",
  },
]);

const defaultGroupColumns = computed(() => [
  {
    key: "id",
  },
  {
    key: "image",
  },
  {
    key: "options_ids",
  },
  {
    key: "stock",
  },
  {
    key: "price_after_discount",
  },
  {
    key: "price",
  },
]);

const tableLoading = ref(false);

// pagination
const paginateData = ref({});
provide("paginateData", paginateData);

// fetch data
const { fetchData, resultData: attributes } = useFetchData();

// fetch products
const fetchAttributes = (page = 1) => {
  tableLoading.value = true;
  fetchData({
    url: `provider/products/get-product-variants/${route.query.product_id}`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      page,
    },
    onSuccess: () => {
      paginateData.value = attributes.value.pagination;
    },
  });
  tableLoading.value = false;
};

// on mounted
onMounted(() => {
  fetchAttributes();
});
</script>

<style scoped lang="scss">
.card {
  height: calc(100vh - 86px);
  @apply overflow-y-auto;
}
</style>
