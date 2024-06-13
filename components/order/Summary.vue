<template>
  <GeneralTheCard
    :header="{ title: $t('order.details.summary') }"
    class="rounded-xl h-fit"
  >
    <ul>
      <li>
        {{ $t("order.products_value") }}
        <span>{{ props.data.total_product }} {{ $t("general.currency") }}</span>
      </li>
      <li>
        {{ $t("order.delivery_value") }}
        <span
          >{{ props.data.delivery_price }} {{ $t("general.currency") }}</span
        >
      </li>
      <li>
        {{ $t("order.vat_value") }}
        <span
          >{{ props.data.vat_tax_amount }} {{ $t("general.currency") }}</span
        >
      </li>
      <li>
        {{ $t("order.discount_value") }}
        <span
          >{{ props.data.discount_amount }} {{ $t("general.currency") }}</span
        >
      </li>
      <li>
        {{ $t("general.total") }}
        <span>{{ props.data.total_price }} {{ $t("general.currency") }}</span>
      </li>
    </ul>
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
