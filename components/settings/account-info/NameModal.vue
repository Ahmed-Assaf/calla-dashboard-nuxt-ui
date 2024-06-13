<template>
  <GeneralTheModal
    :model-value="props.modelValue"
    :header="{ title: $t('auth.username.change') }"
    @close="closeModal"
  >
    <SettingsCheckPasswordForm v-if="!checkedPassword" @checked="onChecked" />

    <SettingsAccountInfoNameForm
      :password="sentPassword"
      @changed="onNameChanged"
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

// profile store
const { profile } = storeToRefs(useProfileStore());

// emits
const emit = defineEmits(["update:modelValue"]);

// password modal states
const checkedPassword = ref(false);

const sentPassword = ref("");

const onChecked = async (password) => {
  sentPassword.value = password;
  checkedPassword.value = true;
};

const onNameChanged = async (name) => {
  profile.value.name = name;
  emit("update:modelValue", false);
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
