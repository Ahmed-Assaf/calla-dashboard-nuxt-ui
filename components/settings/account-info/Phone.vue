<template>
  <UFormGroup
    :label="$t('inputs.phone.label')"
    name="phone"
    v-if="!countryCodesLoading"
  >
    <UInput
      :modelValue="props.phone"
      :placeholder="$t('inputs.phone.placeholder')"
      :ui="{
        padding: {
          lg: `!pe-64`,
        },
        icon: {
          trailing: {
            padding: {
              lg: `px-0`,
            },
          },
        },
      }"
      readonly
    >
      <template #trailing>
        <USelectMenu
          :modelValue="props.countryCode"
          :options="countryCodes"
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
          disabled
        >
          <template #option-empty="{ query }">
            <q>{{ query }}</q> {{ $t("general.not_found") }}
          </template>

          <template #leading>
            <UAvatar
              v-if="props.countryCode"
              :src="countryFlag"
              size="2xs"
              class="relative after:-end-1 after:block after:absolute after:h-full after:content-[''] after:border-e after:border-strokeLightGray after:border-solid"
            />
          </template>
        </USelectMenu>

        <UButton
          type="buttons"
          size="xl"
          :label="$t('auth.phone.change')"
          variant="solid"
          class="w-44 rounded-lg px-3 ms-3 justify-center"
          @click="modal = true"
        />
      </template>
    </UInput>

    <SettingsAccountInfoPhoneModal v-model="modal" />
  </UFormGroup>
</template>

<script setup>
// props
const props = defineProps({
  phone: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
});

// country codes store
const { countryCodes, countryCodesLoading } = storeToRefs(
  useCountryCodesStore()
);
const { fetchCountryCodes } = useCountryCodesStore();

// computed selected country flag
const countryFlag = computed(() => {
  return countryCodes.value.find((p) => p.key === props.countryCode)?.image;
});

onMounted(async () => {
  await fetchCountryCodes({
    onSuccess: () => {
      // if (countryCodes.length) props.countryCode = countryCodes.value[0].key;
    },
  });
});

//  modal
const modal = ref(false);
</script>
