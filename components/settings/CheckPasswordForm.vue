<template>
  <GeneralTheForm
    :button="{
      label: $t('general.confirm'),
      radius: 'rounded-lg mx-auto block min-w-[173px] max-w-full',
      loading,
    }"
    :state
    :schema
    @submit="handleSubmit"
    autoComplete="off"
  >
    <img
      v-if="props.image"
      src="/images/password-device.svg"
      class="mx-auto w-[60px] mb-9 max-w-full"
    />
    <!-- password -->
    <UFormGroup
      :label="$t('inputs.password.label')"
      name="password"
      class="mb-0"
    >
      <GeneralPasswordInput
        v-model="state.password"
        :placeholder="$t('inputs.password.placeholder')"
      />
    </UFormGroup>
  </GeneralTheForm>
</template>

<script lang="ts" setup>
// imports
import { object, string, ref } from "yup";

// props
const props = defineProps({
  image: {
    type: Boolean,
    default: false,
  },
});

// i18n
const { t } = useI18n();

// emit
const emit = defineEmits(["checked"]);

// state
let state = reactive({
  password: undefined,
});

// schema
const schema = object({
  password: string()
    .min(6, t("inputs.password.invalid.length"))
    .required(t("inputs.password.required")),
});

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

const handleSubmit = async () => {
  await fetchData({
    url: "provider/settings/check-password",
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    body: state,
    getSuccess: true,
    onSuccess: async () => {
      emit("checked", state.password);
      state.password = undefined;
    },
  });
};
</script>

<style></style>
