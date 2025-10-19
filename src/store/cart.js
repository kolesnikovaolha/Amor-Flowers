import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { getStripe } from '@/core/stripe/stripe';

const toast = useToast();

function getProductKey({ id, sizeId, extraIds }) {
  return `${id}_${sizeId}_${extraIds.sort().join('-')}`;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    isLoading: false,
    error: null,
    products: JSON.parse(localStorage.getItem('cartProducts')) || [],
    comment: null,

    addressOptions: [],
    isAddressLoading: false,
    predictions: [],
    addressDetails: [],
    addressTimeout: null,
    deliveryFee: null,
    deliveryMessage: '',
    isFeeLoading: false,
  }),
  actions: {
    add(newProduct) {
      const key = getProductKey({
        id: newProduct.id,
        sizeId: newProduct.sizeId,
        extraIds: newProduct.extraIds,
      });
      newProduct = { ...newProduct, key };

      // const existingProduct = this.products.find(
      //   (product) => product.key === newProduct.key
      // );
      // if (existingProduct) {
      //   newProduct = {
      //     ...existingProduct,
      //     quantity: existingProduct.quantity + newProduct.quantity,
      //   };
      //   this.update(newProduct);
      // } else {
      //   this.products = [...this.products, newProduct];
      // }
      this.products = [...this.products, newProduct];
      localStorage.setItem('cartProducts', JSON.stringify(this.products));
    },
    update(newProduct) {
      this.products = this.products.map((product) =>
        product.key === newProduct.key ? newProduct : product
      );
      localStorage.setItem('cartProducts', JSON.stringify(this.products));
    },
    remove(newProduct) {
      this.products = this.products.filter(
        (product) => product.key !== newProduct.key
      );
      localStorage.setItem('cartProducts', JSON.stringify(this.products));
    },
    clear() {
      this.comment = null;
      this.products = [];
      localStorage.setItem('cartProducts', JSON.stringify(this.products));
    },
    // incQuantity() {
    //   this.flower = {
    //     ...this.flower,
    //     quantity: this.flower.quantity + 1,
    //   };
    // },
    // decQuantity() {
    //   this.flower = {
    //     ...this.flower,
    //     quantity: this.flower.quantity - 1,
    //   };
    // },
    async submitForm(formValue) {
      this.comment = formValue.comment;
      this.isLoading = true;

      try {
        // const responseTest = await axios.post(
        //   `${process.env.VUE_APP_API}/create-checkout-session`,
        //   formValue
        // );
        // console.log('responseTest', responseTest);

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
        console.log('response', response);
        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      } catch (error) {
        this.isLoading = false;
        toast.error('Error sending form!');
        this.error = error;
      }
    },
    // async submitGoogleMail() {
    //   await axios.post(
    //     process.env.VUE_APP_CART_GOOGLE_SCRIPT_URL,
    //     {
    //       products: this.products,
    //       comment: this.comment,
    //     },
    //     {
    //       adapter: 'fetch',
    //       fetchOptions: {
    //         mode: 'no-cors',
    //       },
    //     }
    //   );
    // },
    async searchAddresses(query) {
      if (!query || query.length < 3) {
        this.addressOptions = [];
        return;
      }
      clearTimeout(this.addressTimeout);
      this.isAddressLoading = true;
      this.addressTimeout = setTimeout(async () => {
        try {
          const res = await axios.get(
            `${process.env.VUE_APP_API}/api/autocomplete`,
            { params: { input: query } }
          );
          this.addressOptions = res.data;
        } catch (e) {
          this.addressOptions = [];
        } finally {
          this.isAddressLoading = false;
        }
      }, 350);
    },
    clearAddressOptions() {
      this.addressOptions = [];
    },

    async fetchFullAddressDetails(input) {
      if (!input) {
        this.predictions = [];
        this.addressDetails = null;
        this.error = null;
        return;
      }
      this.isLoading = true;
      this.error = null;
      try {
        const res = await axios.get(
          `${process.env.VUE_APP_API}/api/full-address-details`,
          { params: { input } }
        );
        this.predictions = res.data.predictions;
        this.addressDetails = res.data.details;
      } catch (err) {
        this.predictions = [];
        this.addressDetails = null;
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },

    async calculateDeliveryFee(address) {
      this.isFeeLoading = true;
      this.deliveryFee = null;
      this.deliveryMessage = '';
      try {
        const res = await axios.post(
          `${process.env.VUE_APP_API}/api/delivery-fee`,
          { userAddress: address }
        );
        this.deliveryFee = res.data.fee;
        this.deliveryMessage = res.data.message;
      } catch (e) {
        this.deliveryFee = null;
        // this.deliveryMessage = 'Ошибка при расчёте доставки';
      } finally {
        this.isFeeLoading = false;
      }
    },
    clearFee() {
      this.deliveryFee = null;
      this.deliveryMessage = '';
    },
  },
  getters: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectAllProducts: (state) => state.products,
    selectTotalCount: (state) => state.products.length,

    selectAddressOptions: (state) => state.addressOptions,
    selectIsAddressLoading: (state) => state.isAddressLoading,
    selectPredictions: (state) => state.predictions,
    selectAddressDetails: (state) => state.addressDetails,
    selectDeliveryFee: (state) => state.deliveryFee,
    selectDeliveryMessage: (state) => state.deliveryMessage,
    selectIsFeeLoading: (state) => state.isFeeLoading,
  },
});
