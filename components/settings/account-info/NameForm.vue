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
    <!-- new username -->
    <UFormGroup :label="$t('inputs.new_username.label')" name="name">
      <UInput
        v-model="state.name"
        :placeholder="$t('inputs.new_username.placeholder')"
      />
    </UFormGroup>
  </GeneralTheForm>
</template>

<script setup>
// imports
import { object, string, ref } from "yup";

// props
const props = defineProps({
  password: {
    type: String,
    default: undefined,
  },
});

// i18n
const { t } = useI18n();

// emit
const emit = defineEmits(["changed"]);

// state
let state = reactive({
  name: undefined,
  password: props.password,
});

// schema
const schema = object({
  name: string().required(t("inputs.new_username.required")),
});

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

const handleSubmit = async () => {
  await fetchData({
    url: "provider/settings/update-name",
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      _method: "put",
    },
    body: state,
    getSuccess: true,
    onSuccess: async () => {
      emit("changed", state.name);
    },
  });
};
</script>

<style></style>
