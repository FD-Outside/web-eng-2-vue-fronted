<template>
    <main class="favorites-page">
      <h2>📌 Deine Favoriten</h2>
      <p class="section-description">Wählen Sie eine Aktie aus, um den aktuellen Kurs zu sehen:</p>
        <input v-model="searchQuery" type="text" placeholder="🔍   Suchen Sie nach bestimmten Aktien" class="search-bar" />
  
      <div v-if="favorites.length === 0">
        <p>Du hast noch keine Favoriten gespeichert.</p>
      </div>
  
      <div v-else class="favorites-grid">
        <router-link
          v-for="stock in filteredFavorites"
          :key="stock.symbol"
          :to="`/${stock.symbol}`"
          class="stock-card"
        >
          <h3>{{ stock.symbol }} – {{ stock.name }}</h3>
          <div class="price-container">
            <p>Kurs: {{ stock.price }} €</p>
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
      </div>
    </main>
</template>
  
<script setup>
  import { ref, computed } from 'vue';
  import { useFavoritesStore } from '@/stores/useFavoritesStore';
  const store = useFavoritesStore();
  

  const searchQuery = ref('');
  const favorites = store.favorites;

  const filteredFavorites = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (query === '') return store.favorites;
      return store.favorites.filter(stock =>
        stock.name.toLowerCase().includes(query) ||
        stock.symbol.toLowerCase().includes(query)
      );
  });
</script>
  
<style scoped>
  .favorites-page {
    padding: 2rem;
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
  
  .favorites-grid {
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
</style>