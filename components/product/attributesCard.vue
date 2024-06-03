<template>
  <GeneralTheCard
    :header="{ title: props.data.name }"
    :ui="{ body: { base: 'overflow-visible' } }"
    class="mb-5 h-fit"
  >
    <template #header>
      <UButton
        icon="i-heroicons-x-mark-16-solid"
        color="red"
        square
        :ui="{ rounded: 'rounded-full' }"
        size="3xs"
        type="button"
        @click="handleRemoveCard"
      />
    </template>

    <UForm class="space-y-4" :state :schema @submit="handleAddItem">
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
            :loading="loading"
            @open="fetchAttribute"
            class="flex-1"
          />

          <UButton
            type="submit"
            icon="i-heroicons-plus-16-solid"
            :disabled="!state.attribute"
            class="rounded-xl"
          />
        </div>
      </UFormGroup>
    </UForm>

    <div class="flex items-center gap-2 flex-wrap mt-4" v-if="selected.length">
      <UBadge
        color="white"
        variant="solid"
        v-for="item in items"
        :key="item"
        :ui="{
          base: 'shadow-card',
          size: {
            sm: 'px-2 py-2',
          },
          color: {
            white: {
              solid: 'ring-0 text-textBaseColor',
            },
          },
        }"
      >
        {{ item.name }}

        <UButton
          icon="i-heroicons-x-mark-16-solid"
          color="red"
          square
          :ui="{ base: 'ms-3', rounded: 'rounded-full' }"
          size="3xs"
          type="button"
          @click="handleRemove(item.id)"
        />
      </UBadge>
    </div>
  </GeneralTheCard>
</template>

<script setup>
// imports
import { object, number } from "yup";

// props
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  selectedOptions: {
    type: Array,
  },
});

// state
const state = reactive({ attribute: null });

// i18n
const { t } = useI18n();

// use toast
const toast = useToast();

// selected attributes
const selected = ref([]);

// schema
const schema = computed(() => {
  return object({
    attribute: number().required(` ${props.data.name} ${t("inputs.required")}`),
  });
});

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, resultData, loading } = useFetchData();
loading.value = false;

// fetchAttribute
const attributes = ref([]);
const fetchAttribute = async () => {
  if (!attributes.value.length) {
    await fetchData({
      url: `provider/feature/${props.data.id}/options`,
      headers: {
        Authorization: `Bearer ${userInfo.value.token}`,
      },
      onSuccess: () => {
        attributes.value = resultData.value;
      },
    });
  }
};

// selected name
const selecetedName = computed(() => {
  return attributes.value.find((item) => item.id === state.attribute)?.name;
});

// seected items
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

// emit
const emit = defineEmits(["update", "remove"]);

// add item
const handleAddItem = async () => {
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

    emit("update", selected.value);

    state.attribute = null;
  }
};

// remove card
const handleRemoveCard = () => {
  emit("remove");
};

const handleRemove = (id) => {
  selected.value = selected.value.filter((item) => item !== id);
  emit("update", selected.value);
};

onBeforeMount(async () => {
  if (props.selectedOptions) {
    await fetchAttribute();
  }
});

onMounted(async () => {
  if (props.selectedOptions) {
    for (const option of props.selectedOptions) {
      selected.value.push(option.id);
    }
    emit("update", selected.value);
  }
});
</script>

<style></style>
