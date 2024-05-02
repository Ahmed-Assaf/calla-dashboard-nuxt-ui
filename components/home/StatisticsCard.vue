<template>
  <UCard
    :ui="{
      background: props.background,
    }"
  >
    <h1>Card</h1>
  </UCard>
</template>

<script lang="ts" setup>
const props = defineProps({
  background: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
