<template>
  <UButton
    color="red"
    :label="$t('order.details.actions.reject.this')"
    class="rounded-xl"
    @click="modal = true"
  />

  <GeneralTheModal
    v-model="modal"
    @close="closeModal"
    :header="{ title: $t('inputs.order_reject.label') }"
  >
    <GeneralTheForm
      :button="{
        label: $t('order.details.actions.reject.this'),
        radius: 'rounded-lg block flex-1',
        color: 'red',
        variant: 'soft',
        loading,
      }"
      :state
      :schema
      @submit="rejectOrder"
      autoComplete="off"
    >
      <!-- user name -->
      <UFormGroup
        :label="$t('inputs.order_reject.label')"
        name="refused_reason"
      >
        <UTextarea
          v-model="state.refused_reason"
          :placeholder="$t('inputs.order_reject.placeholder')"
          :rows="4"
        />
      </UFormGroup>

      <template #action-button>
        <UButton
          type="button"
          size="xl"
          class="rounded-lg block flex-1"
          :label="$t('general.undo')"
          @click="closeModal"
        />
      </template>
    </GeneralTheForm>
  </GeneralTheModal>

  <!-- <UPopover>
    <template #panel="{ close }">
      <div class="p-4">
        <h6 class="text-center mb-4">
          {{ $t("order.details.actions.reject.confirm") }}
        </h6>

        <div class="flex items-center justify-center gap-3 flex-wrap">
          <UButton
            color="red"
            size="lg"
            :label="$t('order.details.actions.reject.this')"
            :loading="loading"
            @click="rejectOrder(close)"
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
  </UPopover> -->
</template>

<script setup>
// imports
import { object, string } from "yup";

// i18n
const { t } = useI18n();

// route
const route = useRoute();

// props
const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

// modal
const modal = ref(false);

// state
const state = reactive({
  refused_reason: undefined,
});

// schema
const schema = computed(() => {
  return object({
    refused_reason: string().required(t("inputs.order_reject.required")),
  });
});

// close modal
const closeModal = async () => {
  modal.value = false;
  state.refused_reason = undefined;
};

// emit
const emit = defineEmits(["refuse"]);

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

// delete product
const rejectOrder = (close) => {
  fetchData({
    url: `provider/orders/refuse/${route.params.id}`,
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    body: state,
    getSuccess: true,
    onSuccess: async () => {
      emit("refuse");
      await closeModal();
    },
  });
};
</script>

<style></style>
