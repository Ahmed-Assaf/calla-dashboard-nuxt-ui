<template>
  <GeneralTheCard
    :header="{ title: $t('profit.plural') }"
    class="rounded-xl h-fit"
  >
    <ul>
      <li>
        {{ $t("order.table.number") }}
        <!-- <span>{{ props.data }} {{ $t("general.currency") }}</span> -->
      </li>
      <li>
        {{ $t("order.table.payment_method") }}
        <!-- <span>{{ props.data }} {{ $t("general.currency") }}</span> -->
      </li>
      <li>
        {{ $t("order.table.address") }}
        <!-- <span>{{ props.data }} {{ $t("general.currency") }}</span> -->
      </li>
      <li>
        {{ $t("order.table.coupon") }}
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
