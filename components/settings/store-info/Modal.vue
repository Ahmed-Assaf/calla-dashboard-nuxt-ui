<template>
  <GeneralTheModal
    :model-value="props.modelValue"
    @close="closeModal"
    :header="{ title: $t('auth.register.request_as_store') }"
  >
    <AuthRegisterStoreForm
      @submitted="submitStore"
      :confirmed-state="profile"
      edit
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
  sentCode: {
    type: Boolean,
    default: false,
  },
  sentStore: {
    type: Boolean,
    default: false,
  },
  loginState: {
    type: Object,
    default: {},
  },
});

// profile store
const { profile } = storeToRefs(useProfileStore());

// emits
const emit = defineEmits(["update:modelValue"]);

// forgot modal states
const sentCode = ref(props.sentCode);
const sentStore = ref(props.sentStore);
let state = reactive(props.loginState);

// send code method
// const sendCode = async (enteredState) => {
//   state = enteredState;
//   sentCode.value = true;
// };

// // confirm code method
// const confirmCode = async (confirmedState) => {
//   state = confirmedState;
//   sentCode.value = false;
//   sentStore.value = true;
// };

// submit store method
const submitStore = async (state) => {
  // for (const [key, value] of Object.entries(state)) {
  //   userInfo.value[key] = value;
  // }

  await closeModal();
};

// close modal method
const closeModal = async () => {
  setTimeout(() => {
    state = {};
    if (props.sentCode || props.sentStore) {
      sentCode.value = props.sentCode;
      sentStore.value = props.sentStore;
    } else {
      sentCode.value = false;
      sentStore.value = false;
    }
  }, 1000);

  emit("update:modelValue", false);
};

// watch modal value
// watch(
//   () => props.modelValue,
//   async (newVal) => {
//     if (newVal === false) {
//       await closeModal();
//     }
//   },
//   {
//     deep: true,
//   }
// );
</script>

<style></style>
