import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useFlowerStore = defineStore('flower', {
  state: () => ({
    isLoading: false,
    error: null,
    flower: null,
    isLoadingExtras: false,
    extras: [],
    isLoadingSizes: false,
    sizes: [],
  }),
  actions: {
    updateSize(sizeId) {
      this.flower = {
        ...this.flower,
        sizeId,
      };
    },
    addExtra(extraId) {
      this.flower = {
        ...this.flower,
        extraIds: [...this.flower.extraIds, extraId],
      };
    },
    removeExtra(extraId) {
      this.flower = {
        ...this.flower,
        extraIds: this.flower.extraIds.filter((id) => id !== extraId),
      };
    },
    async loadById(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API}/api/flower/${id}`
        );
        this.flower = response.data;
      } catch (error) {
        this.error = error;
        toast.error('Error loading flower!');
      } finally {
        this.isLoading = false;
      }
    },
    async loadSizesById(id) {
      this.isLoadingSizes = true;
      this.error = null;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API}/api/flower/${id}/sizes`
        );
        this.sizes = response.data;
      } catch (error) {
        this.error = error;
        toast.error('Error loading flower sizes!');
      } finally {
        this.isLoadingSizes = false;
      }
    },
    async loadAllExtras() {
      this.isLoadingExtras = true;
      this.error = null;
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API}/api/flower/extras`
        );
        this.extras = response.data;
      } catch (error) {
        this.error = error;
        toast.error('Error loading flower extras!');
      } finally {
        this.isLoadingExtras = false;
      }
    },
  },
  getters: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectFlower: (state) => state.flower,
    selectAllSizes: (state) => state.sizes,
    selectAllExtras: (state) => state.extras,
    selectFlowerSizePrice(state) {
      return state.sizes.find((size) => size.id === state.flower.sizeId)?.price;
    },
    selectFlowerTotalPrice(state) {
      const quantity = state.flower.quantity;
      const sizePrice = this.selectFlowerSizePrice;
      const extrasSum = state.extras
        .filter((extra) => state.flower.extraIds.includes(extra.id))
        .reduce((sum, extra) => sum + extra.price, 0);
      return (sizePrice + extrasSum) * quantity;
    },
    selectCartFlower(state) {
      return {
        ...state.flower,
        sizes: this.selectAllSizes,
        extras: this.selectAllExtras,
        totalPrice: this.selectFlowerTotalPrice,
      };
    },
  },
});
