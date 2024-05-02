<template>
  <UButton
    :to="localePath({ name: props.link })"
    :label="props.label"
    :variant="props.variant"
    :block="props.block"
  >
    <template #trailing>
      <UAvatar :src="props.iconImage" size="3xs" />
    </template>
  </UButton>
</template>

<script lang="ts" setup>
// props
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
  link: {
    type: String,
    required: false,
    default: "",
  },
  variant: {
    type: String,
    required: false,
    default: "solid",
  },
  block: {
    type: Boolean,
    required: false,
    default: true,
  },
  iconImage: {
    type: String,
    required: false,
    default: "",
  },
});

// locale path
const localePath = useLocalePath();
</script>

<style></style>
