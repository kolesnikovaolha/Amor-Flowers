<template>
  <section class="basket">
    <div class="container basket__container">
      <div class="basket__title-continue">
        <h2 class="basket__title">YOUR CART</h2>
        <a class="basket__link-shopping">CONTINUE SHOPPING</a>
      </div>

      <div
        class="basket__card"
        v-for="cartProduct in cartProducts"
        :key="cartProduct.id"
      >
        <div class="basket__image">
          <span class="basket__span">PRODUCT</span>
          <figure class="basket__card-figure">
            <img
              :src="cartProduct.primaryImage"
              :alt="cartProduct.title"
              class="basket__card-image"
            />
          </figure>
        </div>
        <div class="basket__details">
          <span class="basket__span">QUANITY</span>
          <h3 class="basket__card-title">{{ cartProduct.title }}</h3>
          <p class="basket__card-price">{{ cartProduct.price }}</p>
          <p class="basket__card-size">SIZE: {{ cartProduct.size }}</p>
          <div class="basket__dozen">
            <button class="basket__dozen-button" @click="decrement">-</button>
            <span class="basket__dozen-value">{{ count }}</span>
            <button class="basket__dozen-button" @click="increment">+</button>
          </div>
        </div>
        <div class="basket__product-price">
          <span class="basket__span">TOTAL</span>
          <h3 class="basket__price">${{ totalPrice }}</h3>
          <button class="basket__delete" @click="removeFromCart(cartProduct)">
            <svg
              class="basket__delete-icon"
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M46.4062 10.3125H37.8125V8.59375C37.8125 7.22623 37.2693 5.91472 36.3023 4.94773C35.3353 3.98075 34.0238 3.4375 32.6562 3.4375H22.3438C20.9762 3.4375 19.6647 3.98075 18.6977 4.94773C17.7307 5.91472 17.1875 7.22623 17.1875 8.59375V10.3125H8.59375C8.13791 10.3125 7.70074 10.4936 7.37841 10.8159C7.05608 11.1382 6.875 11.5754 6.875 12.0312C6.875 12.4871 7.05608 12.9243 7.37841 13.2466C7.70074 13.5689 8.13791 13.75 8.59375 13.75H10.3125V44.6875C10.3125 45.5992 10.6747 46.4735 11.3193 47.1182C11.964 47.7628 12.8383 48.125 13.75 48.125H41.25C42.1617 48.125 43.036 47.7628 43.6807 47.1182C44.3253 46.4735 44.6875 45.5992 44.6875 44.6875V13.75H46.4062C46.8621 13.75 47.2993 13.5689 47.6216 13.2466C47.9439 12.9243 48.125 12.4871 48.125 12.0312C48.125 11.5754 47.9439 11.1382 47.6216 10.8159C47.2993 10.4936 46.8621 10.3125 46.4062 10.3125ZM20.625 8.59375C20.625 8.13791 20.8061 7.70074 21.1284 7.37841C21.4507 7.05608 21.8879 6.875 22.3438 6.875H32.6562C33.1121 6.875 33.5493 7.05608 33.8716 7.37841C34.1939 7.70074 34.375 8.13791 34.375 8.59375V10.3125H20.625V8.59375ZM41.25 44.6875H13.75V13.75H41.25V44.6875ZM24.0625 22.3438V36.0938C24.0625 36.5496 23.8814 36.9868 23.5591 37.3091C23.2368 37.6314 22.7996 37.8125 22.3438 37.8125C21.8879 37.8125 21.4507 37.6314 21.1284 37.3091C20.8061 36.9868 20.625 36.5496 20.625 36.0938V22.3438C20.625 21.8879 20.8061 21.4507 21.1284 21.1284C21.4507 20.8061 21.8879 20.625 22.3438 20.625C22.7996 20.625 23.2368 20.8061 23.5591 21.1284C23.8814 21.4507 24.0625 21.8879 24.0625 22.3438ZM34.375 22.3438V36.0938C34.375 36.5496 34.1939 36.9868 33.8716 37.3091C33.5493 37.6314 33.1121 37.8125 32.6562 37.8125C32.2004 37.8125 31.7632 37.6314 31.4409 37.3091C31.1186 36.9868 30.9375 36.5496 30.9375 36.0938V22.3438C30.9375 21.8879 31.1186 21.4507 31.4409 21.1284C31.7632 20.8061 32.2004 20.625 32.6562 20.625C33.1121 20.625 33.5493 20.8061 33.8716 21.1284C34.1939 21.4507 34.375 21.8879 34.375 22.3438Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="basket__form">
        <label class="basket__form-label" for="Comment">CARD MESSAGE</label>
        <textarea
          id="Comment"
          class="basket__form-textarea"
          placeholder="Enter your message"
        ></textarea>
      </div>
      <button class="basket__button button">CHECK OUT</button>
    </div>
  </section>
