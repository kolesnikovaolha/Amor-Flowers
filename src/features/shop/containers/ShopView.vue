<template>
  <section class="shop" id="shop">
    <div class="shop__container container">
      <h2 class="shop__title">SHOP</h2>
      <div class="shop__articles">
        <StoreCard
          v-for="shopCard in displayedShopCards"
          :key="shopCard.id"
          :card="shopCard"
        />
      </div>
      <router-link to="/store" class="shop__button">read more...</router-link>
    </div>
  </section>
</template>

<style lang="scss">
.shop {
  &__container {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 115px;
      background-image: url('@/assets/icons/venzel.svg');
      background-repeat: no-repeat;
      margin: 0 auto;
      background-size: contain;
      background-position: center center;
      margin-top: 80px;
      @include media-max(992px) {
        margin-top: 50px;
      }
      @include media-max(768px) {
        margin-top: 15px;
      }
    }
  }
  &__articles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 20px 50px;
    margin-top: 50px;
    @include media-max(1200px) {
      gap: 20px;
    }
  }
  &__article {
    width: 100%;
    height: 100%;
  }

  &__figure {
    width: 100%;
    position: relative;
  }
  &__image {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 1/1;
    object-fit: cover;
    @include media-max(576px) {
    }
  }
  &__title {
    @include title;
    margin-top: 80px;
    @include media-max(1200px) {
      font-size: 50px;
      margin-top: 50px;
    }
    @include media-max(992px) {
      font-size: 45px;
      margin-top: 30px;
    }
    @include media-max(576px) {
      font-size: 35px;
      margin-top: 15px;
    }
  }
  &__title--page {
    margin-top: 50px;
    margin-right: 45px;
  }
  &__subtitle {
    font-size: 24px;
    color: $primary-text-color;
    font-weight: 400;
    margin-top: 15px;
  }
  &__price {
    font-size: 24px;
    color: $primary-text-color;
    font-weight: 500;
    margin-top: 15px;
  }
  &__button {
    display: block;
    text-align: center;
    font-size: 32px;
    color: $primary-text-color;
    font-weight: 300;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    margin: 0 auto;
    margin-top: 45px;
    &:hover {
      color: $secondary-text-color;
    }
  }
}
</style>

<script setup>
import StoreCard from '@/shared/components/StoreCard.vue';
import { catalogFlowers } from '@/core/backend/catalogFlowers';
import { ref, computed } from 'vue';

const shopCards = ref(catalogFlowers);
const displayedShopCards = computed(() => shopCards.value.slice(0, 6));
</script>
