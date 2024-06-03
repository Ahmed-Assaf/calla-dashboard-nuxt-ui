<template>
  <div>
    <GeneralPageHeading :title="headingTitle" />

    <div class="grid grid-cols-12 mb-8">
      <div class="col lg:col-span-6 col-span-12">
        <GeneralTheCard class="card">
          <ProductGroupAttributesForm secondBtn @add-group="fetchAttributes" />
        </GeneralTheCard>
      </div>

      <div class="col lg:col-span-6 col-span-12">
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
          <UButton
            type="button"
            size="xl"
            class="rounded-xl px-4"
            :label="$t('product.confirm_create')"
          >
            <template #trailing>
              <img
                src="/images/icons/plus-square-filled-white.svg"
                width="18"
              />
            </template>
          </UButton>

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
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "product.group.plural.this",
});

// route
const route = useRoute();

// i18n
const { t } = useI18n();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// locale route
const localeRoute = useLocaleRoute();

// edit pages param
const editPage = computed(() => route.query.action !== "create");

// heading title
const headingTitle = computed(() => {
  if (editPage.value) {
    return [
      { label: t("product.plural"), to: localeRoute({ name: "products" }) },
      {
        label: t("product.edit"),
      },
      {
        label: t("product.group.plural.this"),
      },
    ];
  } else {
    return [
      { label: t("product.plural"), to: localeRoute({ name: "products" }) },
      {
        label: t("product.create_1"),
      },
      { label: t("product.group.plural.this") },
    ];
  }
});

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
    url: `provider/products/get-product-variants/${route.params.id}`,
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
