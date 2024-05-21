<template>
  <div>
    <GeneralPageHeading :title="headingTitle" />

    <div class="grid grid-cols-12">
      <div class="col col-span-8 mb-8">
        <GeneralTheCard>
          <GeneralTheForm
            :button="{
              label: $t('product.confirm_create'),
              radius: 'rounded-xl me-auto',
              loading,
            }"
            :state
            :schema
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
            <UFormGroup :label="$t('inputs.quantity.label')" name="stock">
              <UInput
                v-model="state.stock"
                :placeholder="$t('inputs.quantity.placeholder')"
                type="number"
                min="0"
              />
            </UFormGroup>

            <!-- images -->
            <UFormGroup
              :label="$t('inputs.quantity.label')"
              name="images[]"
              class="relative"
            >
              <UInput
                type="file"
                class="absolute top-0 left-0 w-full h-full z-[1] opacity-0 cursor-pointer"
                multiple
                @change="uploadImages($event)"
              />

              <UInput
                :placeholder="$t('inputs.images.placeholder')"
                icon="i-heroicons-link"
                trailing
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
              v-if="state['images[]']"
              class="flex items-center gap-6 flex-wrap w-full mb-5"
            >
              <div
                class="w-16 relative"
                v-for="(img, idx) in state['images[]']"
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
            </div>

            <!-- brands -->
            <UFormGroup :label="$t('inputs.brand.label')" name="stock">
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

            <!-- <UTextarea v-model="value" /> -->
          </GeneralTheForm>
        </GeneralTheCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// imports
import { number, object, string, array } from "yup";

// page meta
definePageMeta({
  title: "product.create",
});

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

// fetch categories
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

// fetch categories
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

// state
const state = reactive({
  type: undefined,
  category_id: null,
  sub_category_id: null,
  "title[ar]": undefined,
  "title[en]": undefined,
  stock: 0,
  "images[]": [],
  brand_id: null,
});

// schema
const schema = object({
  type: string().required(t("inputs.type.required")),
  category_id: string().required(t("inputs.category.required")),
  sub_category_id: string().required(t("inputs.sub_category.required")),
  "title[ar]": string().required(t("inputs.product_name.required")),
  "title[en]": string().required(t("inputs.product_name_en.required")),
  stock: string().required(t("inputs.quantity.required")),
  "images[]": array().min(1, t("inputs.images.required")),
});

// upload images
const uploadImages = ($event: any) => {
  for (const f of $event) {
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      state["images[]"].push(e.target.result);

      console.log(state["images[]"]);
    };
    fileReader.readAsDataURL(f);
  }
};

// remove uploaded image
const removeImage = (img: string) => {
  state["images[]"].splice(state["images[]"].indexOf(img), 1);
};

// edit pages param
const editPage = computed(() => (route.params.id !== "create" ? true : false));

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
</script>

<style></style>
