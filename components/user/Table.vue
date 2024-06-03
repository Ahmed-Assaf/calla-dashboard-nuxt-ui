<template>
  <GeneralTheDataTable class="stripe-table !mb-0" @update:page="fetchUsers">
    <UTable
      :columns="columns"
      :rows="users.sub_providers"
      :loading="loading"
      :loadingState="{ label: $t('general.loading') }"
      :emptyState="{ label: $t('general.no_data') }"
      :ui="{
        wrapper: 'the-data-table hidden-select',
        checkbox: {
          padding: 'hidden',
        },
      }"
      v-model="selectedUser"
      @select="selectUser($event)"
    >
      <template #row_id-data="{ index }">
        <span>{{ index + 1 }}</span>
      </template>

      <template #role_name-data="{ row }">
        {{ locale === "en" ? row.role_name.en : row.role_name.ar }}
      </template>

      <template #avg_rate-data="{ row }">
        <div>
          {{ row.avg_rate }}
          <UIcon
            name="i-heroicons-star-solid"
            dynamic
            class="text-base text-starActive"
          />
        </div>
      </template>

      <template #is_available-data="{ row }">
        <ProductTableStatus
          :status="row.is_available"
          :product-id="row.id"
          @updated="fetchUsers"
        />
      </template>

      <template #actions-data="{ row }">
        <div class="flex items-center gap-2 w-max">
          <!-- delete -->
          <ProductTableDelete :product-id="row.id" @deleted="fetchUsers" />

          <!-- edit -->
          <UButton
            :to="
              localeRoute({
                name: 'products-id',
                params: { id: row.id },
              })
            "
            square
            class="rounded-full"
            size="2xs"
          >
            <img
              src="/images/icons/pen-filled-white.svg"
              :alt="$t('product.edit')"
              class="w-4 h-4"
            />
          </UButton>
        </div>
      </template>
    </UTable>

    <!-- foot data -->
    <template #tfoot>
      <UserAction :button-label="$t('user.create')" @update="fetchUsers" />
    </template>
  </GeneralTheDataTable>
</template>

<script setup>
// loale route
const localeRoute = useLocaleRoute();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// emit
const emit = defineEmits(["select"]);

// fetch data
const { fetchData, loading, resultData: users } = useFetchData();

// i18n
const { t, locale } = useI18n();

// table columns
const columns = computed(() => [
  {
    key: "row_id",
    label: t("general.table.id"),
  },
  {
    key: "id",
    label: t("user.table.id"),
    sortable: true,
  },
  {
    key: "role_name",
    label: t("user.table.job"),
    sortable: true,
  },
  {
    key: "created_at",
    label: t("general.table.date"),
    sortable: true,
  },
]);

const selectedUser = ref([]);

// pagination
const paginateData = ref({});
provide("paginateData", paginateData);

// fetch users
const fetchUsers = (page = 1) => {
  fetchData({
    url: "provider/sub-providers",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      page,
    },
    onSuccess: () => {
      paginateData.value = users.value.pagination;
      selectedUser.value = [users.value?.sub_providers[0]];

      emit("select", users.value?.sub_providers[0].id);
    },
  });
};

// role name
// const role_name = computed(() => {
//   if () return props.user.role_name.en || "";
//   else return props.user.role_name.ar || "";
// });

const selectUser = (row) => {
  selectedUser.value = [row];

  emit("select", row.id);
};

defineExpose({
  fetchUsers,
});

// on mounted
onMounted(() => {
  fetchUsers();
});
</script>

<style></style>
