<script setup lang="ts">
import { ref, onMounted, watch, watchEffect, nextTick, watchPostEffect, computed } from 'vue';
import {
  Chart,
  registerables,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import {
  CandlestickController,
  CandlestickElement
} from 'chartjs-chart-financial';
import type { Bar } from '@/types/apiResponses';

// Chart.js + Candlestick registrieren
Chart.register(...registerables);
Chart.register(CandlestickController, CandlestickElement);

const canvasRef = ref<HTMLCanvasElement | null>(null);
const latestPrice = ref<number | null>(null);
const lineChartInstance = ref<Chart | null>(null);
const candleChartInstance = ref<Chart | null>(null);
const chartType = ref<'line' | 'candlestick'>('line');

const { bars, timeframe } = defineProps<{
  bars: Bar[],
  timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly'
}>()

const stockBars = computed(() => bars)

const renderChart = (chartType: "line" | "candlestick") => {
  if (!canvasRef.value) return;

  const labels = stockBars.value.map(bar => {
    const date = new Date(bar.t);
    switch (timeframe) {
      case 'daily':
        return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      case 'weekly': 
      case 'monthly':
        return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
      case 'yearly':
        return date.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit'})
      default:
        return date.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit'})
    }
  });
  console.log(labels)

  if (chartType === 'line') {
    const prices = stockBars.value.map(bar => bar.c);
    lineChartInstance.value = new Chart(canvasRef.value, {
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
  } else if (chartType === 'candlestick') {
    console.log("We go candle sick")
    candleChartInstance.value = new Chart(canvasRef.value, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'Candlestick Chart',
          data: stockBars.value.map(bar => ({
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
            display: true,
          },
          y: {
            display: true
          }
        }
      }
    });
  }

  //latestPrice.value = bars[bars.length - 1].c;
};

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

function prepareRender() {

  if (!bars) return
  if (!mounted.value) return

  lineChartInstance.value?.destroy();

  candleChartInstance.value?.destroy();

  nextTick(() => {
    try {
      renderChart(chartType.value)
    } catch (error) {
      console.log(lineChartInstance.value, candleChartInstance.value)
      lineChartInstance.value?.destroy();
      candleChartInstance.value?.destroy();
    }
  })

}

watch(chartType, () => {
  prepareRender()
});

watch(() => bars, () => {
  console.log("Props watch")
  prepareRender()
})

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
