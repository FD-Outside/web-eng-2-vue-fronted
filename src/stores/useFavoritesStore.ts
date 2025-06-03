import type { BackendFavorite, Stock, UserMeResponse } from '@/types/apiResponses';
import { apiInstance, fetchDailyPriceAndChange } from '@/utils/wretch';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Favorite extends Stock {
  id: number
}

interface State {
  favorites: Stock[]
}

async function fetchDeleteFavorite(id: number): Promise<boolean> {
  try {
    const res = apiInstance.url(`/users/me/favorites/${id}`).delete()
    const succesful = await res.json<boolean>()
    return succesful
  } catch (error) {
    console.log(error)
    return false
  }
}

async function createNewFavorite(name: string, symbol: string): Promise<BackendFavorite | null> {
  try {
    const res = apiInstance.url(`/users/me/favorites`).post({
      name,
      symbol
    })
    const backendFavorite = await res.json<BackendFavorite>();
    return backendFavorite
  } catch (error) {
    console.log(error)
    return null
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Favorite[]>([]);

  async function toggleFavorite(stock: Stock): Promise<boolean> {
    const exists = favorites.value.find((f) => f.symbol === stock.symbol)
    if (exists) {
      const success = await fetchDeleteFavorite(exists.id)
      favorites.value = favorites.value.filter((s) => s.symbol !== stock.symbol);
      return success;
    }
    const newBackendFavorite = await createNewFavorite(stock.name, stock.symbol)
    if (!newBackendFavorite) return false
    const newFavorite = { ...newBackendFavorite, ...stock }
    favorites.value.push(newFavorite)
    return true
  }

  function isFavorite(symbol: string) {
    return favorites.value.some((f) => f.symbol === symbol);
  }

  function clearFavorites() {
    favorites.value = []
  }

  async function fetchFavoriteList() {
    try {
      const res = apiInstance.url("/users/me").get()
      const data = await res.json<UserMeResponse>()
      if (data.favorites.length < 1) return
      for (const backendFav of data.favorites) {
        const exists = favorites.value.find(fav => fav.id === backendFav.id)
        if (exists) continue
        const details = await fetchDailyPriceAndChange(backendFav.symbol)
        if (!details) continue
        favorites.value.push({...backendFav, ...details})
      }
    } catch (error) {
      console.log(error)
    }
  }

  fetchFavoriteList()

  return { favorites, toggleFavorite, isFavorite, clearFavorites, fetchFavoriteList}
})

export const oldUseFavoritesStore = defineStore('favorites', {
  state: (): State => ({
    favorites: [],
  }),

  actions: {
    toggleFavorite(stock: Stock) {
      const exists = this.favorites.find((s) => s.symbol === stock.symbol);
      if (exists) {
        this.favorites = this.favorites.filter((s) => s.symbol !== stock.symbol);
      } else {
        this.favorites.push(stock);
      }
    },

    isFavorite(symbol: string): boolean {
      return this.favorites.some((s) => s.symbol === symbol);
    },
  },
});