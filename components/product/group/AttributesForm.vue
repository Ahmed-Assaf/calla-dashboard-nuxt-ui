<template>
  <GeneralTheForm
    :state
    :schema
    @submit="handleSubmit"
    ref="form"
    :button="buttonObj"
  >
    <!-- images -->
    <UFormGroup :label="$t('inputs.images.label')">
      <div class="flex items-center flex-wrap gap-3">
        <div
          class="relative cursor-pointer w-16 aspect-[1] p-1 rounded-lg border border-solid border-strokeLightGray flex items-center justify-center flex-col gap-1"
        >
          <input
            type="file"
            class="absolute top-0 left-0 w-full h-full z-[1] opacity-0 cursor-pointer"
            multiple
            name="images[]"
            @change="uploadImages($event.target.files)"
            ref="fileRef"
          />
          <img
            src="/images/icons/camera.svg"
            :alt="$t('inputs.images.label')"
            width="18"
            class="mb-1"
          />

          <small class="text-textLightColor leading-none text-xs">{{
            $t("inputs.images.label")
          }}</small>
        </div>

        <!-- old images -->
        <template v-if="!state.type || state.type === 'simple'">
          <div
            class="w-16 relative"
            v-for="(img, idx) in oldThumbnails"
            :key="idx"
          >
            <UButton
              square
              class="absolute top-0 end-0 rtl:-translate-x-1/2 -translate-y-1/2 ltr:translate-x-1/2 rounded-full"
              @click="removeOldImage(img.id, img.image)"
              size="2xs"
              color="red"
            >
              <template #leading>
                <img src="/images/icons/trash-filled-white.svg" width="8" />
              </template>
            </UButton>

            <img
              :src="img.image"
              class="w-full aspect-[1] object-contain p-1 rounded-lg border border-solid border-strokeLightGray"
            />
          </div>
        </template>

        <!-- uploaded images -->
        <template v-if="thumbnails">
          <div
            class="w-16 relative"
            v-for="(img, idx) in thumbnails"
            :key="idx"
          >
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
        </template>
      </div>
    </UFormGroup>

    <!-- attributes -->
    <UFormGroup
      v-for="(attr, idx) in prodAttrs.features"
      :label="attr.name"
      class="mb-0"
      :key="idx"
    >
      <GeneralTheSelectMenu
        v-model="state.options_ids[idx]"
        :options="attr.options"
        :placeholder="$t('inputs.type.placeholder')"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>

    <!-- price -->
    <UFormGroup :label="$t('inputs.price.label')" name="price">
      <UInput
        v-model="state.price"
        :placeholder="$t('inputs.price.placeholder')"
        type="number"
        min="1"
      >
        <template #trailing>
          <span class="text-xs text-textLightColor">{{
            $t("general.currency")
          }}</span>
        </template>
      </UInput>
    </UFormGroup>

    <!-- discount type -->
    <UFormGroup :label="$t('inputs.discount_type.label')" name="discount_type">
      <URadioGroup
        :options="[
          {
            value: 'ratio',
            label: $t('inputs.discount_type.options.ratio'),
          },
          {
            value: 'number',
            label: $t('inputs.discount_type.options.number'),
          },
          {
            value: '',
            label: $t('inputs.discount_type.options.none'),
          },
        ]"
        v-model="state.discount_type"
        valueAttribute="value"
      />
    </UFormGroup>

    <!-- discount amount -->
    <UFormGroup
      :label="$t('inputs.discount_amount.label')"
      name="discount_amount"
      v-if="state.discount_type"
    >
      <UInput
        v-model="state.discount_amount"
        :placeholder="$t('inputs.discount_amount.placeholder')"
        type="number"
        min="1"
      />
    </UFormGroup>

    <!-- stock -->
    <UFormGroup :label="$t('inputs.quantity.label')" name="stock">
      <UInput
        v-model="state.stock"
        :placeholder="$t('inputs.quantity.placeholder')"
        type="number"
        min="1"
      />
    </UFormGroup>
  </GeneralTheForm>
</template>

<script setup>
// imports
import { object, string, number } from "yup";

// props
const props = defineProps({
  secondBtn: {
    type: Boolean,
    default: false,
  },
  variantId: {
    type: Number,
    default: null,
  },
});

// emits
const emit = defineEmits(["addGroup"]);

const form = ref(null);

// i18n
const { t } = useI18n();

// route
const route = useRoute();

// fetch data
const { fetchData, resultData, loading } = useFetchData();
loading.value = false;

