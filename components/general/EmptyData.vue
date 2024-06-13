<template>
  <div class="flex flex-col items-center text-center py-7">
    <UIcon :name="icon" class="text-2xl text-gray-400 mb-4" />
    <p class="text-sm">{{ title }}</p>
  </div>
</template>

<script setup>
// props
const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
});

// i18n
const { t } = useI18n();

const icon = computed(() => {
  return props.data?.icon || "i-iconoir-database-solid";
});

const title = computed(() => {
  return props.data?.title || t("general.no_data");
});
</script>

<style></style>
