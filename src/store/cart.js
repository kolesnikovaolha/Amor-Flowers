import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
  }),
  actions: {
    add(product) {
      this.products = [...this.products, product];
    },
    remove(newProduct) {
      this.products = this.products.filter(
        (product) => product.id !== newProduct.id
      );
    },
  },
  getters: {
    allProducts: (state) => state.products,
    totalCount: (state) => state.products.length,
  },
});
