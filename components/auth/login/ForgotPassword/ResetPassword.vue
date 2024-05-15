<template>
  <div>
    <GeneralTheForm
      :button="{
        label: $t('general.confirm'),
        radius: 'rounded-lg block min-w-[173px] max-w-full',
        loading,
      }"
      :state
      :schema
      @submit="handleSubmit"
    >
      <input type="text" name="phone" v-model="state.phone" hidden />

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
  </div>
</template>

<script lang="ts" setup>
// imports
import { object, string, ref } from "yup";

// props
const props = defineProps({
  imgSrc: {
    type: String,
    default: "",
  },
  confirmedState: {
    type: Object,
    default: {},
  },
});

// emit
const emit = defineEmits(["reset"]);

// i18n
const { t } = useI18n();

// state
const state = reactive({
  password: undefined,
  confirm_password: undefined,
  ...props.confirmedState,
});

// schema
const schema = object({
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
    url: "provider/reset-password",
    method: "post",
    body: state,
    getSuccess: true,
    onSuccess: async () => {
      emit("reset", state);
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
