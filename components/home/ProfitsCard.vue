<template>
  <div :class="grid">
    <GeneralTheCard :header="{ title: $t('profit.plural') }">
      <ul>
        <li>
          {{ $t("order.total") }}
          <span>500 {{ $t("general.currency") }}</span>
        </li>
        <li>
          {{ $t("order.total_commission") }}
          <span>500 {{ $t("general.currency") }}</span>
        </li>
        <li>
          {{ $t("order.total_added") }}
          <span>500 {{ $t("general.currency") }}</span>
        </li>
        <UDivider class="mt-6" />
        <li>
          {{ $t("order.due") }}
          <span>500 {{ $t("general.currency") }}</span>
        </li>
      </ul>
    </GeneralTheCard>
  </div>
</template>

<script setup>
  const props = defineProps({
    grid: {
      type: String,
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
        @apply font-bold text-primaryColor;
      }

      span {
        @apply font-bukra;
      }
    }
  }
</style>
