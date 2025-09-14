<template>
  <section class="checkout-success">
    <div class="container checkout-success__container">
      <template v-if="loading">
        <h2 class="checkout-success__title">Checking the payment...</h2>
      </template>

      <template v-else-if="success">
        <h2 class="checkout-success__title">Payment successful!</h2>
        <h3 class="checkout-success__subtitle">
          Thank you for your payment. Your order is being processed.
        </h3>
      </template>

      <template v-else>
        <h2 class="checkout-success__title">
          Payment not found or not completed
        </h2>
      </template>
    </div>
  </section>
</template>

<style lang="scss">
.checkout-success {
  &__title {
    font-size: 50px;
    color: $primary-text-color;
    font-weight: 400;
    text-align: center;
    margin-top: 40px;
    @include media-max(1200px) {
      font-size: 45px;
    }
    @include media-max(992px) {
      font-size: 35px;
    }
    @include media-max(576px) {
      font-size: 30px;
    }
  }
  &__subtitle {
    font-size: 25px;
    margin-top: 40px;
    color: $primary-text-color;
    font-weight: 300;
    text-align: center;
    @include media-max(1200px) {
      font-size: 22px;
    }
    @include media-max(992px) {
      font-size: 20px;
    }
    @include media-max(576px) {
      font-size: 18px;
    }
    @include media-max(576px) {
      margin-top: 40px;
    }
  }
}
</style>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useCartStore } from '@/store/cart';
const toast = useToast();

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();

const loading = ref(true);
const success = ref(false);

onMounted(async () => {
  const sessionId = route.query.session_id;
  if (!sessionId) {
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(
      `${process.env.VUE_APP_API}/api/stripe/checkout-session`,
      {
        params: { session_id: sessionId },
      }
    );
    if (response.data.session.payment_status === 'paid') {
      success.value = true;
      toast.success(
        'Your request has been sent. You will be contacted shortly. Thank you for choosing Amor Flowers.'
      );
      cartStore.submitGoogleMail();
      cartStore.clear();
    }
  } catch (error) {
    // обработка ошибки
  }
  loading.value = false;

  // Чистим query-параметр из адресной строки
  router.replace({ path: '/checkout/success' });

  // Через 5 секунд перенаправляем на главную
  setTimeout(() => {
    router.push({ path: '/' });
  }, 3_000);
});
</script>
