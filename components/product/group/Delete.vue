<template>
  <UPopover>
    <UButton
      color="red"
      square
      class="rounded-full"
      icon="i-heroicons-x-mark-16-solid"
      size="2xs"
    >
    </UButton>

    <template #panel="{ close }">
      <div class="p-4">
        <h6 class="text-center mb-4">{{ $t("product.group.delete.sure") }}</h6>

        <div class="flex items-center justify-center gap-3 flex-wrap">
          <UButton
            color="red"
            size="lg"
            :label="$t('product.delete.this')"
            :loading="loading"
            @click="deleteProduct(close)"
          />

          <UButton
            color="primary"
            size="lg"
            :label="$t('general.cancel')"
            @click="close"
          />
        </div>
      </div>
    </template>
  </UPopover>
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
const emit = defineEmits(["deleted"]);

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

// delete product
const deleteProduct = (close) => {
  fetchData({
    url: `provider/products/delete-variant/${props.productId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    getSuccess: true,
    onSuccess: () => {
      emit("deleted");
      close();
    },
  });
};
</script>

<style></style>
