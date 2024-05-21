<template>
  <div class="grid mb-5">
    <div class="col flex items-center gap-3 flex-wrap">
      <UBreadcrumb divider="/" :links="props.title">
        <template #default="{ link, isActive, index }">
          <h2
            class="font-bukra font-bold text-lg"
            :class="{ '!text-textBaseColor': index === 0 }"
            v-if="index === 0"
          >
            {{ link.label }}
          </h2>

          <p class="font-bukra font-normal" v-else>
            {{ link.label }}
          </p>
        </template>
      </UBreadcrumb>

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
    type: Array,
    required: true,
  },
});
</script>
