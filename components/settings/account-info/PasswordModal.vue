<template>
  <GeneralTheModal
    :model-value="props.modelValue"
    :header="{ title: $t('auth.password.change') }"
    @close="closeModal"
  >
    <SettingsAccountInfoPasswordForm @changed="onPasswordChanged" />
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

// emits
const emit = defineEmits(["update:modelValue"]);

const onPasswordChanged = async (name) => {
  emit("update:modelValue", false);
};

// close modal method
const closeModal = async () => {
  emit("update:modelValue", false);
};
</script>

<style></style>
