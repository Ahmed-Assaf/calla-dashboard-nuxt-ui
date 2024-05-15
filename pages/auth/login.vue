<template>
  <div>
    <div class="heading mb-6">
      <h1 class="text-md font-bukra font-bold mb-2">
        {{ $t("pages.auth.login") }}
      </h1>

      <p class="text-xs font-bukra">
        {{ $t("auth.dont_have_account") }}
        <UButton
          :label="$t('auth.register.label')"
          :padded="false"
          variant="link"
          class="font-normal"
          size="xs"
        />
      </p>
    </div>

    <GeneralTheForm
      :button="{
        label: $t('pages.auth.login'),
        radius: 'rounded-xl me-auto',
        loading,
      }"
      :state
      :schema
      @submit="handleSubmit"
    >
      <UFormGroup :label="$t('inputs.username.label')" name="username">
        <UInput
          v-model="state.name"
          :placeholder="$t('inputs.username.placeholder')"
        />
      </UFormGroup>

      <UFormGroup
        :label="$t('inputs.password.label')"
        name="password"
        class="mb-0"
      >
        <GeneralPasswordInput
          v-model="state.password"
          :placeholder="$t('inputs.password.placeholder')"
        />
      </UFormGroup>

      <AuthLoginForgotPassword class="w-fit ms-auto !mt-1" />
    </GeneralTheForm>
  </div>
</template>

<script lang="ts" setup>
// imports
import { object, string } from "yup";

// i18n
const { t } = useI18n();

// page meta
definePageMeta({
  layout: "auth",
  title: "pages.auth.login",
});

// state
const state = reactive({
  name: undefined,
  password: undefined,
  device_id: "11111111111",
  device_type: "web",
});

// schema
const schema = object({
  name: string().required(t("inputs.username.required")),
  password: string()
    .min(6, t("inputs.password.invalid.length"))
    .required(t("inputs.password.required")),
});

// auth store
const { setAuth } = useAuthStore();

// locale route
const localeRoute = useLocaleRoute();

// fetch data
const { resultData, fetchData, loading } = useFetchData();
loading.value = false;

const handleSubmit = async () => {
  await fetchData({
    url: "provider/sign-in?count_notifications=2",
    method: "post",
    body: state,
    getSuccess: true,
    onSuccess: async () => {
      const authCookie = useCookie("auth", { watch: true });

      authCookie.value = resultData.value;

      setAuth();

      await navigateTo(
        localeRoute({
          name: "index",
          replace: true,
        })
      );
    },
  });
};
</script>

<style></style>
