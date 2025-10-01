<template>
  <section class="product">
    <div class="container product__container">
      <div v-if="selectIsLoading" class="product__loader">
        <span>Loading...</span>
      </div>
      <template v-if="selectFlower">
        <div class="product__content">
          <figure class="product__figure">
            <img
              :src="selectFlower.primaryImage"
              :alt="selectFlower.title"
              class="product__image"
            />
          </figure>
          <figure class="product__figure" v-if="selectFlower.secondaryImage">
            <img
              :src="selectFlower.secondaryImage"
              :alt="selectFlower.title"
              class="product__image"
            />
          </figure>
        </div>
        <div class="product__details">
          <h2 class="product__title">{{ selectFlower.title }}</h2>
          <h3 class="product__subtitle">Delivery calculated at checkout</h3>
          <p class="product__price">
            ${{ centsToDollars(selectFlowerSizePrice) }}
          </p>

          <h4 class="dozen__subtitle">Size</h4>
          <div class="dozen__buttons">
            <label
              v-for="size in selectAllSizes"
              :key="size.id"
              class="dozen__button"
            >
              <input
                class="dozen__input"
                type="radio"
                name="dozen"
                :checked="size.id === selectFlower.sizeId"
                :value="size.id"
                @change="onChangeFlowerSize(size)"
              />
              <span>{{ size.name }}</span>
            </label>
          </div>

          <div class="extra">
            <h4 class="extra__title">Add Vase, aquabox or box</h4>
            <div class="extra__action">
              <ProductExtraCard
                v-for="extra in selectAllExtras"
                :key="extra.id"
                :card="extra"
                :extraIds="selectFlower.extraIds"
                @add="onAddFlowerExtra"
                @remove="onRemoveFlowerExtra"
              />
              <span class="extra__total-price">
                Total Price: ${{ centsToDollars(selectFlowerTotalPrice) }}
              </span>
            </div>
          </div>

          <div class="order">
            <ul class="order__list">
              <li class="order__link order__link">
                Free delivery up to 5 miles
              </li>
              <li class="order__link order__link">
                You can increase the quantity of each item on the cart page
              </li>
              <li class="order__link order__link--last">
                Crafted with care. Inspired by you.
              </li>
            </ul>
            <button class="order__button" @click="onAddFlowerToCart">
              <template v-if="selectFlower.soldOut">Sold Out</template>
              <template v-else>Add to Cart</template>
            </button>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss">
