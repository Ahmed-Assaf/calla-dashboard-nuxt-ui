<template>
  <GeneralTheCard
    :ui="{
      base: 'h-fit',
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
    footer
  >
    <ul class="divide-y divide-strokeLightGray">
      <li class="p-6" v-for="i in 5" :key="i">
        <div class="flex items-center gap-3 mb-3">
          <UAvatar
            size="lg"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="user-rate"
            class="outline outline-offset-2 outline-1 outline-offset-[3.5px] outline-strokeLightGray"
          />
          <div>
            <h5 class="font-bukra font-bold text-sm mb-1">
              أسامة محمد عبد الغني تمام
            </h5>

            <div class="flex items-center">
              <UIcon
                name="i-heroicons-star-solid"
                dynamic
                class="text-starActive text-sm"
                v-for="i in 5"
                :key="i"
              />
            </div>
          </div>
        </div>

        <p class="text-xs font-light">
          هذا النص يمكن استبداله هذا النص يمكن استبداله في نفس المساحة هذا النص
          يمكن استبداله هذا النص يمكن استبداله هذا النص يمكن استبداله في نفس
          المساحة هذا النص يمكن استبداله هذا النص يمكن استبداله هذا النص يمكن
          استبداله
        </p>
      </li>
    </ul>

    <template #footer>
      <GeneralThePaginator
        @update:page="$emit('update:page', $event)"
        class="ms-auto my-3"
      />
    </template>
  </GeneralTheCard>
</template>

<script setup>
// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading, resultData: products } = useFetchData();
loading.value = false;

// pagination
const paginateData = ref({});
provide("paginateData", paginateData);

// fetch products
const fetchProducts = (page = 1) => {
  fetchData({
    url: "provider/products/index",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      page,
    },
    onSuccess: () => {
      paginateData.value = products.value.pagination;
    },
  });
};

// on mounted
onMounted(() => {
  fetchProducts();
});
</script>

<style></style>
