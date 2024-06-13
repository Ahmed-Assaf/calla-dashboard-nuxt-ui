<template>
  <GeneralTheCard :header="{ title: $t('product.best_seller') }">
    <template #header>
      <div class="flex gap-4" v-if="resultData.sales?.length && !loading">
        <UButton
          @click="carousel.prev()"
          variant="soft"
          color="secondary"
          square
          class="rounded-full w-10 h-10 min-h-fit"
          size="xl"
        >
          <UAvatar
            :src="`/images/icons/arrow-${arrowLeft}-secondary.svg`"
            size="xs"
          />
        </UButton>

        <UButton
          @click="carousel.next()"
          variant="soft"
          color="secondary"
          square
          class="rounded-full w-10 h-10 min-h-fit"
          size="xl"
        >
          <UAvatar
            :src="`/images/icons/arrow-${arrowRight}-secondary.svg`"
            size="xs"
          />
        </UButton>
      </div>
    </template>

    <div class="flex items-center overflow-hidden" v-if="loading">
      <div
        class="w-full px-3 snap-start xl:basis-2/12 lg:basis-3/12 sm:basis-1/3 basis-1/2 flex-shrink-0 overflow-hidden"
        v-for="i in 6"
        :key="i"
      >
        <USkeleton
          :ui="{ rounded: 'rounded-2xl' }"
          class="h-2 mx-auto w-3/4 mb-2"
        />
        <USkeleton
          :ui="{ rounded: 'rounded-2xl' }"
          class="h-5 mx-auto w-1/4 mb-4"
        />
        <USkeleton
          :ui="{ rounded: 'rounded-2xl' }"
          class="w-3/4 mx-auto aspect-[1/1.1] overflow-hidden flex items-center justify-center my-3"
        />
        <USkeleton :ui="{ rounded: 'rounded-2xl' }" class="h-2 mb-2" />
        <div class="flex items-center justify-between gap-3">
          <USkeleton :ui="{ rounded: 'rounded-2xl' }" class="h-4 w-1/4 mb-4" />
          <USkeleton :ui="{ rounded: 'rounded-2xl' }" class="h-4 w-4 mb-4" />
        </div>
      </div>
    </div>

    <UCarousel
      v-else
      :items="resultData.sales"
      :ui="{
        item: 'snap-start xl:basis-2/12 lg:basis-3/12 sm:basis-1/3 basis-1/2 overflow-hidden',
      }"
      ref="carousel"
    >
      <template #default="{ item }">
        <ProductItemCard :item="item" />
      </template>
    </UCarousel>

    <GeneralEmptyData v-if="!resultData.sales?.length && !loading" />
  </GeneralTheCard>
</template>

<script setup>
const carousel = ref("");

const { locale } = useI18n();

const arrowRight = computed(() => (locale.value === "en" ? "right" : "left"));
const arrowLeft = computed(() => (locale.value === "en" ? "left" : "right"));

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, loading, resultData } = useFetchData();

// fetch products
const fetchProducts = async () => {
  await fetchData({
    url: "provider/products/sales",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
  });
};

onMounted(async () => {
  await fetchProducts();
});
</script>
