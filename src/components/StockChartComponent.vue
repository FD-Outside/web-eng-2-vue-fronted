<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  Chart,
  registerables,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import {
  CandlestickController,
  CandlestickElement
} from 'chartjs-chart-financial';

// Chart.js + Candlestick registrieren
Chart.register(...registerables);
Chart.register(CandlestickController, CandlestickElement);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const latestPrice = ref<number | null>(null);
const chartInstance = ref<Chart | null>(null);
const chartType = ref<'line' | 'candlestick'>('line');


const bars = ref([
  { t: '2024-05-24T10:00:00Z', o: 150.00, h: 150.60, l: 149.80, c: 150.10 },
  { t: '2024-05-24T10:05:00Z', o: 150.10, h: 150.40, l: 149.90, c: 150.30 },
  { t: '2024-05-24T10:10:00Z', o: 150.30, h: 150.35, l: 149.85, c: 149.90 },
  { t: '2024-05-24T10:15:00Z', o: 149.90, h: 150.90, l: 149.70, c: 150.60 },
  { t: '2024-05-24T10:20:00Z', o: 150.60, h: 151.30, l: 150.50, c: 151.10 },
  { t: '2024-05-24T10:25:00Z', o: 151.10, h: 151.50, l: 150.80, c: 151.20 },
  { t: '2024-05-24T10:30:00Z', o: 151.20, h: 151.70, l: 150.90, c: 151.60 },
  { t: '2024-05-24T10:35:00Z', o: 151.60, h: 152.00, l: 151.20, c: 151.80 },
  { t: '2024-05-24T10:40:00Z', o: 151.80, h: 152.20, l: 151.50, c: 152.00 },
  { t: '2024-05-24T10:45:00Z', o: 152.00, h: 152.50, l: 151.70, c: 152.30 },
  { t: '2024-05-24T10:50:00Z', o: 152.30, h: 152.80, l: 151.90, c: 152.60 }
]);

const renderChart = () => {
  if (!canvasRef.value) return;

  // Vorheriges Chart zerstören
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  if (chartType.value === 'line') {
    const labels = bars.value.map(bar => new Date(bar.t).toLocaleTimeString());
    const prices = bars.value.map(bar => bar.c);
    chartInstance.value = new Chart(canvasRef.value, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Aktienkurs (Linie)',
          data: prices,
          borderColor: 'blue',
          backgroundColor: 'lightblue',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true },
          y: { display: true }
        }
      }
    });
  } else if (chartType.value === 'candlestick') {
    chartInstance.value = new Chart(canvasRef.value, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'Candlestick Chart',
          data: bars.value.map(bar => ({
            x: new Date(bar.t).getTime(),
            o: bar.o,
            h: bar.h,
            l: bar.l,
            c: bar.c
          }))
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute'
            },
            ticks: {
              source: 'auto'
            }
          },
          y: {
            display: true
          }
        }
      }
    });
  }

  latestPrice.value = bars.value[bars.value.length - 1].c;
};

onMounted(renderChart);
watch(chartType, renderChart);
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <label for="chartType" class="mr-2 font-medium">Diagrammtyp: </label>
      <select id="chartType" v-model="chartType" class="border rounded p-1">
        <option value="line">Linienchart</option>
        <option value="candlestick">Candlestick</option>
      </select>
    </div>

    <canvas ref="canvasRef"></canvas>
  </div>
</template>
