<template>
  <div>
    <UButton
      :label="$t('product.group.choose_main.title')"
      variant="outline"
      size="xl"
      class="rounded-xl px-4"
      @click="modal = true"
    />

    <GeneralTheModal
      v-model="modal"
      @close="modal = false"
      :header="{ title: $t('product.group.choose_main.title') }"
    >
      <div class="flex flex-col max-h-full">
        <small class="text-textLightColor block text-center mb-3">{{
          $t("product.group.choose_main.description")
        }}</small>

        <div class="flex-1 overflow-y-auto bg-bodyColor rounded-xl h-2/4 p-3">
          <ProductGroupAttributesTable
            :table-data="props.tableData"
            @updateAttrId="updateDefaultId"
          />
        </div>
      </div>

      <UButton
        :label="$t('general.confirm')"
        size="xl"
        class="rounded-xl mx-auto block mt-4 min-w-[40%]"
        :loading="loading"
        @click="changeDefault"
      />
    </GeneralTheModal>
  </div>
</template>

<script setup>
// imports
import { GeneralActionModal } from "#components";

// props
const props = defineProps({
  tableData: {
    type: Object,
    required: true,
  },
});

// i18n
const { t } = useI18n();

// locale route
const localeRoute = useLocaleRoute();

// emit
const emit = defineEmits(["update"]);

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

// modal
const modal = ref(false);

const defaultGroup = ref(null);

// modal
const actionModal = useModal();

const updateDefaultId = (id) => {
  defaultGroup.value = id;
};

const changeDefault = () => {
  fetchData({
    url: `provider/products/change-variant-is-default/${defaultGroup.value}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      _method: "PATCH",
    },
    onSuccess: () => {
      modal.value = false;
      emit("update");

      actionModal.open(GeneralActionModal, {
        actionData: {
          title: t("product.group.choose_main.change_success"),
        },
        onClose: async () => {
          actionModal.close();
          await navigateTo(localeRoute({ name: "products", replace: true }));
        },
      });
    },
  });
};
</script>

<style></style>
