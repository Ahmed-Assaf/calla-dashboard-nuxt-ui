<template>
  <ClientOnly>
    <!-- ORDERS AND PRODUCTS STATS -->
    <section class="grid grid-cols-12 mb-6">
      <div class="col col-span-3">
        <HomeStatisticsCard
          background="bg-primaryLightColor"
          icon-color="bg-primaryColor"
          icon-img="/images/icons/angle-down.svg"
        />
      </div>

      <div class="col col-span-3">
        <HomeStatisticsCard
          background="bg-greenLightColor"
          icon-color="bg-greenColor"
          icon-img="/images/icons/sand-clock.svg"
        />
      </div>

      <div class="col col-span-3">
        <HomeStatisticsCard
          background="bg-secondaryLightColor"
          icon-color="bg-secondaryColor"
          icon-img="/images/icons/check-circle.svg"
        />
      </div>

      <div class="col col-span-3">
        <HomeStatisticsCard
          background="bg-orangeLightColor"
          icon-color="bg-orangeColor"
          icon-img="/images/icons/box-filled.svg"
        />
      </div>
    </section>

    <!-- CHARTS AND PROFITS SUMMARY STATS -->
    <section class="grid grid-cols-12 mb-6">
      <HomeSalesCard :options="options" :grid="gridCols" />

      <HomeOrdersPercentageCard :options="options" :grid="gridCols" />

      <HomeProfitsCard :grid="gridCols" />
    </section>

    <!-- CHARTS AND PROFITS SUMMARY STATS -->
    <section class="grid grid-cols-12 mb-6">
      <HomeBestSellerProducts />
    </section>
  </ClientOnly>
</template>

<script setup>
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

  import { Line, Doughnut } from "vue-chartjs";

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

  const gridCols = "col col-span-4";
</script>
