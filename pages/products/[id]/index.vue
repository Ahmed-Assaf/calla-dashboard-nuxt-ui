<template>
  <div>
    <GeneralPageHeading :title="headingTitle" />

    <div class="grid grid-cols-12">
      <div class="col lg:col-span-7 md:col-span-9 col-span-12 mb-8">
        <GeneralTheCard>
          <GeneralTheForm
            :button="formBtn"
            :state
            :schema
            @submit="handleSubmit"
            ref="form"
          >
            <!-- type -->
            <UFormGroup
              :label="$t('inputs.type.label')"
              name="type"
              class="mb-0"
            >
              <GeneralTheSelectMenu
                v-model="state.type"
                :options="types"
                :placeholder="$t('inputs.type.placeholder')"
                value-attribute="value"
                option-attribute="label"
              />
            </UFormGroup>

            <!-- category -->
            <UFormGroup
              :label="$t('inputs.category.label')"
              name="category_id"
              class="mb-0"
            >
              <GeneralTheSelectMenu
                v-model="state.category_id"
                :options="categories"
                :placeholder="$t('inputs.category.placeholder')"
                value-attribute="id"
                option-attribute="name"
                :loading="categoriesLoading"
                @open="fetchCategories"
                @change="onChangeCategory"
              />
            </UFormGroup>

            <!-- sub category -->
            <UFormGroup
              :label="$t('inputs.sub_category.label')"
              name="sub_category_id"
              class="mb-0"
            >
              <GeneralTheSelectMenu
                v-model="state.sub_category_id"
                :options="subCategories"
                :placeholder="$t('inputs.sub_category.placeholder')"
                value-attribute="id"
                option-attribute="name"
                :loading="subCategoriesLoading"
                :disabled="!state.category_id"
                @open="fetchSubCategories"
              />
            </UFormGroup>

            <!-- title ar -->
            <UFormGroup
              :label="$t('inputs.product_name.label')"
              name="title[ar]"
            >
              <UInput
                v-model="state['title[ar]']"
                :placeholder="$t('inputs.product_name.placeholder')"
              />
            </UFormGroup>

            <!-- title en -->
            <UFormGroup
              :label="$t('inputs.product_name_en.label')"
              name="title[en]"
            >
              <UInput
                v-model="state['title[en]']"
                :placeholder="$t('inputs.product_name_en.placeholder')"
              />
            </UFormGroup>

            <!-- stock -->
            <UFormGroup
              :label="$t('inputs.quantity.label')"
              name="stock"
              v-if="!state.type || state.type === 'simple'"
            >
              <UInput
                v-model="state.stock"
                :placeholder="$t('inputs.quantity.placeholder')"
                type="number"
                min="1"
              />
            </UFormGroup>

            <!-- images -->
            <UFormGroup
              :label="$t('inputs.images.label')"
              class="relative"
              v-if="!state.type || state.type === 'simple'"
            >
              <input
                type="file"
                class="absolute top-0 left-0 w-full h-full z-[1] opacity-0 cursor-pointer"
                multiple
                name="images[]"
                ref="fileRef"
                @change="uploadImages($event.target.files)"
              />

              <UInput
                :placeholder="$t('inputs.images.placeholder')"
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

            <div class="flex items-center gap-6 flex-wrap w-full mb-5">
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
                      <img
                        src="/images/icons/trash-filled-white.svg"
                        width="8"
                      />
                    </template>
                  </UButton>

                  <img
                    :src="img.image"
                    class="w-full aspect-[1] object-contain p-1 rounded-lg border border-solid border-strokeLightGray"
                  />
                </div>
              </template>

              <!-- uploaded images -->
              <template
                v-if="(!state.type || state.type === 'simple') && thumbnails"
              >
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
                      <img
                        src="/images/icons/trash-filled-white.svg"
                        width="8"
                      />
                    </template>
                  </UButton>

                  <img
                    :src="img"
                    class="w-full aspect-[1] object-contain p-1 rounded-lg border border-solid border-strokeLightGray"
                  />
                </div>
              </template>
            </div>

            <!-- brands -->
            <UFormGroup :label="$t('inputs.brand.label')" name="brand_id">
              <GeneralTheSelectMenu
                v-model="state.brand_id"
                :options="brands"
                :placeholder="$t('inputs.brand.placeholder')"
                value-attribute="id"
                option-attribute="name"
                :loading="brandsLoading"
                @open="fetchBrands"
              />
            </UFormGroup>

            <!-- description ar -->
            <UFormGroup
              :label="$t('inputs.product_description.ar.label')"
              name="description[ar]"
            >
              <UTextarea
                v-model="state['description[ar]']"
                :placeholder="$t('inputs.product_description.ar.placeholder')"
                :rows="4"
              />
            </UFormGroup>

            <!-- description en -->
            <UFormGroup
              :label="$t('inputs.product_description.en.label')"
              name="description[en]"
            >
              <UTextarea
                v-model="state['description[en]']"
                :placeholder="$t('inputs.product_description.en.placeholder')"
                :rows="4"
              />
            </UFormGroup>

            <!-- price -->
            <UFormGroup
              :label="$t('inputs.price.label')"
              name="price"
              v-if="!state.type || state.type === 'simple'"
            >
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
            <UFormGroup
              :label="$t('inputs.discount_type.label')"
              name="discount_type"
              v-if="!state.type || state.type === 'simple'"
            >
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
              v-if="
                (!state.type || state.type === 'simple') && state.discount_type
              "
            >
              <UInput
                v-model="state.discount_amount"
                :placeholder="$t('inputs.discount_amount.placeholder')"
                type="number"
                min="1"
              />
            </UFormGroup>
          </GeneralTheForm>
        </GeneralTheCard>
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import { object, string } from "yup";

