<template>
  <div class="extra__card">
    <div class="extra__card-content">
      <div class="extra__product-info">
        <h2 class="extra__card-name">{{ card.name }}</h2>
        <h3 class="extra__card-price">{{ card.price }}</h3>
      </div>
    </div>
    <button class="extra__button" @click="onToggleExtraButton()">
      {{ isSelected ? 'Remove' : 'Add' }}
    </button>
  </div>
</template>

<style lang="scss">
.extra {
  margin-top: 50px;

  &__card {
    display: flex;
    justify-content: space-between;

    &.is-active {
      background-color: rgba(226, 164, 177, 0.3);
    }
  }

  &__figure {
    max-width: 175px;
  }

  &__icon {
    display: block;
    width: 100%;
  }

  &__card-name {
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
      font-size: 22px;
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

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  extras: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['add', 'remove']);

const onToggleExtraButton = () => {
  if (isSelected.value) {
    emit('remove', props.card);
  }
  if (!isSelected.value) {
    emit('add', props.card);
  }
};

const isSelected = computed(() => {
  return props.extras.some((extra) => extra.id === props.card.id);
});
</script>
