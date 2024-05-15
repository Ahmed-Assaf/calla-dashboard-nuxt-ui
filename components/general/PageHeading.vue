<template>
  <div class="grid mb-5">
    <div class="col flex items-center gap-3 flex-wrap">
      <h2 class="font-bukra font-bold text-lg">{{ props.title }}</h2>

      <div class="flex-1">
        <slot name="center" />
      </div>

      <div class="flex-shrink-0">
        <slot name="end" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
