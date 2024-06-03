<template>
  <div class="grid grid-cols-12">
    <div class="col col-span-12">
      <UTabs
        :items="items"
        class="w-full"
        :defaultIndex="1"
        :ui="{
          list: {
            base: '!flex items-center gap-4 border-b border-b-strokeLightGray pb-3 mb-3 overflow-x-auto',
            height: 'h-fit',
            rounded: 'rounded-none',
            marker: {
              wrapper: 'top-0 left-0',
              background: 'bg-primaryColor',
              rounded: 'rounded-xl',
              shadow: 'shadow-none',
            },
            tab: {
              base: 'disabled:opacity-100 w-fit min-w-[120px] rounded-xl ui-focus-visible:ring-0',
              padding: 'px-1 py-3',
              height: 'h-fit',
              active: 'text-white',
              inactive:
                'text-textLightColor border border-strokeLightGray disabled:border-0',
              size: 'text-xs',
            },
          },
        }"
      >
        <template #default="{ item }">
          <GeneralPageHeading
            :title="[{ label: $t('order.plural') }]"
            v-if="item.type === 'title'"
            class="!mb-0"
          />

          <div class="flex items-center gap-2 relative truncate" v-else>
            {{ item.label }}
          </div>
        </template>

        <template #item="{ item }">
          <GeneralTheDataTable
            class="stripe-table"
            @update:page="fetchOrders(item.url, item.status)"
          >
            <UTable
              :columns="item.columns"
              :rows="orders.orders"
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
                <div
                  class="flex items-center justify-end gap-2 w-full min-w-max"
                >
                  <!-- details link -->
                  <UButton
                    :to="
                      localeRoute({
                        name: 'orders-id',
                        params: { id: row.id },
                      })
                    "
                    class="!p-0 rounded-xl"
                  >
                    <p class="ms-4 text-xs">{{ $t("order.details.this") }}</p>
                    <div
                      class="flex items-center justify-center bg-primaryLightColor p-1.5 rounded-xl"
                    >
                      <img
                        src="/images/icons/eye.svg"
                        :alt="$t('product.edit')"
                        class="w-6 h-5"
                      />
                    </div>
                  </UButton>
                </div>
              </template>
            </UTable>
          </GeneralTheDataTable>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "pages.orders_management",
});

// i18n
const { t } = useI18n();

// locale route
const localeRoute = useLocaleRoute();

// tab items
const items = ref([
  {
    type: "title",
    disabled: true,
  },
  {
    label: t("order.new"),
    columns: [
      {
        key: "id",
        label: t("general.table.id"),
      },
      {
        key: "order_num",
        label: t("order.table.number"),
        sortable: true,
      },
      {
        key: "user_name",
        label: t("general.table.client_name"),
      },
      {
        key: "total_price",
        label: t("order.table.total_price"),
        sortable: true,
      },
      {
        key: "created_at",
        label: t("order.table.date"),
        sortable: true,
      },
      {
        key: "address_name",
        label: t("order.table.address"),
      },
      {
        key: "pay_type_text",
        label: t("order.table.payment_method"),
      },
      {
        key: "actions",
      },
    ],
    url: "provider/orders/new?order_by=order_num",
  },
  {
    label: t("order.wait_pay"),
  },
  {
    label: t("order.preparing"),
  },
  {
    label: t("order.delivering_representative"),
  },
  {
    label: t("order.delivering"),
  },
  {
    label: t("order.finished"),
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
const fetchOrders = async (url, _) => {
  fetchData({
    url,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      paginateData.value = orders.value.pagination;
    },
  });
};

onMounted(() => {
  fetchOrders(items.value[1].url);
});
</script>

<style></style>
