<template>
  <UButton
    :label="statusLabel"
    :color="props.status ? 'primary' : 'red'"
    variant="link"
    :ui="{
      color: {
        primary: {
          link: 'no-underline',
        },
        red: {
          link: 'no-underline',
        },
      },
    }"
    :loading="loading"
    @click="changeStatus"
  >
    <template #leading>
      <UAvatar :src="statusIcon" size="2xs" />
    </template>
  </UButton>
</template>

<script lang="ts" setup>
// props
const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

// emit
const emit = defineEmits(["updated"]);

// i18n
const { t } = useI18n();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// is shown

const statusLabel = computed(() => {
  return props.status
    ? t("product.table.show.shown")
    : t("product.table.show.hidden");
});

const statusIcon = computed(() => {
  return props.status
    ? "/images/icons/eye.svg"
    : "/images/icons/eye-closed-red.svg";
});

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

// change status
const changeStatus = () => {
  fetchData({
    url: "provider/products/toggle-status",
    method: "POST",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      _method: "PATCH",
    },
    body: {
      product_id: props.productId,
    },
    getSuccess: true,
    onSuccess: () => {
      emit("updated");
    },
  });
};
</script>

<style></style>
