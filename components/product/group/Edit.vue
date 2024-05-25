<template>
  <UButton square class="rounded-full" size="2xs" @click="modal = true">
    <img
      src="/images/icons/pen-filled-white.svg"
      :alt="$t('product.edit')"
      class="w-4 h-4"
    />
  </UButton>

  <GeneralTheModal
    v-model="modal"
    @close="modal = false"
    :header="{ title: $t('general.edit') }"
  >
    <ProductGroupAttributesForm @add-group="editProduct" />
  </GeneralTheModal>
</template>

<script setup>
// props
const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

// emit
const emit = defineEmits(["edited"]);

// modal
const modal = ref(false);

// edit product
const editProduct = (close) => {
  emit("edited");
  modal.value = false;
};
</script>

<style></style>
