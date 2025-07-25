<template>
  <router-link :to="`/product/${card.id}`">
    <article class="store-card">
      <figure class="store-card__figure">
        <img
          :src="card.primaryImage"
          :alt="card.title"
          class="store-card__image"
        />
      </figure>
      <h3 class="store-card__title">{{ card.title }}</h3>
      <p class="store-card__price">{{ card.price }}</p>
    </article>
  </router-link>
</template>

<style lang="scss">
.store-card {
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
  }
  &__title {
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