</template>

<style lang="scss">
.basket {
  &__title-continue {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }
  &__title {
    font-size: 33px;
    font-weight: 400;
    color: $primary-text-color;
    line-height: 45px;
    @include media-max(1200px) {
      font-size: 31px;
    }
    @include media-max(992px) {
      font-size: 29px;
    }
    @include media-max(576px) {
      font-size: 22px;
    }
  }
  &__link-shopping {
    font-size: 20px;
    font-weight: 400;
    color: $primary-text-color;
    line-height: 45px;
    text-decoration: underline;
    text-underline-offset: 3px;
    @include media-max(1200px) {
      font-size: 17px;
    }
    @include media-max(992px) {
      font-size: 16px;
    }
    @include media-max(576px) {
      font-size: 14px;
    }
  }
  &__card {
    display: flex;
    justify-content: space-between;
    @include media-max(576px) {
      flex-direction: column;
    }
  }
  &__span {
    font-size: 18px;
    font-weight: 400;
    color: #8d8282;
    line-height: 45px;
    @include media-max(992px) {
      font-size: 16px;
    }
    @include media-max(576px) {
      font-size: 0px;
    }
  }
  &__card-figure {
    max-width: 200px;
  }
  &__card-image {
    display: block;
    width: 100%;
    height: auto;
  }
  &__card-details {
    padding-left: 250px;
    @include media-max(1200px) {
      padding-left: 140px;
    }
  }
  &__card-title {
    font-size: 30px;
    font-weight: 400;
    color: $primary-text-color;
    line-height: 45px;
    @include media-max(1200px) {
      font-size: 28px;
    }
    @include media-max(992px) {
      font-size: 26px;
    }
    @include media-max(768px) {
      font-size: 22px;
    }
  }
  &__card-price {
    font-size: 22px;
    font-weight: 400;
    color: $secondary-text-color;
    line-height: 45px;
    @include media-max(1200px) {
      font-size: 20px;
    }
    @include media-max(768px) {
      font-size: 20px;
    }
  }
  &__card-size {
    font-size: 15px;
    font-weight: 300;
    color: $primary-text-color;
    line-height: 45px;
  }
  &__dozen {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #888;
    border-radius: 2px;
    background: F3EEEB;
    padding: 7px 20px;
    gap: 40px;
    max-width: 200px;
    margin-top: 20px;
    @include media-max(1200px) {
      max-width: 170px;
      padding: 5px 20px;
    }
    @include media-max(768px) {
      max-width: 140px;
      gap: 20px;
    }
  }
  &__dozen-button {
    background: none;
    border: none;
    font-size: 26px;
    font-weight: 400;
    color: #333;
    width: 36px;
    height: 36px;
    text-align: center;
    transition: background 0.2s;
  }
  &__dozen-value {
    font-size: 24px;
    font-weight: 400;
    color: $primary-text-color;
    font-size: 22px;
    font-weight: 400;

    min-width: 40px;
    text-align: center;
    user-select: none;
  }
  &__price-detail {
    padding-left: 250px;
  }
  &__price {
    font-size: 25px;
    font-weight: 400;
    color: $primary-text-color;
    line-height: 45px;
    @include media-max(1200px) {
      font-size: 23px;
    }
  }
  &__delete {
    display: block;
    margin-top: 50px;
  }
  &__delete-icon {
    width: 40px;
    height: 40px;
    @include media-max(1200px) {
      width: 35px;
      height: 35px;
    }
    @include media-max(992px) {
      width: 32px;
      height: 32px;
    }
    @include media-max(768px) {
      width: 30px;
      height: 30px;
    }
  }
  &__message {
    font-weight: 400;
    line-height: 45px;
  }
  &__form-label {
    display: block;
    margin-bottom: 22px;
    font-size: 1.15rem;
    font-weight: 400;
    color: $secondary-text-color;
    margin-top: 50px;
  }
  &__form-textarea {
    display: block;
    width: 70%;
    min-width: 320px;
    height: 180px;
    padding: 22px 16px;
    font-size: 20px;
    border: 1px solid #000;
    border-radius: 2px;
    background: #fff;
    color: $secondary-text-color;
    resize: none;
    box-sizing: border-box;
    @include media-max(992px) {
      height: 120px;
    }
  }
  &__button {
    margin-top: 50px;
    @include media-max(992px) {
      font-size: 20px;
    }
    @include media-max(768px) {
      font-size: 18px;
    }
  }
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/store/cart';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.load();
});

const cartProducts = computed(() => cartStore.products);

const count = ref(1);
const unitPrice = ref(150);

const totalPrice = computed(() => count.value * unitPrice.value);

const increment = () => {
  count.value++;
};

const decrement = () => {
  if (count.value > 1) count.value--;
};

const removeFromCart = (product) => {
  cartStore.remove(product);
};
</script>
