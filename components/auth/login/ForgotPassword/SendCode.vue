<template>
  <div v-if="!countryCodesLoading">
    <img
      v-if="props.imgSrc"
      :src="props.imgSrc"
      class="mx-auto w-[60px] mb-9 max-w-full"
    />

    <GeneralTheForm
      :button="{
        label: $t('general.confirm'),
        radius: 'rounded-lg mx-auto block min-w-[173px] max-w-full',
        loading,
      }"
      :state
      :schema
      @submit="handleSubmit"
    >
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
    </GeneralTheForm>
  </div>
</template>

<script setup>
// imports
import { object, string } from "yup";

// props
const props = defineProps({
  imgSrc: {
    type: String,
    default: "",
  },
});

// country codes store
const { countryCodes, countryCodesLoading } = storeToRefs(
  useCountryCodesStore()
);
const { fetchCountryCodes } = useCountryCodesStore();

// i18n
const { t } = useI18n();

// emit
const emit = defineEmits(["send"]);

// state
const state = reactive({
  phone: undefined,
  country_code: undefined,
});

// computed selected country flag
const countryFlag = computed(() => {
  return countryCodes.value.find((p) => p.key === state.country_code)?.image;
});

// schema
const schema = object({
  phone: string().required(t("inputs.phone.required")),
  country_code: string().required(t("inputs.country_code.required")),
});

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

const handleSubmit = async () => {
  await fetchData({
    url: "provider/forget-password-send-code",
    method: "post",
    body: state,
    getSuccess: true,
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
