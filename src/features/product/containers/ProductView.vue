<template>
  <section class="product">
    <div class="container product__container">
      <div class="product__content">
        <figure class="product__figure">
          <img
            :src="selectedProductCard.primaryImage"
            :alt="selectedProductCard.title"
            class="product__image"
          />
        </figure>
        <figure class="product__figure">
          <img
            :src="selectedProductCard.secondaryImage"
            :alt="selectedProductCard.title"
            class="product__image"
          />
        </figure>
      </div>
      <div class="product__details">
        <h2 class="product__title">{{ selectedProductCard.title }}</h2>
        <h3 class="product__subtitle">Delivery calculated at checkout</h3>
        <p class="product__price">
          {{ selectedProductCardSize.price }}
        </p>

        <h4 class="dozen__subtitle">Size</h4>
        <div class="dozen__buttons">
          <label
            v-for="size in selectedProductCard.size"
            :key="size.value"
            class="dozen__button"
          >
            <input
              class="dozen__input"
              type="radio"
              name="dozen"
              :checked="size.value === selectedProductCardSize.value"
              :value="size.value"
              @change="onChangeProductSize(size)"
            />
            <span>{{ size.name }}</span>
          </label>
        </div>

        <div class="extra">
          <h4 class="extra__title">Add Vase, aquabox or box</h4>
          <div class="extra__action">
            <ProductExtraCard
              v-for="extra in extras"
              :key="extra.id"
              :card="extra"
              :extras="selectedProductCardExtra"
              @add="onAddExtra"
              @remove="onRemoveExtra"
            />
            <span class="extra__total-price">
              Total Price: ${{ selectedProductCardTotalPrice }}
            </span>
          </div>
        </div>

        <div class="order">
          <ul class="order__list">
            <li class="order__link order__link">Free delivery up to 5 miles</li>
            <li class="order__link order__link">
              You can increase the quantity of each item on the cart page
            </li>
            <li class="order__link order__link--last">
              Crafted with care. Inspired by you.
            </li>
          </ul>
          <button class="order__button" @click="addToCart">
            <template v-if="selectedProductCard.soldOut">Sold Out</template>
            <template v-else>Add to Cart</template>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.product {
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
    max-width: 450px;
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
      border: solid 1px #55575e;
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
    color: $secondary-text-color;
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
    margin-top: 20px;
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
    margin-top: 80px;
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
import { ref, computed, reactive } from 'vue';
import { useCartStore } from '@/store/cart';
import { useRoute } from 'vue-router';
// import { useToast } from 'vue-toastification';
import { catalogFlowers } from '@/core/backend/catalogFlowers';
import ProductExtraCard from '@/features/product/components/ProductExtraCard.vue';

const cartStore = useCartStore();
const route = useRoute();
// const toast = useToast();

const productCards = ref(catalogFlowers);
const productCardId = computed(() => +route.params.id);
const selectedProductCard = reactive(
  productCards.value.find(
    (productCard) => productCard.id === productCardId.value
  )
);

console.log(selectedProductCard);

const selectedProductCardSize = ref(selectedProductCard.size[0]);
const onChangeProductSize = (size) => {
  selectedProductCardSize.value = size;
};

const selectedProductCardTotalPrice = computed(() => {
  return (
    selectedProductCardExtraTotalPrice.value +
    parseFloat(selectedProductCardSize.value.price.replace(/[^0-9.]/g, ''))
  );
});
const selectedProductCardExtraTotalPrice = computed(() => {
  return selectedProductCardExtra.value.reduce(
    (prev, curr) => prev + parseFloat(curr.price.replace(/[^0-9.]/g, '')),
    0
  );
});

const extras = ref([
  {
    id: 1,
    name: '6 x 8 Cylinder Vase',
    price: '$25.95',
  },
  {
    id: 2,
    name: '5 x 12 Cylinder Vase',
    price: '$25.95',
  },
  {
    id: 3,
    name: 'Signature Box',
    price: '$25.95',
  },
  {
    id: 4,
    name: 'Aquabox',
    price: '$5.95',
  },
]);
const selectedProductCardExtra = ref([]);
const onAddExtra = (extra) => {
  selectedProductCardExtra.value = [...selectedProductCardExtra.value, extra];
};
const onRemoveExtra = (extra) => {
  selectedProductCardExtra.value = [
    ...selectedProductCardExtra.value.filter(
      (selectedExtra) => selectedExtra.id !== extra.id
    ),
  ];
};

// const isAddToCartDisabled = computed(() => {
//   const isSoldOut = selectedProductCard.soldOut;
//   const isExistsInCart = cartStore.selectAllProducts.some(
//     (product) => product.id === selectedProductCard.id
//   );
//   return isSoldOut || isExistsInCart;
// });

// если карточка одинаковая. то я должен ее добавить но изменить количество
// если карточка другая, то я должен добавить новую карточку в корзину
// если карточка с другим размером, то я должен добавить новую карточку в корзину
// если карточка с другими экстра, то я должен добавить новую карточку в корзину
// если карточка с другим размером и экстра, то я должен добавить новую карточку в корзину
// если карточка с другим размером и экстра, то я должен добавить новую карточку в корзину
// айдишник карточки должен быть уникальным
// я должен создать ключ для карточки, который будет уникальным
// ключ должен состоять из id карточки и размера и экстра
// ключ должен быть в формате id-size-extras
// например: 1-2-3-4
// где 1 - id карточки, 2 - id размера, 3 - id экстра, 4 - id экстра
// я должен создать ключ для карточки, который будет уникальным
// ключ должен состоять из id карточки и размера и экстра
// ключ должен быть в формате id-size-extras
const addToCart = () => {
  //  const getCartItemKey = (flowerId, sizeId, extrasIds = []) =>
  //   `${flowerId}_${sizeId}${extrasIds.length ? '_' + extrasIds.join('_') : ''}`;

  const createKey = (flowerId, sizeId, extrasIds) =>
    `${flowerId}${sizeId}${extrasIds.join('')}`;

  const key = createKey(
    selectedProductCard.id,
    selectedProductCardSize.value.id,
    selectedProductCardExtra.value.map((extra) => extra.id)
  );
  console.log('Generated key:', key);

  const product = {
    ...selectedProductCard,
    key: key,
    size: selectedProductCardSize.value,
    extras: selectedProductCardExtra.value,
  };
  console.log('Adding product to cart:', product);
  cartStore.add(product);
  // toast.success('Product added to cart successfully!');
};
</script>
