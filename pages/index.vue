<template>
  <GeneralPageHeading :title="[{ label: $t('pages.home') }]">
    <template #end>
      <div class="flex items-center gap-3">
        <label for="receive_new_orders" class="font-bukra font-bold text-xs">
          {{ $t("order.receive_new_orders") }}
        </label>

        <UToggle
          color="primaryColor"
          v-model="receive_new_orders"
          id="receive_new_orders"
        />
      </div>
    </template>
  </GeneralPageHeading>

  <!-- ORDERS AND PRODUCTS STATS -->
  <section>
    <div class="grid grid-cols-12 mb-6" v-if="!loading">
      <div class="col xl:col-span-3 sm:col-span-6 col-span-12">
        <HomeStatisticsCard
          background="bg-primaryLightColor"
          icon-color="bg-primaryColor"
          icon-img="/images/icons/angle-down.svg"
          :data="{
            title: $t('order.received'),
            count: resultData.order_statistics.new_orders,
          }"
        />
      </div>

      <div class="col xl:col-span-3 sm:col-span-6 col-span-12">
        <HomeStatisticsCard
          background="bg-greenLightColor"
          icon-color="bg-greenColor"
          icon-img="/images/icons/sand-clock.svg"
          :data="{
            title: $t('order.active'),
            count: resultData.order_statistics.current_orders,
          }"
        />
      </div>

      <div class="col xl:col-span-3 sm:col-span-6 col-span-12">
        <HomeStatisticsCard
          background="bg-secondaryLightColor"
          icon-color="bg-secondaryColor"
          icon-img="/images/icons/check-circle.svg"
          :data="{
            title: $t('order.completed'),
            count: resultData.order_statistics.finished_orders,
          }"
        />
      </div>

      <div class="col xl:col-span-3 sm:col-span-6 col-span-12">
        <HomeStatisticsCard
          background="bg-orangeLightColor"
          icon-color="bg-orangeColor"
          icon-img="/images/icons/box-filled.svg"
          :data="{
            title: $t('order.products_count'),
            count: resultData.order_statistics.products_count,
          }"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 mb-6" v-else>
      <div
        class="col xl:col-span-3 sm:col-span-6 col-span-12"
        v-for="i in 4"
        :key="i"
      >
        <USkeleton
          class="w-full aspect-[1/.38]"
          :ui="{ rounded: 'rounded-2xl' }"
        />
      </div>
    </div>
  </section>

  <!-- CHARTS AND PROFITS SUMMARY STATS -->
  <section>
    <div class="grid grid-cols-12 mb-6" v-if="!loading">
      <HomeSalesCard :options="options" :grid="gridCols" />

      <HomeOrdersPercentageCard
        :options="options"
        :grid="gridCols"
        :data="resultData.order_percent"
      />

      <HomeProfitsCard :grid="gridCols" :data="resultData.order_profits" />
    </div>

    <div class="grid grid-cols-12 mb-6" v-else>
      <div :class="gridCols" v-for="i in 3" :key="i">
        <USkeleton class="min-h-[254px]" :ui="{ rounded: 'rounded-2xl' }" />
      </div>
    </div>
  </section>

  <!-- best seller products -->
  <section class="grid grid-cols-12 mb-6">
    <div class="col col-span-12">
      <HomeBestSellerProducts />
    </div>
  </section>
</template>

<script setup>
// page meta
definePageMeta({
  title: "pages.home",
});

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = reactive({
  responsive: true,
  maintainAspectRatio: false,
  cutout: 35,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#00c2cb",
      callbacks: {
        title: () => null,
        labelPointStyle: function (context) {
          return {
            pointStyle: null,
            rotation: 0,
          };
        },
      },
    },
  },
});

// grid cols
const gridCols = "col xl:col-span-4 lg:col-span-6 col-span-12";

// page heading
const receive_new_orders = ref(false);

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { resultData, fetchData, loading } = useFetchData();

onMounted(() => {
  fetchData({
    url: "provider/home",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
  });
});
</script>
