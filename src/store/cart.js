import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
  }),
  actions: {
    load() {
      const saved = localStorage.getItem('cart');
      this.products = saved ? JSON.parse(saved) : [];
    },
    add(item) {
      this.products = [...this.products, item];
      localStorage.setItem('cart', JSON.stringify(this.products));
    },
    remove(newProduct) {
      this.products = this.products.filter(
        (product) => product.id !== newProduct.id
      );
      localStorage.setItem('cart', JSON.stringify(this.products));
    },
  },
});
