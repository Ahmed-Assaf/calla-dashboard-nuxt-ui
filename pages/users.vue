<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('user.plural') }]" />

    <div class="grid grid-cols-12 mb-6">
      <div class="col lg:col-span-7 col-span-12">
        <UserTable @select="fetchUser" ref="userTable" />
      </div>

      <div class="col lg:col-span-5 col-span-12">
        <UserDetailsCard
          :user
          :loading
          @update="fetchUser(user.id)"
          @delete="reloadUsers"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "pages.orders_management",
  permissionId: 5,
});

// user table ref
const userTable = ref(null);

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading, resultData: user } = useFetchData();

// fetch user
const fetchUser = (id, page = 1) => {
  fetchData({
    url: `provider/sub-providers/${id}/show`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      page,
    },
  });
};

const reloadUsers = () => {
  userTable.value.fetchUsers();
};
</script>

<style></style>
