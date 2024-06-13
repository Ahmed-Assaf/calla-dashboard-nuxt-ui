<template>
  <GeneralTheModal
    :model-value="props.modelValue"
    :header="{ title: $t('auth.phone.change') }"
    @close="closeModal"
  >
    <SettingsCheckPasswordForm v-if="!status" image @checked="onChecked" />

    <SettingsAccountInfoPhoneForm
      :password="sentPassword"
      @changed="onPhoneChanged"
      v-else-if="status === 'checkedPassword'"
    />

    <AuthConfirmCode
      @confirm="confirmCode"
      @back="status = 'checkedPassword'"
      img-src="/images/otp.gif"
      :sent-state="state"
      fetch-url="provider/settings/change-phone-new-phone-check-code"
      v-else
    />
  </GeneralTheModal>
</template>

<script setup>
// imports
import { GeneralActionModal } from "#components";

// props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

// i18n
const { t } = useI18n();

// modal
const modal = useModal();

// auth store
const { profile } = storeToRefs(useProfileStore());

// emits
const emit = defineEmits(["update:modelValue"]);

// state
let state = reactive({});

// password modal states
const status = ref(undefined);

const sentPassword = ref("");

const onChecked = async (password) => {
  sentPassword.value = password;
  status.value = "checkedPassword";
};

const onPhoneChanged = async (sentState) => {
  state = sentState;
  status.value = "sentPhone";
};

const confirmCode = async () => {
  profile.value.phone = state.phone;
  profile.value.country_code = state.country_code;
  emit("update:modelValue", false);
  status.value = undefined;

  modal.open(GeneralActionModal, {
    actionData: {
      title: t("auth.phone.change_success"),
    },
    onClose: async () => {
      modal.close();
    },
  });
};

// close modal method
const closeModal = async () => {
  setTimeout(() => {
    checkedPassword.value = false;
  }, 500);

  emit("update:modelValue", false);
};
</script>

<style></style>
