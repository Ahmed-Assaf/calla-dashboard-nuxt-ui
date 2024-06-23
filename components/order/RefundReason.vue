<template>
  <GeneralTheCard
    :header="{ title: $t('refund.reason') }"
    class="rounded-xl h-fit"
  >
    <p class="text-xs font-light">
      {{ props.data.return_reason }}
    </p>

    <div
      class="flex items-stretch flex-wrap gap-3 mt-4"
      v-if="props.data.return_images"
    >
      <img
        v-for="item in props.data.return_images"
        :src="item.image"
        class="aspect-[1] object-contain p-1 rounded-lg border border-solid border-strokeLightGray w-16"
      />
    </div>
  </GeneralTheCard>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
ul {
  li {
    @apply flex items-center justify-between flex-wrap gap-3 text-xs;

    &:not(:first-of-type) {
      @apply pt-6;
    }
    &:last-of-type {
      @apply font-bold text-primaryColor font-bukra;
    }

    span {
      @apply font-bukra;
    }
  }
}
</style>
