<template>
  <div>
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
              :options="codes"
              searchable
              :searchable-placeholder="$t('inputs.country_code.search')"
              clear-search-on-close
              trailingIcon=""
              placeholder="Select a person"
              variant="none"
              :padded="false"
              :uiMenu="{
                width: 'min-w-36 w-fit',
                trigger: 'py-3 px-0',
              }"
              :popper="{ placement: 'bottom-start', offsetDistance: 0 }"
              option-attribute="label"
              value-attribute="id"
            >
              <template #option-empty="{ query }">
                <q>{{ query }}</q> {{ $t("general.not_found") }}
              </template>

              <template #leading>
                <UAvatar
                  v-if="state.country_code"
                  v-bind="(countryFlag as Avatar)"
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

<script lang="ts" setup>
// imports
import { object, string } from "yup";

// props
const props = defineProps({
  imgSrc: {
    type: String,
    default: "",
  },
});

import type { Avatar } from "#ui/types";

const codes = [
  {
    id: "00966",
    label: "qw",
    avatar: { src: "https://avatars.githubusercontent.com/u/739984?v=4" },
  },
  {
    id: "2",
    label: "qw",
    avatar: { src: "https://avatars.githubusercontent.com/u/904724?v=4" },
  },
  {
    id: "3",
    label: "qw",
    avatar: { src: "https://avatars.githubusercontent.com/u/7547335?v=4" },
  },
];

// i18n
const { t } = useI18n();

// emit
const emit = defineEmits(["send"]);

// state
const state = reactive({
  phone: undefined,
  country_code: codes[0].id,
});

// computed selected country flag
const countryFlag = computed(() => {
  return codes.find((p) => p.id === state.country_code)?.avatar;
});

// schema
const schema = object({
  phone: string().required(t("inputs.phone.required")),
  country_code: string().required(t("inputs.country_code.required")),
});

// fetch data
const { resultData, fetchData, loading } = useFetchData();
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
</script>

<style></style>
