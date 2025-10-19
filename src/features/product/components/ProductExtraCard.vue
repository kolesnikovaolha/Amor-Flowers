<template>
  <div class="product-extra-card">
    <div class="product-extra-card__content">
      <div class="product-extra-card__info">
        <h2 class="product-extra-card__name">{{ card.name }}</h2>
        <h3 class="product-extra-card__price">
          ${{ centsToDollars(card.price) }}
        </h3>
      </div>
    </div>
    <button class="product-extra-card__button" @click="onToggle()">
      <template v-if="isSelected">Remove</template>
      <template v-else>Add</template>
    </button>
  </div>
</template>

<style lang="scss">
.extra {
  margin-top: 50px;

  &__name {
    font-size: 25px;
    color: $primary-text-color;
    font-weight: 400;
    @include media-max(1200px) {
      font-size: 22px;
    }
    @include media-max(992px) {
      font-size: 20px;
    }
    @include media-max(576px) {
      font-size: 18px;
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
    font-size: 25px;
    color: $primary-text-color;
    font-weight: 400;
    border-bottom: solid 1px $secondary-text-color;
    align-self: flex-start;
    @include media-max(1200px) {
      font-size: 20px;
    }
    @include media-max(992px) {
      font-size: 20px;
    }
    @include media-max(576px) {
      font-size: 18px;
    }
  }
}
</style>
<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { centsToDollars } from '@/core/composables/useCurrency';

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  extraIds: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['add', 'remove']);

const onToggle = () => {
  if (isSelected.value) {
    emit('remove', props.card);
  }
  if (!isSelected.value) {
    emit('add', props.card);
  }
};

const isSelected = computed(() => {
  return props.extraIds.includes(props.card.id);
});
</script>
