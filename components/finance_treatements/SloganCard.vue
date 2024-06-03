<template>
  <GeneralTheCard
    :ui="{
      body: {
        base: 'h-full',
      },
    }"
  >
    <div class="flex items-center h-full gap-4">
      <img
        :src="props.image.src"
        v-if="props.image"
        class="flex-shrink-0"
        :width="props.image.width"
      />

      <slot />
    </div>
  </GeneralTheCard>
</template>

<script setup>
const props = defineProps({
  image: {
    type: Object,
  },
});
</script>

<style></style>
