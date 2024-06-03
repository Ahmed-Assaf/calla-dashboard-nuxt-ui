<template>
  <ul class="order-steps">
    <li
      v-for="(step, idx) in props.steps"
      :key="idx"
      :class="{ active: step.name === props.active }"
    >
      <span>{{ step.label }}</span>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
  active: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.order-steps {
  @apply flex items-center justify-start gap-6 overflow-x-auto font-bukra text-xs;

  li {
    @apply flex-shrink-0 flex items-center gap-2 text-textLightColor before:content-[''] before:block before:w-4 before:aspect-[1] before:bg-white before:border-[3px] before:border-textLightColor before:rounded-full;

    &.active {
      @apply text-textBaseColor font-bold   before:border-primaryColor before:w-7 before:border-4;
    }

    &:has(~ .active) {
      @apply text-primaryColor font-bold before:bg-[url('/images/icons/check-white.svg')] before:bg-no-repeat before:bg-center before:bg-auto   before:border-primaryColor before:w-7 before:border-4;
    }
  }
}
</style>
