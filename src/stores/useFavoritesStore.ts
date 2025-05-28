import { defineStore } from 'pinia';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  dailyChange: number;
}

interface State {
  favorites: Stock[];
}

export const useFavoritesStore = defineStore('favorites', {
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