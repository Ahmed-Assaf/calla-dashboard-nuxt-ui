<template>
  <GeneralTheCard
    :ui="{
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
    class="h-fit"
  >
    <UTable
      :columns="columns"
      :rows="props.data"
      :ui="{
        wrapper: 'the-table',
        thead: 'border-b border-b-strokeLightGray',
        th: { padding: 'px-4 py-3.5' },
        td: { base: 'h-fit', padding: 'px-4 py-3.5' },
      }"
      :loading="props.loading"
    >
      <template #product-data="{ row }">
        <div class="flex items-center gap-2">
          <img
            :src="row.image"
            :alt="row.name"
            class="w-11 aspcet-[1/1.1] object-contain overflow-hidden"
          />
          <small class="whitespace-normal">{{ row.name }}</small>
        </div>
      </template>

      <template #options-data="{ row }">
        <span class="whitespace-normal">{{ setOptions(row.options) }}</span>
      </template>
    </UTable>
  </GeneralTheCard>
</template>

<script setup>
// i18n
const { t } = useI18n();

// columns
const columns = [
  {
    key: "product",
    label: t("product.plural"),
  },
  {
    key: "qty",
    label: t("inputs.quantity.label"),
  },
  {
    key: "price",
    label: t("inputs.price.label"),
  },
  {
    key: "options",
    label: t("product.attribute.plural.this"),
  },
  {
    key: "total_price",
    label: t("order.table.total_price"),
  },
];

const props = defineProps({
  data: {
    type: Array,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const setOptions = (opts) => {
  console.log(opts);
  return opts
    .map((opt) => {
      return opt;
    })
    .join(" , ");
};
</script>
