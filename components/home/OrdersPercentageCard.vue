<template>
  <div :class="grid">
    <GeneralTheCard :header="{ title: $t('order.percentage') }">
      <div class="flex items-center justify-center relative w-28 mx-auto mb-5">
        <Doughnut
          :data="ordersPercentData"
          :options="options"
          class="w-full h-auto z-[1] relative"
        />
        <h5 class="text-xl absolute font-bukra font-bold">78%</h5>
      </div>

      <div class="flex items-center gap-3 flex-wrap">
        <div class="text-primaryColor bg-primaryLightColor num-card">
          <h6>{{ $t("order.successful") }}</h6>
          <span class="font-bukra font-bold">24</span>
        </div>

        <div class="text-secondaryColor bg-secondaryLightColor num-card">
          <h6>{{ $t("order.unsuccessful") }}</h6>
          <span class="font-bukra font-bold">10</span>
        </div>
      </div>
    </GeneralTheCard>
  </div>
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

  import { Doughnut } from "vue-chartjs";

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

  const props = defineProps({
    grid: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  });

  const ordersPercentData = reactive({
    labels: ["Successful", "Unsuccessful"],
    datasets: [
      {
        backgroundColor: ["#00c2cb", "#FF66C4"],
        data: [50, 50],
      },
    ],
  });
</script>

<style lang="scss" scoped>
  .num-card {
    @apply flex items-center justify-between gap-2 flex-wrap flex-1 flex-shrink-0 py-3 px-3 text-xs rounded-lg leading-tight;
  }
</style>
