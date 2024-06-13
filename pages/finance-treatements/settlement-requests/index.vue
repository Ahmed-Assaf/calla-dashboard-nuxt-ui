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
            :title="[{ label: $t('pages.settlement_requests') }]"
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
              :rows="item.status"
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
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "pages.settlement_requests",
  permissionId: 6,
});

// i18n
const { t } = useI18n();

// tab items
const items = ref([
  {
    type: "title",
    disabled: true,
  },
  {
    label: t("finance_treatements.settlement.status.waiting_accept"),
    columns: [
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
        key: "total",
        label: t("finance_treatements.settlement.table.value"),
        sortable: true,
      },
      {
        key: "commission",
        label: t("finance_treatements.settlement.table.commission"),
        sortable: true,
      },
      {
        key: "date",
        label: t("order.table.date"),
        sortable: true,
      },
      {
        key: "actions",
      },
    ],
  },
  {
    label: t("order.finished"),
    columns: [
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
        key: "total",
        label: t("finance_treatements.settlement.table.value"),
        sortable: true,
      },
      {
        key: "commission",
        label: t("finance_treatements.settlement.table.commission"),
        sortable: true,
      },
      {
        key: "date",
        label: t("order.table.date"),
        sortable: true,
      },
      {
        key: "status",
        label: t("finance_treatements.settlement.table.status"),
      },
      {
        key: "actions",
      },
    ],
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
const fetchOrders = async (url, status) => {
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
</script>

<style></style>
