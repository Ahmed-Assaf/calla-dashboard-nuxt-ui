<template>
  <div>
    <!-- <UNotifications /> -->

    <GeneralPageHeading :title="headingTitle" />

    <div class="grid grid-cols-12">
      <div class="col lg:col-span-7 md:col-span-9 col-span-12 mb-8">
        <!-- Add Attribute -->
        <GeneralTheCard
          class="h-fit mb-5"
          :ui="{ body: { base: 'overflow-visible' } }"
        >
          <UForm class="space-y-4" :state :schema @submit="handleAddAttributes">
            <!-- attribute -->
            <UFormGroup
              :label="$t('inputs.select_attribute.label')"
              name="attribute"
              class="mb-0"
            >
              <div class="flex items-stretch gap-3">
                <GeneralTheSelectMenu
                  v-model="state.attribute"
                  :options="attributes"
                  :placeholder="$t('inputs.select_attribute.placeholder')"
                  value-attribute="id"
                  option-attribute="name"
                  :loading="attributesLoading"
                  @open="fetchAttribute"
                  class="flex-1"
                />

                <UButton
                  type="submit"
                  variant="outline"
                  :label="$t('inputs.select_attribute.label')"
                  :disabled="!state.attribute"
                  class="rounded-xl"
                />
              </div>
            </UFormGroup>
          </UForm>
        </GeneralTheCard>

        <template v-if="selected.length">
          <ProductAttributesCard
            v-for="item in items"
            :key="item.id"
            :data="item"
            :selected-options="selectedAttrOPtions"
            @update="handleAttrUpdate(item.id, $event)"
            @remove="handleAttrRemove(item.id)"
          />
        </template>

        <UButton
          type="button"
          :label="$t('product.group.plural.add')"
          v-if="prodAttrsData.length"
          class="rounded-xl"
          size="xl"
          :loading="formLoading"
          @click="handleAttrsSubmit"
        />
      </div>
    </div>
    <!-- ATTRIBUTES -->
  </div>
</template>

<script setup>
// imports
import { object, number, string } from "yup";

// page meta
definePageMeta({
  title: "product.attribute.plural.this",
});

// i18n
const { t } = useI18n();

// route
const route = useRoute();

// locale route
const localeRoute = useLocaleRoute();

// use toast
const toast = useToast();

// edit pages param
const editPage = computed(() => route.query.action !== "create");

// heading title
const headingTitle = computed(() => {
  if (editPage.value) {
    return [
      { label: t("product.plural"), to: localeRoute({ name: "products" }) },
      {
        label: t("product.edit"),
      },
      {
        label: t("product.attribute.plural.this"),
      },
    ];
  } else {
    return [
      { label: t("product.plural"), to: localeRoute({ name: "products" }) },
      {
        label: t("product.create_1"),
      },
      { label: t("product.attribute.plural.this") },
    ];
  }
});

// state
const state = reactive({
  attribute: null,
});

// selected attributes
const selected = ref([]);

// schema
const schema = computed(() => {
  return object({
    attribute: number().required(t("inputs.select_attribute.required")),
  });
});

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, resultData, loading } = useFetchData();
loading.value = false;

// fetchAttribute
const attributes = ref([]),
  attributesLoading = ref(false);

const fetchAttribute = async () => {
  attributesLoading.value = true;
  if (!attributes.value.length) {
    await fetchData({
      url: `provider/features`,
      headers: {
        Authorization: `Bearer ${userInfo.value.token}`,
      },
      onSuccess: () => {
        attributes.value = resultData.value;
      },
    });
  }
  attributesLoading.value = false;
};

const selecetedName = computed(() => {
  return attributes.value.find((item) => item.id === state.attribute)?.name;
});

// selected items
const items = computed(() => {
  if (process.client && selected.value.length) {
    const attrsArr = [];
    for (const attrId of selected.value) {
      const attrObj = attributes.value.find((item) => item.id === attrId);
      if (attrObj) {
        attrsArr.push({
          id: attrId,
          name: attrObj.name,
        });
      }
    }

    return attrsArr;
  }
});

// handle get attributes in edit page
const selectedAttrOPtions = ref(null);
const handleGetAttributes = async () => {
  fetchData({
    url: `provider/products/get-features-options/${route.params.id}`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      for (const feature of resultData.value.features) {
        selected.value.push(feature.id);
        selectedAttrOPtions.value = feature.options;
      }
    },
  });
};

// add attributes
const handleAddAttributes = async () => {
  if (selected.value.includes(state.attribute)) {
    // toast
    toast.add({
      description: `${t("general.already_chose")} ${selecetedName.value}`,
      timeout: 3000,
      color: "red",
    });
  } else {
    selected.value.push(state.attribute);

    // toast
    toast.add({
      description: `${t("general.added")} ${selecetedName.value}`,
      timeout: 3000,
      color: "primary",
    });

    state.attribute = null;
  }
};

// product attributes all data
const prodAttrsData = ref([]);

// handle attribute update
const handleAttrUpdate = (id, value) => {
  const attrObj = { feature_id: id, options_ids: value };

  if (prodAttrsData.value.length) {
    const objSelect = prodAttrsData.value.find(
        (item) => item.feature_id === id
      ),
      objFound = prodAttrsData.value.includes(objSelect);

    if (objFound) {
      if (attrObj.options_ids.length) {
        prodAttrsData.value.splice(prodAttrsData.value.indexOf(objSelect), 1);
        prodAttrsData.value.push(attrObj);
      } else {
        prodAttrsData.value.splice(prodAttrsData.value.indexOf(objSelect), 1);
      }
    } else {
      prodAttrsData.value.push(attrObj);
    }
  } else {
    if (attrObj.options_ids.length) {
      prodAttrsData.value.push(attrObj);
    }
  }
};

// handle attribute remove
const handleAttrRemove = (id) => {
  prodAttrsData.value = prodAttrsData.value.filter(
    (item) => item.feature_id !== id
  );
  selected.value = selected.value.filter((item) => item !== id);
};

// handle submit
const formLoading = ref(false);

const handleAttrsSubmit = async () => {
  formLoading.value = true;
  await fetchData({
    url: `provider/products/feature-add-or-update`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    body: {
      features: JSON.stringify(prodAttrsData.value),
      product_id: route.params.id,
    },
    getSuccess: true,
    onSuccess: () => {
      navigateTo(
        localeRoute({
          name: `products-id-groups`,
          params: { id: route.params.id },
          query: {
            action: !editPage.value ? "create" : undefined,
          },
        })
      );
    },
  });
  formLoading.value = false;
};

onBeforeMount(async () => {
  if (editPage.value) {
    await fetchAttribute();
  }
});

onMounted(async () => {
  if (editPage.value) {
    await handleGetAttributes();
  }
});
</script>

<style></style>
