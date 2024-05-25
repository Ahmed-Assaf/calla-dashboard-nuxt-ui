<template>
  <UForm class="space-y-4">
    <!-- inputs slot -->
    <slot />

    <div class="flex items-center justify-center gap-4 flex-wrap">
      <UButton
        type="submit"
        v-if="props.button"
        :size="props.button.size || 'xl'"
        :class="props.button.radius || 'rounded-lg'"
        :loading="props.button.loading"
        :label="props.button.label"
        :variant="props.button.variant || 'solid'"
      >
        <template #trailing v-if="props.button.trailing">
          <img
            :src="props.button.trailing.src"
            :width="props.button.trailing.width || 18"
          />
        </template>

        <template #leading v-if="props.button.leading">
          <img
            :src="props.button.leading.src"
            :width="props.button.leading.width || 18"
          />
        </template>
      </UButton>

      <slot name="action-button" />
    </div>
  </UForm>
</template>

<script setup>
// props
const props = defineProps({
  button: {
    type: Object,
    required: true,
  },
});
</script>
