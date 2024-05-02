<template>
  <div class="page-heading">
    <h2>{{ props.title }}</h2>

    <slot name="center" />

    <slot name="end" />
  </div>
</template>

<script lang="ts" setup>
// props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.page-heading {
  @apply flex items-center gap-4;
}
</style>
