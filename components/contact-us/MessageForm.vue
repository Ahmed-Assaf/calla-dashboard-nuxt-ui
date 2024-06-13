<template>
  <GeneralTheCard :ui="{ body: { padding: 'sm:!py-9 sm:p-8' } }">
    <GeneralTheForm
      :button="{
        label: t('general.send'),
        radius: 'rounded-xl me-auto ',
        loading: loading,
      }"
      :state
      :schema
      @submit="handleSubmit"
      ref="form"
    >
      <!-- message title -->
      <UFormGroup :label="$t('inputs.message_title.label')" name="subject">
        <UInput
          v-model="state.subject"
          :placeholder="$t('inputs.message_title.placeholder')"
        />
      </UFormGroup>

      <!-- message -->
      <UFormGroup :label="$t('inputs.message.label')" name="complaint">
        <UTextarea
          v-model="state.complaint"
          :placeholder="$t('inputs.message.placeholder')"
          :rows="4"
        />
      </UFormGroup>

      <!-- images -->
      <UFormGroup
        class="relative"
        v-if="!state.type || state.type === 'simple'"
      >
        <template #label>
          <div class="mb-1">
            {{ $t("inputs.image.label") }}
            <span class="text-textLightColor text-[10px]">
              ({{ $t("inputs.optional") }})
            </span>
          </div>
        </template>
        <UInput
          type="file"
          class="absolute top-0 left-0 w-full h-full z-[1] opacity-0 cursor-pointer"
          name="images[]"
          @change="uploadImages($event)"
        />

        <UInput
          :placeholder="$t('inputs.image.placeholder')"
          icon="i-heroicons-link"
          trailing
          readonly
        >
          <template #leading>
            <img
              src="/images/icons/camera.svg"
              :alt="$t('inputs.images.label')"
              width="18"
            />
          </template>
        </UInput>
      </UFormGroup>

      <div
        v-if="(!state.type || state.type === 'simple') && thumbnails"
        class="flex items-center gap-6 flex-wrap w-full mb-5"
      >
        <div class="w-16 relative" v-for="(img, idx) in thumbnails" :key="idx">
          <UButton
            square
            class="absolute top-0 end-0 rtl:-translate-x-1/2 -translate-y-1/2 ltr:translate-x-1/2 rounded-full"
            @click="removeImage(img)"
            size="2xs"
            color="red"
          >
            <template #leading>
              <img src="/images/icons/trash-filled-white.svg" width="8" />
            </template>
          </UButton>

          <img
            :src="img"
            class="w-full aspect-[1] object-contain p-1 rounded-lg border border-solid border-strokeLightGray"
          />
        </div>
      </div>
    </GeneralTheForm>
  </GeneralTheCard>
</template>

<script setup>
// imports
import { object, string } from "yup";
import { GeneralActionModal } from "#components";

// form ref
const form = ref(null);

// i18n
const { t } = useI18n();

// route
const route = useRoute();

// locale route
const localeRoute = useLocaleRoute();

// fetch data
const { fetchData, resultData, loading, resMsg } = useFetchData();
loading.value = false;

// images upload
const { thumbnails, imgsList, uploadImages, removeImage } = useImageUpload();

// state
const state = reactive({
  subject: undefined,
  complaint: undefined,
  images: imgsList.value,
});

// schema
const schema = computed(() => {
  return object({
    subject: string().required(t("inputs.message_title.required")),
    complaint: string().required(t("inputs.message.required")),
  });
});

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// modal
const modal = useModal();

// handle submit
const handleSubmit = async () => {
  const formData = new FormData(document.querySelector("form"));

  await fetchData({
    url: `provider/complaints/store`,
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    body: formData,
    onSuccess: () => {
      modal.open(GeneralActionModal, {
        actionData: {
          image: "/images/warning.svg",
          title: resMsg.value,
        },
        onClose: async () => {
          modal.close();
        },
      });
    },
  });
};
</script>

<style></style>
