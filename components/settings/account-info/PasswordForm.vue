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
    <!-- old password -->
    <UFormGroup
      :label="$t('inputs.current_password.label')"
      name="old_password"
      class="mb-0"
    >
      <GeneralPasswordInput
        v-model="state.old_password"
        :placeholder="$t('inputs.current_password.placeholder')"
      />
    </UFormGroup>

    <!-- new password -->
    <UFormGroup
      :label="$t('inputs.new_password.label')"
      name="password"
      class="mb-0"
    >
      <GeneralPasswordInput
        v-model="state.password"
        :placeholder="$t('inputs.new_password.placeholder')"
      />
    </UFormGroup>

    <!-- confirm new password -->
    <UFormGroup
      :label="$t('inputs.confirm_new_password.label')"
      name="confirm_password"
      class="mb-0"
    >
      <GeneralPasswordInput
        v-model="state.confirm_password"
        :placeholder="$t('inputs.confirm_new_password.placeholder')"
      />
    </UFormGroup>
  </GeneralTheForm>
</template>

<script setup>
// imports
import { object, string, ref } from "yup";
import { GeneralActionModal } from "#components";

// i18n
const { t } = useI18n();

// modal
const modal = useModal();

// emit
const emit = defineEmits(["changed"]);

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// state
let state = reactive({
  old_password: undefined,
  password: undefined,
  confirm_password: undefined,
});

// schema
const schema = object({
  old_password: string()
    .min(6, t("inputs.current_password.invalid.length"))
    .required(t("inputs.current_password.required")),
  password: string()
    .min(6, t("inputs.new_password.invalid.length"))
    .required(t("inputs.new_password.required")),
  confirm_password: string()
    .oneOf(
      [ref("password"), null],
      t("inputs.confirm_new_password.invalid.match")
    )
    .required(t("inputs.confirm_new_password.required")),
});

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

const handleSubmit = async () => {
  await fetchData({
    url: "provider/settings/update-password",
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      _method: "patch",
    },
    body: state,
    onSuccess: async () => {
      emit("changed", state.name);

      modal.open(GeneralActionModal, {
        actionData: {
          title: t("auth.password.change_success"),
        },
        onClose: async () => {
          modal.close();
        },
      });
    },
  });
};
</script>

<style></style>
