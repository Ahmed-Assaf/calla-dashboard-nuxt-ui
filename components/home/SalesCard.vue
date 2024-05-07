<template>
  <div :class="grid">
    <GeneralTheCard :header="{ title: $t('sales.this') }">
      <template #header>
        <UButton
          :label="$t('sales.show_reports')"
          to="/"
          size="sm"
          :ui="{ rounded: 'rounded-xl' }"
        />
      </template>

      <Line :data="salesData" :options="props.options" />
    </GeneralTheCard>
  </div>
</template>

<script setup>
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";

  import { Line } from "vue-chartjs";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,

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

  const salesData = reactive({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        // drawActiveElementsOnTop: false,
        backgroundColor: "#FF66C4",
        borderColor: "#FF66C4",
        borderWidth: "2",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#00c2cb",
        pointBorderWidth: "3",
        data: [40, 39, 10, 40, 39, 80, 40],
      },
    ],
  });
</script>

<style></style>
