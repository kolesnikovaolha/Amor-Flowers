<template>
  <section class="wedding" id="wedding">
    <div class="wedding__container container">
      <h2 class="wedding__title">WEDDING</h2>
      <p class="wedding__text">
        Let your love story unfold in blooms. From luxurious full-service floral
        design to thoughtfully curated arrangements, our artisans craft every
        petal with elegance and emotion. Begin planning the wedding you’ve
        always dreamed of - with beauty in every detail.
      </p>
      <swiper v-bind="swiperOptions" @swiper="onSwiper">
        <swiper-slide
          v-for="swiperSlider in swiperSliders"
          :key="swiperSlider.id"
        >
          <img
            :src="swiperSlider.src"
            :alt="swiperSlider.alt"
            class="wedding__image"
          />
        </swiper-slide>
      </swiper>
      <div class="swiper__action">
        <button class="swiper__button swiper__button--prev" @click="slidePrev">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.4729 34.777C28.6007 34.9047 28.702 35.0564 28.7711 35.2233C28.8403 35.3902 28.8759 35.5691 28.8759 35.7498C28.8759 35.9305 28.8403 36.1094 28.7711 36.2763C28.702 36.4432 28.6007 36.5949 28.4729 36.7226C28.3452 36.8504 28.1935 36.9517 28.0266 37.0208C27.8597 37.09 27.6808 37.1256 27.5001 37.1256C27.3194 37.1256 27.1405 37.09 26.9736 37.0208C26.8067 36.9517 26.655 36.8504 26.5273 36.7226L12.7773 22.9726C12.6494 22.8449 12.548 22.6933 12.4788 22.5263C12.4096 22.3594 12.374 22.1805 12.374 21.9998C12.374 21.8191 12.4096 21.6402 12.4788 21.4732C12.548 21.3063 12.6494 21.1547 12.7773 21.027L26.5273 7.27698C26.7853 7.01897 27.1352 6.87402 27.5001 6.87402C27.865 6.87402 28.2149 7.01897 28.4729 7.27698C28.7309 7.53498 28.8759 7.88491 28.8759 8.24979C28.8759 8.61466 28.7309 8.96459 28.4729 9.2226L15.694 21.9998L28.4729 34.777Z"
              fill="black"
            />
          </svg>
        </button>
        <button class="swiper__button swiper__button--next" @click="slideNext">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5271 9.22302C15.3993 9.09527 15.298 8.94361 15.2289 8.77669C15.1597 8.60978 15.1241 8.43088 15.1241 8.25021C15.1241 8.06954 15.1597 7.89064 15.2289 7.72373C15.298 7.55681 15.3993 7.40515 15.5271 7.2774C15.6548 7.14965 15.8065 7.04831 15.9734 6.97917C16.1403 6.91003 16.3192 6.87444 16.4999 6.87444C16.6806 6.87444 16.8595 6.91003 17.0264 6.97917C17.1933 7.04831 17.345 7.14965 17.4727 7.2774L31.2227 21.0274C31.3506 21.1551 31.452 21.3067 31.5212 21.4737C31.5904 21.6406 31.626 21.8195 31.626 22.0002C31.626 22.1809 31.5904 22.3598 31.5212 22.5268C31.452 22.6937 31.3506 22.8453 31.2227 22.973L17.4727 36.723C17.2147 36.981 16.8648 37.126 16.4999 37.126C16.135 37.126 15.7851 36.981 15.5271 36.723C15.2691 36.465 15.1241 36.1151 15.1241 35.7502C15.1241 35.3853 15.2691 35.0354 15.5271 34.7774L28.306 22.0002L15.5271 9.22302Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <router-link
        class="button wedding__button"
        :to="{ path: $route.path, hash: '#contact' }"
      >
        CONTACT
      </router-link>
    </div>
  </section>
</template>

<style lang="scss">
.wedding {
  &__container {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 115px;
      background-image: url('@/assets/img/venzel.svg');
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
  &__text {
    @include text;
    text-align: center;
    margin-top: 40px;
    @include media-max(1200px) {
      font-size: 20px;
    }
    @include media-max(992px) {
      font-size: 18px;
      line-height: 30px;
    }
    @include media-max(576px) {
      font-size: 17px;
      margin-top: 30px;
    }
  }
  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__button {
    margin: 0 auto;
    margin-top: 30px;
  }
}
</style>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

const swiperSliders = [
  {
    id: 1,
    src: './img/wedding-pres2.jpg',
    alt: 'Wedding presentation 2',
  },
  {
    id: 2,
    src: './img/wedding-bouquet-lili.jpg',
    alt: 'Wedding bouquet',
  },
  {
    id: 3,
    src: './img/wedding-arch.jpg',
    alt: 'Wedding arch',
  },
  {
    id: 4,
    src: './img/wedding-boq.jpg',
    alt: 'Wedding bouquet',
  },
  {
    id: 5,
    src: './img/wedding-lili.jpg',
    alt: 'Wedding lili bouquet',
  },
  {
    id: 6,
    src: './img/wedding-pres.jpg',
    alt: 'Wedding presentation',
  },
  {
    id: 7,
    src: './img/wedding-bouquet.jpg',
    alt: 'Wedding bouquet',
  },
  {
    id: 8,
    src: './img/wedding-wed.jpg',
    alt: 'Wedding wed bouquet',
  },
];

const swiperInstance = ref(null);
const swiperOptions = ref({
  slidesPerView: 3,
  spaceBetween: 50,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};
const slidePrev = () => {
  swiperInstance.value.slidePrev();
};
const slideNext = () => {
  swiperInstance.value.slideNext();
};
</script>
