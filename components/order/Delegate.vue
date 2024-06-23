<template>
  <GeneralTheCard class="rounded-xl h-fit">
    <div class="flex items-center gap-4 py-3 sm:px-3 px-0">
      <UAvatar
        size="lg"
        :src="props.data.image"
        alt="user-rate"
        class="outline outline-offset-2 outline-1 outline-offset-[3.5px] outline-strokeLightGray"
      />

      <div class="flex-1">
        <p class="text-textLightColor text-xs mb-1">
          {{ $t("order.details.delegate.info") }}
        </p>
        <div class="flex items-center gap-2 flex-wrap">
          <h5 class="font-bukra font-bold text-sm">
            {{ props.data.name }}
          </h5>

          <div class="font-bukra text-xs">
            ({{ props.data.avg_rate }}
            <UIcon
              name="i-heroicons-star-solid"
              dynamic
              class="text-starActive text-sm"
              :key="i"
            />)
          </div>
        </div>
      </div>

      <UButton
        :label="$t('order.details.actions.chat')"
        class="rounded-xl"
        @click="startChat"
        :loading
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

    span {
      @apply font-bukra;
    }
  }
}
</style>