// page meta
definePageMeta({
  title: "product.create",
});

const form = ref(null);

// i18n
const { t } = useI18n();

// route
const route = useRoute();

// locale route
const localeRoute = useLocaleRoute();

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

// on change category
const onChangeCategory = async () => {
  subCategories.value = [];
  state.sub_category_id = null;

  nextTick(async () => {
    await fetchSubCategories();
  });
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
  type: undefined,
  category_id: null,
  sub_category_id: null,
  "title[ar]": undefined,
  "title[en]": undefined,
  stock: null,
  images: imgsList.value,
  brand_id: null,
  "description[ar]": undefined,
  "description[en]": undefined,
  price: null,
  discount_type: "ratio",
  discount_amount: null,
});

// schema
const schema = computed(() => {
  return object({
    type: string().required(t("inputs.type.required")),
    category_id: string().required(t("inputs.category.required")),
    sub_category_id: string().required(t("inputs.sub_category.required")),
    "title[ar]": string().required(t("inputs.product_name.required")),
    "title[en]": string().required(t("inputs.product_name_en.required")),
    stock:
      state.type !== "multi"
        ? string().required(t("inputs.quantity.required"))
        : null,
    // images:
    //   state.type !== "multi"
    //     ? string().required(t("inputs.images.required"))
    //     : null,
    brand_id: string().required(t("inputs.brand.required")),

    "description[ar]": string().required(
      t("inputs.product_description.ar.required")
    ),
    "description[en]": string().required(
      t("inputs.product_description.en.required")
    ),
    price:
      state.type !== "multi"
        ? string().required(t("inputs.price.required"))
        : null,
    discount_amount:
      state.type !== "multi" && state.discount_type
        ? string().required(t("inputs.discount_amount.required"))
        : null,
  });
});

// edit pages param
const editPage = computed(() => route.params.id !== "create");

// heading title
const headingTitle = computed(() => {
  if (editPage.value) {
    return [
      { label: t("product.plural"), to: localeRoute({ name: "products" }) },
      { label: t("product.edit") },
    ];
  } else {
    return [
      { label: t("product.plural"), to: localeRoute({ name: "products" }) },
      { label: t("product.create_1") },
    ];
  }
});

// form button
const formBtn = computed(() => {
  if (editPage.value) {
    if (state.type === "multi")
      return {
        label: t("product.attribute.plural.edit"),
        radius: "rounded-xl me-auto",
        loading: formLoading.value,
      };
    else
      return {
        label: t("product.confirm_edit"),
        radius: "rounded-xl me-auto",
        loading: formLoading.value,
      };
  } else {
    if (state.type === "multi")
      return {
        label: t("product.attribute.plural.add"),
        radius: "rounded-xl me-auto",
        loading: formLoading.value,
      };
    else
      return {
        label: t("product.confirm_create"),
        radius: "rounded-xl me-auto",
        loading: formLoading.value,
        trailing: {
          src: "/images/icons/plus-square-filled-white.svg",
        },
      };
  }
});

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch form data
const getProductData = async () => {
  await fetchData({
    url: `provider/products/show/${route.params.id}`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      const product = resultData.value;

      state.type = product.type;
      state.category_id = product.category_id;
      state.sub_category_id = product.sub_category_id;
      state["title[ar]"] = product.title.ar;
      state["title[en]"] = product.title.en;
      state.brand_id = product.brand_id;
      state["description[ar]"] = product.description.ar;
      state["description[en]"] = product.description.en;
      if (product.type === "simple") {
        state.stock = product.variants.stock;
        state.price = product.variants.price;
        state.discount_type = product.variants.discount_type;
        state.discount_amount = product.variants.discount_amount;

        oldThumbnails.value = product.variants.images;

        simpleVariantId.value = product.variants.id;
      } else {
        state.stock = null;
        state.price = null;
        state.discount_type = "";
        state.discount_amount = null;
        simpleVariantId.value = null;
      }
    },
  });
};

// submit form
const formLoading = ref(false);
const fileRef = ref(null);

const handleSubmit = async () => {
  if (state.type === "simple") {
    // fileRef.value.files = imgsList.value;
  }

  const formData = new FormData(document.querySelector("form"));

  formLoading.value = true;
  if (editPage.value) {
    await fetchData({
      url: `provider/products/update/${route.params.id}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${userInfo.value.token}`,
      },
      params: { _method: "PUT" },
      body: formData,
      getSuccess: true,
      onSuccess: () => {
        if (state.type === "multi")
          navigateTo(
            localeRoute({
              name: `products-id-attributes`,
              params: { id: route.params.id },
            })
          );
        else navigateTo(localeRoute({ name: "products", replace: true }));
      },
    });
  } else {
    await fetchData({
      url: `provider/products/store`,
      method: "post",
      headers: {
        Authorization: `Bearer ${userInfo.value.token}`,
      },
      body: formData,
      getSuccess: true,
      onSuccess: () => {
        if (state.type === "multi")
          navigateTo(
            localeRoute({
              name: `products-id-attributes`,
              params: { id: resultData.value.product_id },
              query: {
                action: "create",
              },
            })
          );
        else navigateTo(localeRoute({ name: "products", replace: true }));
      },
    });
  }
  formLoading.value = false;
};

onBeforeMount(async () => {
  if (editPage.value) {
    await fetchCategories();

    await fetchBrands();

    nextTick(async () => {
      await fetchSubCategories();
    });
  }
});

onMounted(async () => {
  if (editPage.value) {
    await getProductData();
  }
});
</script>

<style></style>
