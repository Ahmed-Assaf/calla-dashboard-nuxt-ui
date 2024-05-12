<template>
  <GeneralTheDataTable class="stripe-table">
    <template #tfoot>
      <GeneralTheButton
        class="justify-between gap-7"
        :label="$t('product.create')"
        link="products-create"
        icon-image="/images/icons/plus-square-filled-white.svg"
      />
    </template>
  </GeneralTheDataTable>
</template>

<script lang="ts" setup>
// page meta
definePageMeta({
  title: "pages.products_management",
});
</script>

<style></style>
