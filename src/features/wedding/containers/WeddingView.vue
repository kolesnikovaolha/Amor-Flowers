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

      <div class="swiper-wrap">
        <swiper class="swiper" v-bind="swiperOptions" @swiper="onSwiper">
          <swiper-slide
            v-for="swiperSlider of swiperSliders"
            :key="swiperSlider.id"
          >
            <img
              class="swiper__img"
              :src="swiperSlider.src"
              :alt="swiperSlider.alt"
            />
          </swiper-slide>
        </swiper>
        <div class="swiper-wrap__action">
          <button class="swiper-wrap__button" @click="slidePrev">
            <svg class="swiper-wrap__button-icon">
              <use xlink:href="#caret-left"></use>
            </svg>
          </button>
          <button class="swiper-wrap__button" @click="slideNext">
            <svg class="swiper-wrap__button-icon">
              <use xlink:href="#caret-right"></use>
            </svg>
          </button>
        </div>
      </div>

      <router-link
        class="wedding__button button"
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
      margin: 0 auto;
      margin-top: 80px;
      display: block;
      width: 100%;
      height: 115px;
      background-image: url('@/assets/icons/venzel.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
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

  &__button {
    margin: 0 auto;
    margin-top: 30px;
  }

  .swiper-wrap {
    &__action {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
    &__button-icon {
      width: 40px;
      height: 40px;
    }
  }

  .swiper {
    &__img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

const swiperSliders = [
  {
    id: 1,
    src: './img/wedding-bouquet.jpg',
    alt: 'Wedding bouquet',
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
    src: './img/wedding-pres2.jpg',
    alt: 'Wedding presentation 2',
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
