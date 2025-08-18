import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    add(newProduct) {
      const existingProduct = this.products.find(
        (product) => product.key === newProduct.key
      );
      if (existingProduct) {
        newProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + newProduct.quantity,
        };
        this.update(newProduct);
      } else {
        this.products = [...this.products, newProduct];
      }
    },
    update(newProduct) {
      this.products = this.products.map((product) =>
        product.key === newProduct.key ? newProduct : product
      );
    },
    remove(newProduct) {
      this.products = this.products.filter(
        (product) => product.key !== newProduct.key
      );
    },
    async submitForm(formValue) {
      this.isLoading = true;
      try {
        await axios.post(
          process.env.VUE_APP_CART_GOOGLE_SCRIPT_URL,
          formValue,
          {
            adapter: 'fetch',
            fetchOptions: {
              mode: 'no-cors',
            },
          }
        );
        toast.success(
          'Your request has been sent. You will be contacted shortly. Thank you for choosing Amor Flowers.'
        );
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        toast.error('Error sending form!');
        this.error = error;
      }
    },
  },
  getters: {
    selectAllProducts: (state) => state.products,
    selectTotalCount: (state) => state.products.length,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});
