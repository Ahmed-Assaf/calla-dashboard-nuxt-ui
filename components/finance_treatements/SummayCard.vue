<template>
  <GeneralTheCard>
    <ul>
      <li>
        {{ $t("order.total") }}
        <!-- <span>{{ props.data }} {{ $t("general.currency") }}</span> -->
      </li>
      <li>
        {{ $t("order.total_commission") }}
        <!-- <span>{{ props.data }} {{ $t("general.currency") }}</span> -->
      </li>
      <li>
        {{ $t("order.total_added") }}
        <!-- <span>{{ props.data }} {{ $t("general.currency") }}</span> -->
      </li>
      <UDivider class="mt-5" />
      <li>
        {{ $t("order.due") }}
        <!-- <span>{{ props.data }} {{ $t("general.currency") }}</span> -->
      </li>
    </ul>
  </GeneralTheCard>
</template>

<script lang="ts" setup></script>

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
