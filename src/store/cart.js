import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { getStripe } from '@/core/stripe/stripe';

const toast = useToast();

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
    comment: null,
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
    clear() {
      this.comment = null;
      this.products = [];
    },
    async submitForm(formValue) {
      this.comment = formValue.comment;
      this.isLoading = true;

      try {
        const stripe = await getStripe();
        // await axios.post(
        //   process.env.VUE_APP_CART_GOOGLE_SCRIPT_URL,
        //   formValue,
        //   {
        //     adapter: 'fetch',
        //     fetchOptions: {
        //       mode: 'no-cors',
        //     },
        //   }
        // );
        const response = await axios.post(
          `${process.env.VUE_APP_API}/create-checkout-session`,
          formValue
        );
        this.isLoading = false;
        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      } catch (error) {
        this.isLoading = false;
        toast.error('Error sending form!');
        this.error = error;
      }
    },
    async submitGoogleMail() {
      await axios.post(
        process.env.VUE_APP_CART_GOOGLE_SCRIPT_URL,
        {
          products: this.products,
          comment: this.comment,
        },
        {
          adapter: 'fetch',
          fetchOptions: {
            mode: 'no-cors',
          },
        }
      );
    },
  },
  getters: {
    selectAllProducts: (state) => state.products,
    selectTotalCount: (state) => state.products.length,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});
