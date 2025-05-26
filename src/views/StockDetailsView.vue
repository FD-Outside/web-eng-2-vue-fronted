<template>
    <main class="details-container">
        <h2 class="stock-title">{{ symbol }} – {{ stockName }}</h2>
  
        <section class="stock-overview">
            <div class="stock-info">
                <p><strong>Aktueller Kurs:</strong> {{ currentPrice }} $</p>
                <p><strong>Veränderung:</strong> {{ priceChange }}%</p>
                <p><strong>Letztes Update:</strong> {{ lastUpdated }}</p>
            </div>
        </section>
  
        <section class="stock-chart">
            <h3>Kursverlauf</h3>
            <!-- Platzhalter für z. B. Chart.js oder ApexCharts -->
            <div class="chart-placeholder">📈 Hier kommt der Graph hin</div>
        </section>
  
        <section class="stock-details">
            <h3>Weitere Informationen</h3>
            <ul>
                <li><strong>Marktkapitalisierung:</strong> {{ marketCap }}</li>
                <li><strong>Volumen:</strong> {{ volume }}</li>
                <li><strong>52-Wochen-Hoch:</strong> {{ high52w }}</li>
                <li><strong>52-Wochen-Tief:</strong> {{ low52w }}</li>
            </ul>
        </section>
    </main>
</template>
  
<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    
    const route = useRoute();
    const symbol = route.params.symbol;
    
    // Platzhalterwerte – später per API füllen
    const stockName = ref('Firmenname');
    const currentPrice = ref(0);
    const priceChange = ref(0);
    const lastUpdated = ref('–');
    
    const marketCap = ref('–');
    const volume = ref('–');
    const high52w = ref('–');
    const low52w = ref('–');
    
    // Optional: Daten hier per API laden
    onMounted(() => {
        console.log('Lade Daten für', symbol);
    });
</script>
  
<style scoped>
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
</style>
  