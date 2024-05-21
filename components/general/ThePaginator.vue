<template>
  <UPagination
    v-model="page"
    :total="paginateData.total_items"
    :page-count="paginateData.per_page"
    :max="5"
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
  // paginateData: {
  //   type: Object,
  //   required: true,
  // },
});

const { locale } = useI18n();

const nextArrow = computed(() => (locale.value == "en" ? "right" : "left"));

const prevArrow = computed(() => (locale.value == "en" ? "left" : "right"));

const paginateData = inject("paginateData");

const page = ref(1);

const emit = defineEmits(["update:page"]);

watch(page, (newVal) => {
  if (newVal) {
    emit("update:page", newVal);
  }
});
</script>
