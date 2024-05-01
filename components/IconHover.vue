<template>
  <img :src />
</template>

<script lang="ts" setup>
// props
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  hover: {
    type: Boolean,
    default: false,
  },
});

const src = computed(() => {
  return props.hover ? `${props.image}-filled.svg` : `${props.image}.svg`;
});
</script>

<style></style>
