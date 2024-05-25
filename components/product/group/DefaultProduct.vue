<template>
  <div>
    <UButton
      :label="$t('product.group.choose_main.title')"
      variant="outline"
      size="xl"
      class="rounded-xl"
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
// props
const props = defineProps({
  tableData: {
    type: Object,
    required: true,
  },
});

// route
const route = useRoute();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading, resultData } = useFetchData();
loading.value = false;

// modal
const modal = ref(false);

const defaultGroup = ref(null);

const updateDefaultId = (id) => {
  defaultGroup.value = id;
};

const changeDefault = () => {
  fetchData({
    url: `provider/products/change-variant-is-default/${route.query.product_id}?`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      _method: "PATCH",
    },
    getSuccess: true,
    onSuccess: () => {
      modal.value = false;
    },
  });
};
</script>

<style></style>
