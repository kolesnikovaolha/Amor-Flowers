<template>
  <router-link :to="`/product/${card.id}`">
    <article class="store-card">
      <div class="store-card__image-wrapper">
        <figure
          class="store-card__figure"
          :class="{ 'is-soldout': card.soldOut }"
        >
          <img
            :src="card.primaryImage"
            :alt="card.title"
            class="store-card__image"
          />
        </figure>
        <div v-if="card.soldOut" class="store-card__soldout">Sold out</div>
        <div v-if="card.sale" class="store-card__sale">
          <span class="store-card__sale-label">Sale</span>
          <span class="store-card__sale-label">Sale</span>
          <span class="store-card__sale-label">Sale</span>
          <span class="store-card__sale-label">Sale</span>
          <span class="store-card__sale-label">Sale</span>
        </div>
      </div>
      <h3 class="store-card__title">{{ card.title }}</h3>
      <div class="store-card__prices">
        <p v-if="card.sale" class="store-card__old-price">{{ card.price }}</p>
        <p class="store-card__new-price">{{ card.price }}</p>
      </div>
    </article>
  </router-link>
</template>

<style lang="scss">
.store-card {
  &__article {
    width: 100%;
    height: 100%;
  }
  &__image-wrapper {
    position: relative;
  }
  &__figure {
    width: 100%;
    position: relative;

    &.is-soldout {
      opacity: 0.5;
    }
  }
  &__image {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  &__soldout {
    position: absolute;
    left: 16px;
    bottom: 16px;
    background-color: #000;
    padding: 5px 10px;
    border-radius: 14px;
    letter-spacing: 0.5px;
    z-index: 2;
    @include typography(
      (
        size: 1.2rem,
        color: #ffffff,
      )
    );
  }

  &__sale {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5b2333;
    padding: 5px 0;
    gap: 18px;
    flex-wrap: nowrap;
    width: 100%;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;

    @include typography(
      (
        size: 1.2rem,
        color: #ffffff,
      )
    );
  }
  &__title {
    margin-top: 15px;
    @include typography(
      (
        size: 24px,
        color: $primary-text-color,
      )
    );
  }
  &__prices {
    display: flex;
    align-items: center;
  }
  &__old-price {
    margin-top: 10px;
    margin-right: 20px;
    text-decoration: line-through;
    @include typography(
      (
        size: 24px,
        color: $secondary-text-color,
      )
    );
  }
  &__new-price {
    margin-top: 15px;
    @include typography(
      (
        size: 24px,
        weight: 500,
      )
    );
  }
}
</style>
<script setup>
import { defineProps } from 'vue';

defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>