.product {
  &__loader {
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    display: flex;
    gap: 40px;
    @include media-max(768px) {
      flex-direction: column;
      gap: 0;
    }
  }
  &__content {
    gap: 40px;
    margin-top: 70px;
    @include media-max(768px) {
      display: flex;
      margin-top: 0;
      gap: 25px;
    }
    @include media-max(576px) {
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
    }
  }
  &__figure {
    max-width: 360px;
    overflow: hidden;
    @include media-max(768px) {
      width: 100%;
      aspect-ratio: 1/1;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @include media-max(576px) {
      max-width: 400px;
    }
  }
  &__image {
    display: block;
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 1/1;
    object-fit: cover;
    margin-top: 20px;
  }
  &__details {
    margin-top: 55px;
    @include media-max(1200px) {
    }
  }
  &__title {
    font-size: 30px;
    color: $primary-text-color;
    font-weight: 400;
    margin-top: 30px;
    @include media-max(768px) {
      margin-top: 0;
    }
    @include media-max(576px) {
      font-size: 25px;
    }
  }
  &__subtitle {
    font-size: 20px;
    color: $primary-text-color;
    font-weight: 300;
    margin-top: 20px;
    @include media-max(1200px) {
      font-size: 18px;
    }
    @include media-max(576px) {
      font-size: 16px;
    }
  }
  &__price {
    font-size: 27px;
    color: $secondary-text-color;
    font-weight: 500;
    margin-top: 20px;
    @include media-max(1200px) {
      font-size: 25px;
    }
    @include media-max(576px) {
      font-size: 22px;
    }
  }
}

.dozen {
  &__subtitle {
    font-size: 24px;
    color: $primary-text-color;
    font-weight: 300;
    margin-top: 20px;
    @include media-max(1200px) {
      font-size: 22px;
    }
    @include media-max(576px) {
      font-size: 18px;
    }
  }
  &__buttons {
    margin-top: 30px;
    display: flex;
    gap: 30px;
  }
  &__button {
    display: flex;

    input:checked + span {
      background-color: #e2a4b1;
      // border: solid 1px #55575e;
    }

    span {
      background-color: #d9d9d9;
      color: $secondary-text-color;
      font-size: 22px;
      font-weight: 400;
      padding: 7px 15px;
      border-radius: 2px;
      @include media-max(1200px) {
        padding: 5px 10px;
        font-size: 20px;
      }
      @include media-max(576px) {
        font-size: 18px;
      }

      &:hover {
        background-color: #e2a4b1;
      }
    }
  }
}

.extra {
  margin-top: 50px;
  &__title {
    font-size: 25px;
    color: $primary-text-color;
    font-weight: 400;
    @include media-max(1200px) {
      font-size: 23px;
    }
    @include media-max(992px) {
      font-size: 20px;
    }
    @include media-max(576px) {
      font-size: 17px;
    }
  }
  &__action {
    display: flex;
    flex-direction: column;
    gap: 35px;
    margin-top: 50px;
  }
  &__card {
    display: flex;
    justify-content: space-between;
    &.is-active {
      background-color: rgba(226, 164, 177, 0.3);
    }
  }
  &__total-price {
    font-size: 25px;
    color: #7e0e3b;
    font-weight: 500;
    margin-top: 20px;
    @include media-max(1200px) {
      font-size: 22px;
    }
    @include media-max(576px) {
      font-size: 20px;
    }
  }

  &__card-name {
    font-size: 21px;
    color: $primary-text-color;
    font-weight: 400;
    @include media-max(1200px) {
      font-size: 20px;
    }
    @include media-max(992px) {
      font-size: 18px;
    }
    @include media-max(576px) {
      font-size: 16px;
    }
  }
  &__card-price {
    font-size: 23px;
    color: $primary-text-color;
    font-weight: 500;
    margin-top: 10px;
    @include media-max(1200px) {
      font-size: 20px;
    }
    @include media-max(576px) {
      font-size: 18px;
    }
  }
  &__button {
    display: flex;
    font-size: 22px;
    color: $primary-text-color;
    font-weight: 400;
    border-bottom: solid 1px $secondary-text-color;
    align-self: flex-start;
    @include media-max(1200px) {
      font-size: 20px;
    }
    @include media-max(992px) {
      font-size: 18px;
    }
    @include media-max(576px) {
      font-size: 16px;
    }
  }
}

.order {
  &__list {
    margin-top: 40px;
    @include media-max(1200px) {
      margin-top: 20px;
    }
  }
  &__link {
    display: flex;
    font-size: 22px;
    font-weight: 400;
    color: $primary-text-color;
    margin-top: 10px;
    &--last {
      color: #7e0e3b;
      font-weight: 500;
    }
    @include media-max(1200px) {
      font-size: 19px;
    }
    @include media-max(576px) {
      font-size: 17px;
      margin-top: 10px;
    }
  }
  &__button {
    background-color: #d9d9d9;
    color: $secondary-text-color;
    font-size: 24px;
    font-weight: 500;
    padding: 10px 20px;
    margin-top: 30px;
    border-radius: 2px;
    border: solid 1px transparent;
    transition: all 0.25s ease-in-out;

    &:disabled {
      background: #d9d9d9;
      color: #000;
      cursor: not-allowed;
      opacity: 0.6;
    }

    @include media-max(768px) {
      font-size: 22px;
      margin-top: 60px;
    }

    @include media-max(576px) {
      font-size: 20px;
      margin-top: 30px;
    }
    &:not(:disabled):hover {
      background-color: #e2a4b1;
    }
  }
}
</style>
<script setup>
import ProductExtraCard from '@/features/product/components/ProductExtraCard.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { useFlowerStore } from '@/store/flower';
import { useCartStore } from '@/store/cart';
import { centsToDollars } from '@/core/composables/useCurrency';

const toast = useToast();
const route = useRoute();
const cartStore = useCartStore();
const flowerStore = useFlowerStore();
const {
  selectIsLoading,
  selectFlower,
  selectAllSizes,
  selectAllExtras,
  selectFlowerSizePrice,
  selectFlowerTotalPrice,
  selectCartFlower,
} = storeToRefs(flowerStore);

const onChangeFlowerSize = (size) => {
  flowerStore.updateSize(size.id);
};
const onAddFlowerExtra = (extra) => {
  flowerStore.addExtra(extra.id);
};
const onRemoveFlowerExtra = (extra) => {
  flowerStore.removeExtra(extra.id);
};
/*
раньше была еще такая логика 
// const isAddToCartDisabled = computed(() => {
//   const isSoldOut = selectedProductCard.soldOut;
//   const isExistsInCart = cartStore.selectAllProducts.some(
//     (product) => product.id === selectedProductCard.id
//   );
//   return isSoldOut || isExistsInCart;
// });
я не хочу добавлять одинаковый товар в корзину,
*/
const onAddFlowerToCart = () => {
  // cartStore.add(selectFlower.value);
  cartStore.add(selectCartFlower.value);
  toast.success('Product added to cart successfully!');
};

onMounted(() => {
  flowerStore.loadById(route.params.id);
  flowerStore.loadSizesById(route.params.id);
  flowerStore.loadAllExtras();
});
</script>
