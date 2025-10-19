import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    flowers: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async loadAllFlowers() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API}/api/flowers`
        );
        this.flowers = response.data;
      } catch (error) {
        this.error = error;
        toast.error('Error loading flowers!');
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectAllFlowers: (state) => state.flowers,
    selectFlowersTotalCount: (state) => state.flowers.length,
    selectFeaturedFlowers: (state) => {
      const ids = [1, 3, 2, 16, 7, 9];
      return ids
        .map((id) => state.flowers.find((flower) => flower.id === id))
        .filter(Boolean);
    },
  },
});
