<template>
  <div>
    <GeneralTheButton
      class="justify-between gap-7 px-3"
      :label="$t(props.buttonLabel)"
      icon-image="/images/icons/plus-square-filled-white.svg"
      :ui="{
        rounded: 'rounded-xl',
      }"
      size="xl"
      @click="modal = true"
    />

    <GeneralTheModal
      v-model="modal"
      @close="modal = false"
      :header="{ title: $t('user.details') }"
    >
      <GeneralTheForm
        :button="{
          label: props.buttonLabel,
          radius: 'rounded-xl',
          loading: formLoading,
        }"
        :state
        :schema
        @submit="handleSubmit"
        ref="form"
      >
        <div class="grid grid-cols-12 gap-6">
          <!-- name -->
          <UFormGroup
            :label="$t('inputs.username.label')"
            name="name"
            class="col-span-12"
          >
            <UInput
              v-model="state.name"
              :placeholder="$t('inputs.username.placeholder')"
            />
          </UFormGroup>

          <!-- job name ar -->
          <UFormGroup
            :label="$t('inputs.job_name_ar.label')"
            name="role_name[ar]"
            class="md:col-span-6 col-span-12"
          >
            <UInput
              v-model="state['role_name[ar]']"
              :placeholder="$t('inputs.job_name_ar.placeholder')"
            />
          </UFormGroup>

          <!-- job name en -->
          <UFormGroup
            :label="$t('inputs.job_name_en.label')"
            name="role_name[en]"
            class="md:col-span-6 col-span-12"
          >
            <UInput
              v-model="state['role_name[en]']"
              :placeholder="$t('inputs.job_name_en.placeholder')"
            />
          </UFormGroup>

          <!-- password -->
          <UFormGroup
            :label="$t('inputs.password.label')"
            name="password"
            class="col-span-12"
          >
            <GeneralPasswordInput
              v-model="state.password"
              :placeholder="$t('inputs.password.placeholder')"
            />
          </UFormGroup>

          <!-- permissions -->
          <UFormGroup
            :label="$t('inputs.permissions.label')"
            name="abilities[]"
            class="col-span-12"
          >
            <div class="grid grid-cols-12 gap-5" v-if="!abilitiesLoading">
              <UCheckbox
                v-for="ability in abilities"
                :key="ability.id"
                v-model="state[`abilities[]`]"
                :label="ability.name"
                :value="ability.id"
                class="md:col-span-4 sm:col-span-6 col-span-12"
                :id="`ability-${ability.id}`"
              />
            </div>

            <div class="grid grid-cols-12 gap-5" v-else>
              <div
                v-for="i in 6"
                :key="i"
                class="md:col-span-4 sm:col-span-6 col-span-12 flex items-center gap-2"
              >
                <USkeleton class="w-3.5 h-3.5 rounded" />
                <USkeleton class="h-2 rounded flex-1" />
              </div>
            </div>
          </UFormGroup>
        </div>
      </GeneralTheForm>
    </GeneralTheModal>
  </div>
</template>

<script setup>
// imports
import { object, array, string } from "yup";

// props
const props = defineProps({
  buttonLabel: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
  },
});
// i18n
const { t } = useI18n();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// emit
const emit = defineEmits(["update"]);

// modal
const modal = ref(false);

// abilities
const abilitiesIds = computed(() => {
  if (props.user) {
    return props.user.abilities.map((ability) => ability.id);
  } else {
    return [];
  }
});

// state
const state = reactive({
  name: props.user?.name || undefined,
  "role_name[ar]": props.user?.role_name.ar || undefined,
  "role_name[en]": props.user?.role_name.en || undefined,
  "abilities[]": abilitiesIds.value || [],
});

// schema
const schema = computed(() => {
  return object({
    name: string().required(t("inputs.username.required")),
    "role_name[ar]": string().required(t("inputs.job_name_ar.required")),
    "role_name[en]": string().required(t("inputs.job_name_en.required")),
    password: string()
      .min(6, t("inputs.password.invalid.length"))
      .required(t("inputs.password.required")),
    "abilities[]": array().min(1, t("inputs.permissions.required")),
  });
});

// abilities
const { abilities, abilitiesLoading } = storeToRefs(useAbilitiesStore());
const { fetchAbilities } = useAbilitiesStore();

watch(modal, async (newVal) => {
  if (newVal) await fetchAbilities();
});

// fetch data
const { fetchData, resultData, loading } = useFetchData();
loading.value = false;
// submit url
const fetchUrl = computed(() => {
  if (props.user) {
    return `provider/sub-providers/${props.user.id}/update?_method=PUT`;
  } else {
    return `provider/sub-providers/store`;
  }
});

//  handle submit
const formLoading = ref(false);

const handleSubmit = async () => {
  formLoading.value = true;
  await fetchData({
    url: fetchUrl.value,
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    body: state,
    getSuccess: true,
    onSuccess: () => {
      formLoading.value = false;
      modal.value = false;
      emit("update");
    },
  });
  formLoading.value = false;
};
</script>

<style></style>
