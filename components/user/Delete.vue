<template>
  <UPopover>
    <UButton
      :label="$t(props.buttonLabel)"
      :ui="{
        rounded: 'rounded-xl',
      }"
      size="xl"
      color="red"
    />

    <template #panel="{ close }">
      <div class="p-4">
        <h6 class="text-center mb-4">{{ $t("user.delete.sure") }}</h6>

        <div class="flex items-center justify-center gap-3 flex-wrap">
          <UButton
            color="red"
            size="lg"
            :label="$t('user.delete.this')"
            :loading="loading"
            @click="deleteUser(close)"
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
  userId: {
    type: Number,
    required: true,
  },
  buttonLabel: {
    type: String,
    required: true,
  },
});

// emit
const emit = defineEmits(["delete"]);

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

// delete product
const deleteUser = (close) => {
  fetchData({
    url: `provider/sub-providers/${props.userId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    getSuccess: true,
    onSuccess: () => {
      emit("delete");
      close();
    },
  });
};
</script>

<style></style>
