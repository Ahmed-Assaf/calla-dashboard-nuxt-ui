<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('order.details.this') }]">
      <template #center>
        <OrderDetailsSteps :steps="steps" active="preparing" />
      </template>
    </GeneralPageHeading>

    <div class="grid grid-cols-12 mb-8">
      <div class="col col-span-6">
        <OrderProductsTable class="ring-0 mb-4" />

        <OrderInfo class="h-fit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// page meta
definePageMeta({
  title: "order.details.this",
});

// i18n
const { t } = useI18n();

// order steps
const steps = computed(() => [
  {
    name: "new",
    label: t("order.details.status.new"),
  },
  {
    name: "wait_pay",
    label: t("order.wait_pay"),
  },
  {
    name: "preparing",
    label: t("order.preparing"),
  },
  {
    name: "delivering_representative",
    label: t("order.delivering_representative"),
  },
  {
    name: "delivering",
    label: t("order.delivering"),
  },
  {
    name: "finished",
    label: t("order.finished"),
  },
]);
</script>

<style></style>
