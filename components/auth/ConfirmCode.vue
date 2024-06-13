<template>
  <div>
    <img
      v-if="props.imgSrc"
      :src="props.imgSrc"
      class="mx-auto w-[150px] max-w-full"
    />

    <h6 class="font-bukra text-center font-bold mb-2">
      {{ $t("auth.verification_code.title") }}
    </h6>

    <p class="text-textLightColor text-center mb-5 text-xs">
      {{ $t("auth.verification_code.description") }}
      <span class="font-bukra text-textBaseColor">{{ props.phone }}</span>
    </p>

    <GeneralTheForm
      :button="{
        label: $t('general.confirm'),
        radius: 'rounded-lg block min-w-[173px] max-w-full',
        loading,
      }"
      :state
      @submit="handleSubmit"
    >
      <div class="otp">
        <VOtpInput
          ref="otpInput"
          input-classes="otp-input"
          separator=""
          inputType="number"
          :num-inputs="4"
          v-model:value="state.code"
          :should-auto-focus="true"
          dir="ltr"
          :placeholder="['-', '-', '-', '-']"
          required
        />
      </div>

      <template #action-button>
        <UButton
          type="button"
          size="xl"
          class="rounded-lg block min-w-[173px] max-w-full"
          variant="outline"
          @click="$emit('back')"
        >
          {{ $t("general.back") }}
        </UButton>
      </template>
    </GeneralTheForm>
  </div>
</template>

<script setup>
// imports
import VOtpInput from "vue3-otp-input";
// props
const props = defineProps({
  imgSrc: {
    type: String,
    default: "",
  },
  sentState: {
    type: Object,
    default: {},
  },
  fetchUrl: {
    type: String,
    required: true,
  },
});

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// otp input
const otpInput = ref(null);

// emit
const emit = defineEmits(["confirm"]);

// state
const state = reactive({
  code: undefined,
  ...props.sentState,
});

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

const handleSubmit = async () => {
  await fetchData({
    url: props.fetchUrl,
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    body: state,
    getSuccess: true,
    onSuccess: async () => {
      emit("confirm", state);
    },
    onNeedCompleteInfo: async () => {
      emit("confirm", state);
    },
  });
};
</script>

<style lang="scss">
.otp {
  .otp-input-container {
    @apply flex gap-3 justify-center;
  }
  .otp-input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;

    @apply w-[45px] aspect-[1/1] border border-solid border-primaryColor rounded-lg text-center;
  }
}
</style>
