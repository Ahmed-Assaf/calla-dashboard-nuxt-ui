<template>
  <div :class="grid">
    <GeneralTheCard :header="{ title: $t('sales.this') }">
      <template #header>
        <UButton
          :label="$t('sales.show_reports')"
          :to="localeRoute({ name: 'settings-sales-report' })"
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
  data: {
    type: Array,
    required: true,
  },
});

// locale route
const localeRoute = useLocaleRoute();

// months array
const months = computed(() => {
  const arr = [];
  for (const item of props.data) {
    arr.push(item.month);
  }

  return arr;
});

// order count array
const count = computed(() => {
  const arr = [];
  for (const item of props.data) {
    arr.push(item.order_count);
  }

  return arr;
});

// sales data
const salesData = reactive({
  labels: months.value,
  datasets: [
    {
      // drawActiveElementsOnTop: false,
      backgroundColor: "#FF66C4",
      borderColor: "#FF66C4",
      borderWidth: "2",
      pointBackgroundColor: "#fff",
      pointBorderColor: "#00c2cb",
      pointBorderWidth: "3",
      data: count.value,
    },
  ],
});
</script>
