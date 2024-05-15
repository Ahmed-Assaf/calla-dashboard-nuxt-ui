<template>
  <UCard
    :ui="{
      base: 'font-bukra',
      background: props.background,
      ring: 'ring-0',
      rounded: 'rounded-2xl',
      shadow: 'shadow-none',
      body: {
        base: 'flex items-center gap-1',
        background: '',
        padding: 'px-4 py-5 sm:p-6',
      },
    }"
  >
    <div class="flex-1">
      <h3 class="font-bold text-4xl mb-1">{{ props.data.count }}</h3>
      <h4 class="font-bold text-sm">{{ props.data.title }}</h4>
    </div>

    <div
      class="icon w-12 aspect-[1/1] flex items-center justify-center rounded-[10px]"
      :class="props.iconColor"
    >
      <img :src="props.iconImg" class="w-8" />
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  background: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  iconColor: {
    type: String,
    required: true,
  },
  iconImg: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
