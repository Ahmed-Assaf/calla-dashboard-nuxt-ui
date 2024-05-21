<template>
  <UPopover>
    <UButton color="red" square class="rounded-full" size="2xs">
      <img
        src="/images/icons/trash-filled-white.svg"
        :alt="$t('product.edit')"
        class="w-4 h-4"
      />
    </UButton>

    <template #panel="{ close }">
      <div class="p-4">
        <h6 class="text-center mb-4">{{ $t("product.delete.sure") }}</h6>

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

<script lang="ts" setup>
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
const deleteProduct = (close: () => void) => {
  fetchData({
    url: `provider/products/${props.productId}`,
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
