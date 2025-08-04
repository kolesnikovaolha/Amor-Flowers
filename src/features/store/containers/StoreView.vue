<template>
  <section class="store" id="store">
    <div class="store__container container">
      <h2 class="store__title store__title--page">SHOP</h2>
      <h2 class="store__subtitle store__subtitle--page">
        products {{ storeCardsCount }}
      </h2>

      <div class="store__articles">
        <StoreCard
          v-for="storeCard in storeCards"
          :key="storeCard.id"
          :card="storeCard"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.store {
  &__articles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px 45px;
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
    margin-top: 120px;
    @include media-max(1200px) {
      font-size: 55px;
    }
    @include media-max(992px) {
      font-size: 45px;
    }
    @include media-max(768px) {
      margin-top: 70px;
    }
    @include media-max(576px) {
      font-size: 40px;
    }
  }
  &__title--page {
    margin-top: 60px;
    margin-right: 45px;
  }
  &__subtitle {
    font-size: 24px;
    color: $primary-text-color;
    font-weight: 400;
    margin-bottom: 15px;
    text-align: right;
  }
  &__price {
    font-size: 24px;
    color: $primary-text-color;
    font-weight: 500;
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

const storeCards = ref(catalogFlowers);
const storeCardsCount = computed(() => storeCards.value.length);
</script>
