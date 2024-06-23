<template>
  <GeneralTheCard
    :header="{ title: $t('order.details.info') }"
    class="rounded-xl h-fit"
  >
    <ul>
      <li>
        {{ $t("order.table.number") }}
        <span>#{{ props.data.order_num }}</span>
      </li>
      <li v-if="!props.refund">
        {{ $t("order.table.payment_method") }}
        <span>{{ props.data.pay_type_text }}</span>
      </li>
      <li v-else>
        {{ $t("order.delivery_value") }}
        <span>{{ props.data.order_summary.delivery_price }}</span>
      </li>
      <li>
        {{ $t("order.table.address") }}
        <span>{{ props.data.address_name }}</span>
      </li>
      <li v-if="!props.refund">
        {{ $t("order.table.coupon") }}
        <span>{{
          props.data.coupon_name ? props.data.coupon_name : $t("general.none")
        }}</span>
      </li>
      <li v-else>
        {{ $t("finance_treatements.settlement.table.value") }}
        <span>{{ props.data.order_summary.total_price }}</span>
      </li>
      <li>
        {{ $t("order.table.date") }}
        <span>{{ props.data.created_at_date }}</span>
      </li>
      <li>
        {{ $t("order.table.time") }}
        <span>{{ props.data.created_at_time }}</span>
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
  refund: {
    type: Boolean,
    default: false,
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
