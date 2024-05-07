<template>
  <UCard
    :ui="{
      base: 'h-full',
      divide: 'divide-strokeLightGray',
      ring: 'ring-0',
      shadow: 'shadow-card',
      rounded: 'rounded-2xl',
      header: {
        base: 'min-h-[50px] flex items-center justify-between gap-3 flex-wrap',
        padding: 'px-4 py-2',
      },
      body: {
        padding: 'sm:p-4',
      },
    }"
  >
    <template #header v-if="props.header">
      <h5 class="font-bukra font-bold text-sm">{{ header.title }}</h5>

      <slot name="header" />
    </template>

    <slot />

    <!-- <template #footer> </template> -->
  </UCard>
</template>

<script setup>
  const props = defineProps({
    header: {
      type: Object,
      default: {},
    },
  });
</script>
