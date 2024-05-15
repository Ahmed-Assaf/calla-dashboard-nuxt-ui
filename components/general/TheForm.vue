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
      >
        {{ props.button.label }}
      </UButton>

      <slot name="action-button" />
    </div>
  </UForm>
</template>

<script setup lang="ts">
// props
const props = defineProps({
  button: {
    type: Object,
    required: true,
  },
});
</script>
