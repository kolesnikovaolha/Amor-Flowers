<template>
  <section class="basket">
    <div class="container basket__container">
      <div class="basket__title-continue">
        <h2 class="basket__title">YOUR CART</h2>
        <a class="basket__link-shopping">CONTINUE SHOPPING</a>
      </div>

      <div class="basket__cards">
        <BasketCard
          v-for="cartProduct in cartProducts"
          :key="cartProduct.key"
          :product="cartProduct"
          @update="onUpdateProduct"
          @remove="onRemoveProduct"
        />
      </div>

      <form class="basket__form form" @submit.prevent="submitForm">
        <div class="radio__form">
          <label class="radio__option">
            <input
              class="radio__input"
              type="radio"
              name="delivery"
              value="delivery"
              v-model="method"
            />
            Delivery
          </label>
          <label class="radio__option">
            <input
              class="radio__input"
              type="radio"
              name="pickup"
              value="pickup"
              v-model="method"
            />
            Pick-up
          </label>
        </div>

        <div v-if="method === 'delivery'" class="form__group">
          <h3 class="form__group-title">DELIVERY ADDRESS</h3>

          <v-select
            class="form__group-select"
            v-model="selectedAddress"
            :filterable="false"
            :options="selectPredictions"
            :placeholder="'Enter address...'"
            @search="onSearch"
            @option:selected="onSelectAddress"
            label="description"
            :clearable="true"
          >
            <template #no-options>
              <span v-if="isLoading">Loading...</span>
              <span v-else>No matches found</span>
            </template>
          </v-select>
          <div v-if="selectDeliveryFee" class="form__group-delivery">
            <p>Delivery Fee: ${{ selectDeliveryFee }}</p>
          </div>

          <!-- <input
            class="form__group-input"
            type="text"
            id="address"
            name="address"
            required
            placeholder="United States"
            readonly
            value="United States"
          /> -->
          <!-- <div class="form__group-address">
            <input
              class="form__group-input"
              type="text"
              id="address"
              name="address"
              required
              placeholder="Address (line 1)"
            />
          </div>
          <div class="form__group-address">
            <input
              class="form__group-input"
              type="text"
              id="address"
              name="address"
              required
              placeholder="Address (line 2)"
            />
          </div>
          <div class="form__group-address">
            <input
              class="form__group-input"
              type="text"
              id="city"
              name="city"
              required
              placeholder="City"
            />
          </div>
          <div class="form__group-address">
            <input
              class="form__group-input"
              type="text"
              id="zip"
              name="zip"
              required
              placeholder="ZIP code"
            />
          </div> -->
        </div>
        <div v-if="method === 'pickup'" class="pickup">
          <p class="pickup__address">
            Boca Raton studio 9800 Grand Verde Way, Boca Raton, FL 33428
          </p>
        </div>
        <div class="form__group">
          <label class="basket__form-label" for="comment">CARD MESSAGE</label>
          <textarea
            id="comment"
            class="basket__form-textarea"
            placeholder="Enter your message"
            v-model="form.comment"
          ></textarea>
        </div>

        <div class="form__action">
          <button
            class="basket__button button"
            type="submit"
            :disabled="cartIsLoading"
          >
            CHECK OUT
            <template v-if="cartIsLoading">
              <span class="loader"></span>
            </template>
          </button>
        </div>
      </form>

      <!-- <div>
        <label for="address-input">Адрес доставки:</label>
        <input
          id="address-input"
          ref="addressInput"
          type="text"
          placeholder="Введите адрес"
          class="input"
        />
        <div v-if="address">
          <p>
            <b>Выбранный адрес:</b>
            {{ address }}
          </p>
        </div>
        <div id="place-autocomplete"></div>
        <button @click="sendAddress">Передать адрес в Stripe</button>
      </div> -->
    </div>
    <!-- <input
      v-model="query"
      @input="onInput"
      type="text"
      placeholder="Введите адрес"
      class="input"
    /> -->
  </section>
</template>

