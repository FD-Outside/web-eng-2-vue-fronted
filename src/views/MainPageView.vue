<template>
    <main class="content">
        <h2 class="section-title">Live Aktienkurse</h2>
        <p class="section-description">Wählen Sie eine Aktie aus, um den aktuellen Kurs zu sehen:</p>
        <input v-model="searchQuery" type="text" placeholder="🔍   Suchen Sie nach bestimmten Aktien"
            class="search-bar" />

        <div class="stock-grid">
            <router-link v-for="stock in filteredStocks" :key="stock.symbol" :to="'/' + stock.symbol"
                class="stock-card">
                <h3>{{ stock.symbol }} – {{ stock.name }}</h3>
                <div class="price-container">
                    <p>Kurs: {{ stock.price }} €</p>
                    <p class="daily-change">
                        <font-awesome-icon
                            :icon="['fas', stock.dailyChange > 0 ? 'arrow-up' : stock.dailyChange < 0 ? 'arrow-down' : '']"
                            :style="{ color: stock.dailyChange > 0 ? 'green' : stock.dailyChange < 0 ? 'red' : '#666' }" />
                        {{ stock.dailyChange }}%
                    </p>
                </div>
            </router-link>
            <div v-if="searching" class="stock-card" aria-busy="true">
                <div class="loader-wrapper">
                    <span class="loader"></span>
                </div>
            </div>
        </div>

    </main>
</template>

<script setup lang="ts">
import type { BasicStock, StockResponse, SymbolResponse } from '@/types/apiResponses';
import { apiInstance, fetchDailyPriceAndChange } from '@/utils/wretch';

import { ref, computed, watch } from 'vue';
import type { WretchError } from 'wretch';

const searchQuery = ref('');
const searching = ref(false);

// Sample stock data
const stocks = ref([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.20, dailyChange: 1.45 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 312.55, dailyChange: -2.8 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 125.90, dailyChange: 0 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 132.45, dailyChange: -1.45 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 187.75, dailyChange: 3.52 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 408.15, dailyChange: 1.9 }
]);

const searchResult = ref<BasicStock[]>([])

async function fetchSearchData(newQuery: string) {
    try {
        searching.value = true
        stocks.value = []
        const res = apiInstance.url(`/stock/symbol?name=${newQuery}`).get()
        const data: SymbolResponse = await res.json()
        console.log("Data Recieved", data)
        for (const stock of data.assets) {
            searchResult.value.push(stock)
            const details = await fetchDailyPriceAndChange(stock.symbol)
            if (!details) continue
            stocks.value.push({ ...stock, ...details })
        }
    } catch (error) {
        console.log(error)
        const wretchError = error as WretchError
        console.log(wretchError.message)
    }
    searching.value = false
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, async (newQuery, oldQuery) => {
    if (newQuery.length < 3) return;
    if (debounceTimer) clearTimeout(debounceTimer)

    debounceTimer = setTimeout(() => {
        fetchSearchData(newQuery);
    }, 400)
})


const filteredStocks = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (searchQuery.value === '') return stocks.value;
    return stocks.value.filter(stock =>
        stock.name.toLowerCase().includes(query) ||
        stock.symbol.toLowerCase().includes(query)
    );
});

</script>

<style scoped>
.content {
    width: 100%;
    padding: 2rem;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.section-description {
    margin-bottom: 2rem;
    color: #6b7280;
}

.search-bar {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    margin-bottom: 2rem;
    font-size: 1rem;
}

.stock-grid {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    width: 100%;
}

.stock-card {
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.stock-card:hover {
    transform: translateY(-4px);
}

.stock-card h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.stock-card .price-container {
    display: flex;
    gap: 5%;
}

.stock-card p {
    color: #6b7280;
}

.daily-change {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
}

.loader-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #6b7280;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
