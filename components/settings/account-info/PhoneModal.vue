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
      fetch-url="provider/forget-password-check-code"
      v-else
    />
  </GeneralTheModal>
</template>

<script setup>
// props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

// auth store
const { userInfo } = storeToRefs(useAuthStore());

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
  // userInfo.value.phone = phone;
  // emit("update:modelValue", false);
};

const confirmCode = async () => {
  userInfo.value.phone = status.phone;
  userInfo.value.country_code = status.country_code;
  emit("update:modelValue", false);
  status.value = undefined;
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
