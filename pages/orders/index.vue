<template>
  <div class="grid grid-cols-12">
    <div class="col col-span-12">
      <UTabs
        :items="items"
        class="w-full"
        :defaultIndex="1"
        @change="onChangeTab"
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
              <template #address_name-data="{ row }">
                <span class="whitespace-normal">
                  {{ row.address_name }}
                </span>
              </template>

              <template #status_text-data="{ row }">
                <span
                  :class="{
                    'text-primaryColor': row.status === 6,
                    'text-redColor': row.status === 8,
                  }"
                >
                  {{ row.status_text }}
                </span>
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
  permissionId: 3,
});

// i18n
const { t } = useI18n();

// locale route
const localeRoute = useLocaleRoute();

// columns
const columns = computed(() => [
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
]);

// tab items
const items = ref([
  {
    type: "title",
    disabled: true,
  },
  {
    label: t("order.new"),
    columns: [
      ...columns.value,
      {
        key: "actions",
      },
    ],
    url: "provider/orders/new?order_by=order_num",
  },
  {
    label: t("order.wait_pay"),
    columns: [
      ...columns.value,
      {
        key: "actions",
      },
    ],
    url: "provider/orders/wait-payment?order_by=order_num",
  },
  {
    label: t("order.preparing"),
    columns: [
      ...columns.value,
      {
        key: "actions",
      },
    ],
    url: "provider/orders/in-progress?order_by=order_num",
  },
  {
    label: t("order.delivering_representative"),
    columns: [
      ...columns.value,
      {
        key: "actions",
      },
    ],
    url: "provider/orders/deliver-to-delegate?order_by=order_num",
  },
  {
    label: t("order.delivering"),
    columns: [
      ...columns.value,
      {
        key: "actions",
      },
    ],
    url: "provider/orders/in-way?order_by=order_num",
  },
  {
    label: t("order.finished"),
    columns: [
      ...columns.value,
      {
        key: "status_text",
        label: t("order.table.status"),
      },
      {
        key: "actions",
      },
    ],
    url: "provider/orders/finished?order_by=order_num",
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
const fetchOrders = async (url, _) => {
  fetchData({
    url,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      if (orders.value.pagination) paginateData.value = orders.value.pagination;
      else paginateData.value = null;
    },
  });
};

// on change tab
const onChangeTab = (tab) => {
  fetchData({
    url: items.value[tab].url,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      if (orders.value.pagination) paginateData.value = orders.value.pagination;
      else paginateData.value = null;
    },
  });
};

onMounted(() => {
  fetchOrders(items.value[1].url);
});
</script>

<style></style>
