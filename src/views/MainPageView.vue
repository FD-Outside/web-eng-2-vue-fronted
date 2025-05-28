<template>
    <main class="content">
        <link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
        </link>
        <h2 class="section-title">Live Aktienkurse</h2>
        <p class="section-description">Wählen Sie eine Aktie aus, um den aktuellen Kurs zu sehen:</p>
        <input v-model="searchQuery" type="text" placeholder="🔍   Suchen Sie nach bestimmten Aktien"
            class="search-bar" />

        <grid class="stock-grid">
            <router-link v-for="stock in filteredStocks" :key="stock.symbol" :to="'/' + stock.symbol"
                class="stock-card">
                <h3>{{ stock.symbol }} – {{ stock.name }}</h3>
                <div class="price-container">
                    <p>Kurs: {{ stock.price }} $</p>
                    <p class="daily-change">
                        <i :class="[
                                'fa-solid',
                                stock.dailyChange > 0 ? 'fa-arrow-up' : stock.dailyChange < 0 ? 'fa-arrow-down' : ''
                            ]" 
                            :style="{
                                color: stock.dailyChange > 0 ? 'green' : stock.dailyChange < 0 ? 'red' : '#666'
                            }"
                        ></i>
                        {{ stock.dailyChange }}%
                    </p>
                </div>
            </router-link>
        </grid>
        
    </main>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

// Sample stock data
const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.20, dailyChange: 1.45 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 312.55, dailyChange: -2.8 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 125.90, dailyChange: 0 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 132.45, dailyChange: -1.45 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 187.75, dailyChange: 3.52 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 408.15, dailyChange: 1.9 }
];


const filteredStocks = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (searchQuery.value === '') return stocks;
    return stocks.filter(stock =>
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
</style>
