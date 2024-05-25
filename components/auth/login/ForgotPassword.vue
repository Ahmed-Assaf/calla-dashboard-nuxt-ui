<template>
  <div>
    <UButton
      :label="$t('auth.forgot_password')"
      @click="forgotModal = true"
      :padded="false"
      variant="link"
      class="font-normal"
      size="xs"
    />

    <GeneralTheModal
      v-model="forgotModal"
      @close="forgotModal = false"
      :header="{ title: modalTitle }"
    >
      <AuthLoginForgotPasswordSendCode
        @send="sendCode"
        img-src="/images/password-device.svg"
        v-if="!sentCode && !confirmedCode"
      />

      <AuthLoginForgotPasswordConfirmCode
        @confirm="confirmCode"
        @back="sentCode = false"
        img-src="/images/otp.gif"
        v-if="sentCode && !confirmedCode"
        :sent-state="state"
      />

      <AuthLoginForgotPasswordResetPassword
        @reset="resetPassword"
        v-if="confirmedCode && !sentCode"
        :confirmed-state="state"
      />
    </GeneralTheModal>
  </div>
</template>

<script lang="ts" setup>
// i18n
const { t } = useI18n();

// forgot modal
const forgotModal = ref(false);

// forgot modal states
const sentCode = ref(false);
const confirmedCode = ref(false);
let state = reactive({});

// modal title
const modalTitle = computed(() => {
  if (!confirmedCode.value) {
    return t("auth.forgot_password_title");
  } else if (confirmedCode.value) {
    return t("auth.reset_password_title");
  }
});

// send code method
const sendCode = async (enteredState: Object) => {
  state = enteredState;
  sentCode.value = true;
};

// confirm code method
const confirmCode = async (confirmedState: Object) => {
  state = confirmedState;
  sentCode.value = false;
  confirmedCode.value = true;
};

// reset password method
const resetPassword = async () => {
  await closeModal();
};

// close modal method
const closeModal = async () => {
  setTimeout(() => {
    state = {};
    sentCode.value = false;
    confirmedCode.value = false;
    forgotModal.value = false;
  }, 300);
};

// watch modal value
watch(forgotModal, async (newVal) => {
  if (newVal === false) {
    await closeModal();
  }
});
</script>

<style></style>
