<template>
  <div class="basket__card">
    <div class="basket__image">
      <span class="basket__span">PRODUCT</span>
      <figure class="basket__card-figure">
        <img
          :src="product.primaryImage"
          :alt="product.title"
          class="basket__card-image"
        />
      </figure>
    </div>
    <div class="basket__details">
      <span class="basket__span">QUANITY</span>
      <h3 class="basket__card-title">{{ product.title }}</h3>
      <p class="basket__card-price">{{ product.price }}</p>
      <p class="basket__card-size">SIZE: {{ product.size.name }}</p>
      <div class="basket__extras">
        <ul class="basket__extras-list">
          <li
            class="basket__extras-item"
            v-for="extra in product.extras"
            :key="extra.id"
          >
            {{ extra.name }}
          </li>
        </ul>
      </div>
      <div class="basket__dozen">
        <button class="basket__dozen-button" @click="onDecQuantity()">-</button>
        <span class="basket__dozen-value">{{ product.quantity }}</span>
        <button class="basket__dozen-button" @click="onIncQuantity()">+</button>
      </div>
    </div>
    <div class="basket__product-price">
      <span class="basket__span">TOTAL</span>
      <h3 class="basket__price">${{ productpriceTotal }}</h3>
      <button class="basket__delete" @click="onRemove()">
        <svg class="basket__delete-icon">
          <use xlink:href="#trash"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.basket {
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
import { defineProps, defineEmits, computed, onMounted } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['update', 'remove']);

const totalPrice = computed(() => {
  const sizePrice = parseFloat(props.product.size.price.replace(/[$,]/g, ''));
  const quantity = props.product.quantity;
  const allExtrasPrice = props.product.extras.reduce(
    (acc, extra) => acc + parseFloat(extra.price.replace(/[$,]/g, '')),
    0
  );
  const total = ((sizePrice + allExtrasPrice) * quantity).toFixed(2);
  return total;
});

const onIncQuantity = () => {
  emit('update', {
    ...props.product,
    quantity: props.product.quantity + 1,
  });
};

const onDecQuantity = () => {
  if (props.product.quantity > 1) {
    emit('update', {
      ...props.product,
      quantity: props.product.quantity - 1,
    });
  }
};

const onRemove = () => {
  emit('remove', props.product);
};

onMounted(() => {
  emit('update', {
    ...props.product,
    priceTotal: totalPrice.value,
  });
});
</script>
