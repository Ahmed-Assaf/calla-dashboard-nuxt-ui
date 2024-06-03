<template>
  <UModal>
    <UCard
      class="rounded-2xl"
      :ui="{
        ring: 'ring-0',
        shadow: 'shadow-lg',
        divide: 'divide-strokeLightGray',
        background: 'bg-white dark:bg-gray-900',
        header: {
          base: 'flex items-center',
          padding: 'px-[50px] py-5 sm:px-[50px]',
        },
        body: {
          base: 'overflow-visible',
        },
      }"
    >
      <template #header v-if="props.header">
        <UButton
          icon="i-heroicons-x-mark-solid"
          size="2xs"
          color="red"
          square
          variant="solid"
          :ui="{ rounded: 'rounded-full' }"
          class="px-[2px] py-[2px] absolute start-5"
          @click="$emit('close')"
        />

        <h5 class="font-bukra font-bold text-center w-full">
          {{ props.header.title }}
        </h5>
      </template>

      <slot />
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps({
  header: {
    type: Object,
    default: null,
  },
});
</script>

<style></style>