<style lang="scss">
.basket {
  margin-bottom: 50px;

  &__title-continue {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  }
  &__title {
    font-size: 28px;
    font-weight: 400;
    color: $primary-text-color;
    line-height: 45px;
    @include media-max(1200px) {
      font-size: 26px;
    }
    @include media-max(992px) {
      font-size: 22px;
    }
    @include media-max(576px) {
      font-size: 18px;
    }
  }
  &__extras-item {
    font-size: 17px;
    font-weight: 300;
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

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 24px;
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
      font-size: 18px;
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
    @include media-max(576px) {
      font-size: 18px;
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
    border-radius: 3px;
    @include media-max(1200px) {
      max-width: 170px;
      padding: 5px 20px;
    }
    @include media-max(768px) {
      max-width: 115px;
      gap: 10px;
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
      font-size: 22px;
    }
    @include media-max(768px) {
      font-size: 20px;
    }
    @include media-max(576px) {
      font-size: 18px;
    }
  }
  &__delete {
    display: block;
    margin-top: 50px;
    margin-left: 35px;
    @include media-max(768px) {
      margin-top: 10px;
      margin-left: 35px;
    }
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
      width: 25px;
      height: 25px;
    }
  }
  &__message {
    font-weight: 400;
    line-height: 45px;
  }
  &__form-label {
    display: block;
    margin-bottom: 22px;
    font-size: 18px;
    font-weight: 400;
    color: $primary-text-color;
    margin-top: 50px;
  }
  &__form-textarea {
    display: block;
    width: 100%;
    height: 180px;
    padding: 22px 16px;
    font-size: 20px;
    border: 1px solid #a9a9a9;
    border-radius: 1px;
    background: #fff;
    color: $secondary-text-color;
    resize: none;
    box-sizing: border-box;
    border-radius: 3px;
    @include media-max(992px) {
      height: 120px;
    }
  }
  &__group-delivery {
    margin-top: 20px;
    font-size: 18px;
    color: $primary-text-color;
  }
  &__button {
    margin-top: 50px;
    display: flex;
    align-items: center;
    gap: 12px;

    @include media-max(992px) {
      font-size: 20px;
    }
    @include media-max(768px) {
      font-size: 18px;
    }
  }

  .loader {
    width: 25px;
    height: 25px;
    border: 3px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-flex;
    animation: rotation 1s linear infinite;
  }
  .radio {
    &__form {
      display: flex;
    }
    &__option {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 18px;
      color: $primary-text-color;
    }
    &__input {
      display: block;
      accent-color: #5b2333;
      width: 16px;
      height: 16px;
      cursor: pointer;
      appearance: auto;
      -webkit-appearance: radio;
      margin-left: 20px;
    }
  }
  .form {
    margin-top: 65px;
    width: 100%;
    max-width: 500px;
    &__group-title {
      font-size: 18px;
      color: $primary-text-color;
      margin-top: 40px;
      font-size: 400;
    }
    &__group-input {
      display: block;
      width: 35%;
      min-width: 120px;
      height: 40px;
      padding: 22px 16px;
      font-size: 17px;
      font-weight: 400;
      border: 1px solid #a9a9a9;
      border-radius: 1px;
      background: #fff;
      color: $primary-text-color;
      resize: none;
      box-sizing: border-box;
      margin-top: 10px;
      border-radius: 3px;
      @include media-max(992px) {
        width: 40%;
      }
      @include media-max(768px) {
        width: 70%;
      }
      // @include media-max(576px) {
      //   width: 85%;
      // }
    }

    &__group-delivery {
      margin-top: 15px;
      font-size: 18px;
      color: $primary-text-color;
    }
  }
  .pickup {
    &__address {
      font-size: 20px;
      font-size: 400;
      margin-top: 20px;
      max-width: 200px;
      color: $primary-text-color;
    }
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

<script setup>
import BasketCard from '@/features/basket/components/BasketCard.vue';
import { computed, reactive, ref } from 'vue';
import { useCartStore } from '@/store/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const {
  // selectAddressDetails,
  // selectIsAddressLoading,
  selectPredictions,
  // selectAddressDetails,
  selectDeliveryFee,
  // selectDeliveryMessage,
  // selectIsFeeLoading,
} = storeToRefs(cartStore);

const cartProducts = computed(() => cartStore.selectAllProducts);
const cartIsLoading = computed(() => cartStore.selectIsLoading);

const onUpdateProduct = (product) => {
  cartStore.update(product);
};

const onRemoveProduct = (product) => {
  cartStore.remove(product);
};

const initialFormValue = {
  comment: '',
};
const form = reactive({ ...initialFormValue });
const submitForm = async () => {
  try {
    await cartStore.submitForm({
      products: cartProducts.value,
      comment: form.comment,
      address: selectedAddress.value ? selectedAddress.value.description : '',
    });
    resetForm();
  } catch (error) {
    console.error('Error sending:', error);
  }
};
const resetForm = () => {
  Object.assign(form, initialFormValue);
};

const method = ref('');
const selectedAddress = ref(null);
const options = ref([]);
const isLoading = ref(false);
let timeout = null;

const onSearch = (search) => {
  if (!search) {
    options.value = [];
    return;
  }
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    isLoading.value = true;
    cartStore.fetchFullAddressDetails(search);
  }, 350);
};
const onSelectAddress = (selectedOption) => {
  cartStore.calculateDeliveryFee(selectedOption.description);
};
</script>
