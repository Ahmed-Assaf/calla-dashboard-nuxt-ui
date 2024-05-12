<template>
  <UPagination
    :total="props.paginateData.total"
    :page-count="props.paginateData.pageCount"
    :max="props.paginateData.maxItems"
  >
    <template #prev>
      <UButton class="hidden" />
    </template>
    <template #next>
      <UButton class="hidden" />
    </template>

    <template #first="{ onClick }">
      <UButton
        :icon="`i-heroicons-chevron-double-${prevArrow}-20-solid`"
        color="gray"
        variant="solid"
        size="sm"
        :ui="{ rounded: 'rounded-full' }"
        @click="onClick"
      />
    </template>

    <template #last="{ onClick }">
      <UButton
        :icon="`i-heroicons-chevron-double-${nextArrow}-20-solid`"
        color="gray"
        variant="solid"
        size="sm"
        :ui="{ rounded: 'rounded-full' }"
        @click="onClick"
      />
    </template>
  </UPagination>
</template>

<script setup>
const props = defineProps({
  paginateData: {
    type: Object,
    required: true,
  },
});

const { locale } = useI18n();

const nextArrow = computed(() => (locale.value == "en" ? "right" : "left"));

const prevArrow = computed(() => (locale.value == "en" ? "left" : "right"));
</script>

<style></style>
