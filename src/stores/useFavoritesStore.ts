import type { Stock } from '@/types/apiResponses';
import { apiInstance } from '@/utils/wretch';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Favorite extends Stock {
  id: number
}

interface BackendFavorite {
  id: number
  symbol: string
  name: string
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
    if(!newBackendFavorite) return false
    const newFavorite = {...newBackendFavorite, ...stock}
    favorites.value.push(newFavorite)
    return true
  }

  function isFavorite(symbol: string) {
    return favorites.value.some((f) => f.symbol === symbol);
  }

  return { favorites, toggleFavorite, isFavorite }
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