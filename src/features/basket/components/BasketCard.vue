<template>
  <div class="basket-card">
    <div class="basket-card__image">
      <!-- <span class="basket__span">PRODUCT</span> -->
      <figure class="basket-card__figure">
        <img
          class="basket-card__image"
          :src="product.primaryImage"
          :alt="product.title"
        />
      </figure>
    </div>

    <div class="basket-card__details">
      <!-- <span class="basket__span">QUANITY</span> -->
      <h3 class="basket-card__title">{{ product.title }}</h3>
      <p class="basket-card__price">
        ${{ centsToDollars(product.size.price) }}
      </p>
      <p class="basket-card__size">SIZE: {{ product.size.name }}</p>
      <div class="basket-card__extras">
        <ul class="basket-card__extras-list">
          <li
            class="basket-card__extras-item"
            v-for="extra in product.extras"
            :key="extra.id"
          >
            {{ extra.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="basket-card__qty">
      <div class="basket-card__dozen">
        <button class="basket-card__dozen-button" @click="onDecQuantity()">
          -
        </button>
        <span class="basket-card__dozen-value">{{ product.quantity }}</span>
        <button class="basket-card__dozen-button" @click="onIncQuantity()">
          +
        </button>
      </div>
      <button class="basket-card__delete" @click="onRemove()">
        <svg class="basket-card__delete-icon">
          <use xlink:href="#trash"></use>
        </svg>
      </button>
    </div>

    <div class="basket-card__product-price">
      <!-- <span class="basket-card__span">TOTAL</span> -->
      <h3 class="basket-card__price">
        ${{ centsToDollars(productTotalPrice) }}
      </h3>
    </div>
  </div>
</template>

<style lang="scss">
.basket-card {
  display: grid;
  grid-template-columns: 180px 1.5fr 1fr 0.6fr;
  gap: 20px;
  @include media-max(768px) {
    grid-template-columns: auto 1fr auto;
    gap: 16px;
  }
  @include media-max(576px) {
    grid-template-columns: none;
  }
  // display: flex;
  // justify-content: space-between;
  // @include media-max(576px) {
  //   flex-direction: column;
  // }
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
  &__figure {
    max-width: 200px;
    @include media-max(768px) {
      max-width: 185px;
    }
  }
  &__image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  &__details {
    // padding-left: 250px;
    // @include media-max(1200px) {
    //   padding-left: 140px;
    // }
  }
  &__title {
    font-size: 30px;
    font-weight: 400;
    color: $primary-text-color;
    line-height: 45px;
    @include media-max(1200px) {
      font-size: 28px;
    }
    @include media-max(992px) {
      font-size: 26px;
      line-height: 35px;
    }
    @include media-max(768px) {
      font-size: 18px;
      line-height: 25px;
    }
  }
  &__price {
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
  &__size {
    font-size: 15px;
    font-weight: 300;
    color: $primary-text-color;
    line-height: 45px;
  }

  &__qty {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 12px;
    @include media-max(768px) {
      grid-column: 1;
      grid-row: 2;
    }
  }

  &__dozen {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #888;
    border-radius: 2px;
    background: #f3eeeb;
    padding: 7px 20px;
    gap: 4px;
    max-width: 200px;
    // margin-top: 20px;
    @include media-max(1200px) {
      max-width: 170px;
      padding: 5px 20px;
    }
    @include media-max(768px) {
      max-width: 140px;
      gap: 20px;
    }
    @include media-max(576px) {
      gap: 0px;
    }
  }
  &__dozen-button {
    flex-shrink: 0;
    background: none;
    border: none;
    font-size: 26px;
    font-weight: 400;
    color: #333;
    width: 30px;
    height: 30px;
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
  }
  &__price-detail {
    // padding-left: 250px;
  }

  &__product-price {
    @include media-max(768px) {
      grid-column: 3;
    }
  }

  &__price {
    font-size: 25px;
    font-weight: 400;
    color: $primary-text-color;
    line-height: 45px;
    @include media-max(1200px) {
      font-size: 23px;
    }
    @include media-max(576px) {
      font-size: 18px;
    }
  }
  &__delete {
    flex-shrink: 0;
    display: flex;
    // margin-top: 50px;
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
import { defineProps, defineEmits, computed } from 'vue';
import { centsToDollars } from '@/core/composables/useCurrency';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['update', 'remove']);

const productTotalPrice = computed(() => {
  return props.product.totalPrice * props.product.quantity;
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
</script>
