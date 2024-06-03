<template>
  <GeneralTheForm
    :button="{
      label: $t('general.next'),
      radius: 'rounded-lg mx-auto block min-w-[173px] max-w-full',
      loading,
    }"
    :state
    :schema
    @submit="handleSubmit"
    autoComplete="off"
  >
    <!-- user name -->
    <UFormGroup :label="$t('inputs.username.label')" name="name">
      <UInput
        v-model="state.name"
        :placeholder="$t('inputs.username.placeholder')"
      />
    </UFormGroup>

    <!-- phone -->
    <UFormGroup :label="$t('inputs.phone.label')" name="phone">
      <UInput
        v-model="state.phone"
        :placeholder="$t('inputs.phone.placeholder')"
      >
        <template #trailing>
          <USelectMenu
            v-model="state.country_code"
            :options="countryCodes"
            v-if="!countryCodesLoading"
            searchable
            :searchable-placeholder="$t('inputs.country_code.search')"
            clear-search-on-close
            trailingIcon=""
            :placeholder="$t('inputs.country_code.placeholder')"
            variant="none"
            :padded="false"
            :uiMenu="{
              width: 'min-w-36 w-fit',
              trigger: 'py-3 px-0',
            }"
            :popper="{ placement: 'bottom-start', offsetDistance: 0 }"
            option-attribute="key"
            value-attribute="key"
            id="country_code"
          >
            <template #option-empty="{ query }">
              <q>{{ query }}</q> {{ $t("general.not_found") }}
            </template>

            <template #leading>
              <UAvatar
                v-if="state.country_code"
                :src="countryFlag"
                size="2xs"
                class="relative after:-end-1 after:block after:absolute after:h-full after:content-[''] after:border-e after:border-strokeLightGray after:border-solid"
              />
            </template>
          </USelectMenu>
        </template>
      </UInput>
    </UFormGroup>

    <!-- password -->
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

    <!-- confirm password -->
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

// country codes store
const { countryCodes, countryCodesLoading } = storeToRefs(
  useCountryCodesStore()
);
const { fetchCountryCodes } = useCountryCodesStore();

// i18n
const { t, locale } = useI18n();

// emit
const emit = defineEmits(["send"]);

// state
const state = reactive({
  name: undefined,
  phone: undefined,
  country_code: undefined,
  password: undefined,
  confirm_password: undefined,
  lang: locale.value || "ar",
  device_id: "111",
  device_type: "web",
});

// computed selected country flag
const countryFlag = computed(() => {
  return countryCodes.value.find((p) => p.key === state.country_code)?.image;
});

// schema
const schema = object({
  name: string().required(t("inputs.username.required")),
  phone: string().required(t("inputs.phone.required")),
  country_code: string().required(t("inputs.country_code.required")),
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
    url: "provider/sign-up",
    method: "post",
    body: state,
    // getSuccess: true,
    onSuccess: async () => {
      emit("send", state);
    },
  });
};

onMounted(async () => {
  await fetchCountryCodes({
    onSuccess: () => {
      if (countryCodes.value.length)
        state.country_code = countryCodes.value[0].key;
    },
  });
});
</script>

<style></style>
