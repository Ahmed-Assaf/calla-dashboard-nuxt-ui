<template>
  <UTable
    :columns="props.tableData.columns"
    :rows="props.tableData.attributes.variants"
    :loading="props.tableData.tableLoading"
    :loadingState="{ label: $t('general.loading') }"
    :emptyState="{ label: $t('general.no_data') }"
    :ui="{
      wrapper: 'the-data-table',
      base: 'w-max',
      thead: 'hidden',
      td: {
        base: 'h-[70px]',
        padding: '!px-2',
      },
    }"
    class="attributes-table"
  >
    <template #id-data="{ row }">
      <URadio v-model="attrId" :value="row.id" />
    </template>

    <template #image-data="{ row }">
      <img
        :src="row.image ? row.image : '/images/product-default.svg'"
        alt=""
        class="w-full object-contain shadow-card px-1 py-1 bg-white rounded-lg h-full"
      />
    </template>

    <template #options_ids-data="{ row }">
      <div class="flex items-stretch gap-2 h-full">
        <span v-for="opt in row.options_ids" :key="opt.id" class="span">{{
          opt.name
        }}</span>
      </div>
    </template>

    <template #stock-data="{ row }">
      <span class="span">{{ row.stock }} {{ $t("general.piece") }}</span>
    </template>

    <template #price_after_discount-data="{ row }">
      <span class="span"
        >{{ row.price_after_discount }} {{ $t("general.currency") }}</span
      >
    </template>

    <template #price-data="{ row }">
      <span class="text-textLightColor line-through span"
        >{{ row.price }} {{ $t("general.currency") }}</span
      >
    </template>

    <template #actions-data="{ row }">
      <div class="flex items-center gap-2 w-max">
        <!-- delete -->
        <ProductGroupDelete :product-id="row.id" @deleted="$emit('update')" />

        <!-- edit -->
        <ProductGroupEdit :variant-id="row.id" @edited="$emit('update')" />
      </div>
    </template>
  </UTable>
</template>

<script setup>
// props
const props = defineProps({
  tableData: {
    type: Object,
    required: true,
  },
});

// attr id
const attrId = ref(null);

// emit
const emit = defineEmits(["updateAttrId"]);

// watch variants
watch(
  () => props.tableData.attributes.variants,
  (newVal) => {
    if (props.tableData.attributes.variants && newVal && process.client) {
      const defaultVar = newVal.find((el) => el.is_default === true);

      attrId.value = defaultVar ? defaultVar.id : newVal[0].id;
    }
  },
  { immediate: true, deep: true }
);

watch(attrId, (newVal) => {
  console.log(attrId.value);
  emit("updateAttrId", newVal);
});

onMounted(() => {
  emit("updateAttrId", attrId.value);
});
</script>

<style lang="scss">
.attributes-table {
  td {
    .span {
      @apply px-4 shadow-card rounded-lg flex items-center justify-center h-full flex-1 bg-white whitespace-nowrap;
    }
  }
}
</style>
