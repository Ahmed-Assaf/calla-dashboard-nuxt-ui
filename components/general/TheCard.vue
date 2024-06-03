<template>
  <UCard>
    <template #header v-if="props.header">
      <h5 class="font-bukra font-bold text-sm">{{ header.title }}</h5>

      <slot name="header" />
    </template>

    <slot />

    <template #footer v-if="props.footer">
      <slot name="footer" />
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps({
  header: {
    type: Object,
  },
  footer: {
    type: Boolean,
    default: false,
  },
});
</script>
