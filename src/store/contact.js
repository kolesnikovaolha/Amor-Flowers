import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useContactStore = defineStore('contact', {
  state: () => ({
    isLoading: false,
    error: null,
  }),
  actions: {
    async submitForm(formValue) {
      this.isLoading = true;
      try {
        await axios.post(
          process.env.VUE_APP_CONTACT_GOOGLE_SCRIPT_URL,
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
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
});
