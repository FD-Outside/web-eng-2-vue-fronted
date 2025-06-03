<template>
    <main class="details-container">
        <div class="title-container">
            <h2 class="stock-title">{{ symbol }} - {{ name }}</h2>
            <div class="favorite-button" @click="toggleFavorite">
                <i :class="isFav ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
            </div>
        </div>
        <section class="stock-overview">
            <div class="stock-info">
                <p><strong>Aktueller Kurs:</strong> {{ currentPrice }}€</p>
                <p><strong>Veränderung:</strong> {{ priceChange }}%</p>
                <p><strong>Höchster Preis:</strong> {{ highestPrice }}€</p>
                <p><strong>Niedrigster Preis:</strong> {{ lowestPrice }}€</p>
                <p><strong>Letztes Update:</strong> {{ lastUpdated }}</p>
            </div>
        </section>

        <section class="stock-chart">
            <h3>Kursverlauf</h3>
            <StockChartComponent :bars="chartBars"></StockChartComponent>
        </section>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router';
import StockChartComponent from '../components/StockChartComponent.vue';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useUserStore } from '@/stores/useUserStore';
import { apiInstance } from '@/utils/wretch';
import type { Bar, StockResponse } from '@/types/apiResponses';

const route = useRoute();
const symbol = route.params.symbol instanceof Array ? route.params.symbol[0] : route.params.symbol

const name = (route.query.name instanceof Array?  route.query.name[0] : route.query.name) ?? "Name not given"

const router = useRouter()

const userStore = useUserStore()

const currentPrice = ref(0);
const priceChange = ref(0);
const highestPrice = ref(0);
const lowestPrice = ref(0);
const lastUpdated = ref('–');

const chartBars = ref<Bar[]>([])

async function fetchBars(timeframe: "daily" | "weekly" | "monthly" | "yearly", symbol: string) {
    try {
        const res = apiInstance.url(`/stock/${timeframe}?symbol=${symbol}`).get()
        const data = await res.json<StockResponse>();
        if(data.bars.length < 1) return
        console.log(data)
        const latestBar = data.bars[data.bars.length - 1]
        const oldBar = data.bars[0]
        currentPrice.value = latestBar.c
        highestPrice.value = Math.max(...data.bars.map(bar => bar.h));
        lowestPrice.value = Math.min(...data.bars.map(bar => bar.l));
        priceChange.value = Number((((latestBar.c - oldBar.c) / oldBar.c) * 100).toPrecision(4))
        lastUpdated.value = latestBar.t //can be updated to actual formatted time
        chartBars.value = data.bars
    } catch (error) {
        console.log(error)
    }
}

fetchBars("daily", symbol)

const store = useFavoritesStore();

const isFav = computed(() => store.isFavorite(symbol));
const toggleFavorite = async () => {

    if(!userStore.token) {
        alert("Logge dich ein um Favoriten zu speichern")
        router.push("/login")
        return
    }

    const success = await store.toggleFavorite({
        symbol,
        name: name,
        price: currentPrice.value,
        dailyChange: priceChange.value
    });
    if (!success) return
};
</script>

<style scoped>
.title-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.details-container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 1rem;
}

.stock-title {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}

.stock-overview {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
}

.stock-chart {
    margin-bottom: 2rem;
}

.chart-placeholder {
    background-color: #e5e7eb;
    height: 300px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-size: 1.2rem;
}

.stock-details ul {
    list-style: none;
    padding: 0;
}

.stock-details li {
    margin-bottom: 0.5rem;
}

.favorite-button {
    font-size: 1.5rem;
    cursor: pointer;
    text-align: right;
    margin-bottom: 1rem;
}

.favorite-button .fa-solid {
    color: #fbbf24;
}

.favorite-button .fa-regular {
    color: #ccc;
}
</style>