// product types
const types = computed(() => [
  { label: t("product.types.simple"), value: "simple" },
  { label: t("product.types.multi"), value: "multi" },
]);

// product categories
const categories = ref([]),
  categoriesLoading = ref(false);

// fetch categories
const fetchCategories = async () => {
  if (!categories.value.length) {
    categoriesLoading.value = true;
    await fetchData({
      url: "main-categories",
      onSuccess: () => {
        categories.value = resultData.value;
      },
    });
  }

  categoriesLoading.value = false;
};

// product sub categories
const subCategories = ref([]),
  subCategoriesLoading = ref(false);

// fetch sub-categories
const fetchSubCategories = async () => {
  if (!subCategories.value.length) {
    subCategoriesLoading.value = true;
    await fetchData({
      url: `sub-categories/${state.category_id}`,
      onSuccess: () => {
        subCategories.value = resultData.value;
      },
    });
  }

  subCategoriesLoading.value = false;
};

// product brands
const brands = ref([]),
  brandsLoading = ref(false);

// fetch brands
const fetchBrands = async () => {
  if (!brands.value.length) {
    brandsLoading.value = true;
    await fetchData({
      url: `brands-list`,
      onSuccess: () => {
        brands.value = resultData.value;
      },
    });
  }

  brandsLoading.value = false;
};

// images upload
const { thumbnails, imgsList, uploadImages, removeImage } = useImageUpload();

// old Thumbnails
const oldThumbnails = ref([]);

const simpleVariantId = ref(null);

// remove old images
const removeOldImage = (id, img) => {
  fetchData({
    url: `provider/products/delete-image/${simpleVariantId.value}/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    getSuccess: true,
    onSuccess: () => {
      oldThumbnails.value = oldThumbnails.value.filter(
        (thumb) => thumb.image !== img
      );
    },
  });
};

// state
const state = reactive({
  images: imgsList,
  options_ids: [],
  price: null,
  discount_type: "ratio",
  discount_amount: null,
  stock: null,
});

let initialState = reactive({});

// schema
const schema = computed(() => {
  return object({
    price: number().required(t("inputs.price.required")),
    discount_amount: state.discount_type
      ? string().required(t("inputs.discount_amount.required"))
      : null,
    stock: string().required(t("inputs.quantity.required")),
  });
});

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// get product attrs
const prodAttrs = ref([]);

const getProdAttrs = async () => {
  fetchData({
    url: `provider/products/get-features-options/${route.params.id}`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      prodAttrs.value = resultData.value;

      const attrFeatures = prodAttrs.value.features;
      for (const feature of attrFeatures) {
        state.options_ids.push(feature.options[0].id);
      }

      initialState = reactive({ ...state });
    },
  });
};

// fetch form data
const getVariantData = async () => {
  await fetchData({
    url: `provider/products/show-variant/${props.variantId}`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      const variant = resultData.value;

      state.options_ids = [];

      for (const opt of variant.options_ids) {
        state.options_ids.push(opt.id);
      }

      state.price = variant.price;
      state.discount_type = variant.discount_type;
      state.discount_amount = variant.discount_amount;
      state.stock = variant.stock;
      oldThumbnails.value = variant.images;
    },
  });
};

// submit form
const formLoading = ref(false);
const fileRef = ref(null);

const submitUrl = computed(() => {
  if (props.variantId) {
    return `provider/products/update-variant/${props.variantId}`;
  } else {
    return `provider/products/add-variant/${route.params.id}`;
  }
});

const handleSubmit = async () => {
  const formData = new FormData(document.querySelector("form"));

  // fileRef.value.files = imgsList.value;

  formData.append("options_ids", JSON.stringify(state.options_ids));

  console.log(JSON.stringify(state.options_ids));

  formLoading.value = true;

  await fetchData({
    url: submitUrl.value,
    method: "post",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    body: formData,
    getSuccess: true,
    onSuccess: () => {
      emit("addGroup");
      if (!props.variantId) {
        formEl.reset();
        Object.assign(initialState, state);
        thumbnails.value = [];
      }
    },
  });
  formLoading.value = false;
};

// button
const buttonObj = computed(() => {
  if (props.secondBtn) {
    return {
      label: t("product.group.plural.confirm_add"),
      radius: "rounded-xl me-auto",
      loading: formLoading.value,
      variant: "outline",
    };
  } else {
    return {
      label: t("general.save_changes"),
      radius: "rounded-xl block ",
      loading: formLoading.value,
    };
  }
});

// on mounted hook
onMounted(async () => {
  await getProdAttrs();

  if (props.variantId) {
    await getVariantData();
  }
});
</script>

<style></style>
