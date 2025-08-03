<template>
  <section class="home" id="home">
    <div class="home__container container">
      <header class="home__header">
        <h2 class="home__title">HOME, CONCIERGE & CORPORATE SERVICES</h2>
      </header>
      <div class="home__body">
        <div class="home__images">
          <figure class="home__figure-first">
            <img
              src="@/assets/img/home-pic.jpg"
              alt="Home"
              class="home__image"
            />
          </figure>
          <figure class="home__figure-second">
            <img
              src="@/assets/img/home-flowers.jpg"
              alt="Home mirror"
              class="home__image"
            />
          </figure>
        </div>
        <div class="home__content">
          <h3 class="home__subtitle">
            Enhance Every Guest Experience with Signature Floral Elegance
          </h3>
          <p class="home__text">
            When your guests’ loved ones stay at one of our affiliated
            properties, we coordinate directly with the concierge to ensure
            seamless, same-day delivery of fresh, elegant blooms - right to
            their room.
          </p>
          <p class="home__text">
            As a preferred floral partner along Florida’s East Coast, we offer
            exclusive house account billing and 15% off every order. Our mission
            is simple: to elevate your guest experience and make your hotel
            shine through thoughtful, luxurious floral touches.
          </p>
          <p class="home__text">
            From grand lobby arrangements to charming restaurant accents, our
            bespoke floral subscription service brings life, beauty, and delight
            to every space - leaving a lasting impression on every guest.
          </p>
          <p class="home__important">
            <strong class="home__important-strong">
              Contact us today to discover how we can help you create
              unforgettable moments through the power of flowers.
            </strong>
          </p>
          <div class="home__action">
            <router-link
              class="home__button button"
              :to="{ path: $route.path, hash: '#contact' }"
            >
              CONTACT
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.home {
  &__body {
    display: flex;
    column-gap: 90px;
    margin-top: 80px;
    @include media-max(1200px) {
      column-gap: 30px;
    }
    @include media-max(768px) {
      flex-direction: column;
      margin-top: 70px;
    }
    @include media-max(576px) {
      margin-top: 15px;
    }
  }
  &__container {
    &::after {
      content: '';
      display: block;
      width: 100%;
      max-width: 855px;
      height: 160px;
      background-image: url('@/assets/img/venzel.svg');
      background-repeat: no-repeat;
      margin: 0 auto;
      background-size: contain;
      background-position: center center;
      margin-top: 120px;
      @include media-max(768px) {
        margin-top: 15px;
      }
    }
  }
  &__content {
    width: 100%;
    @include media-max(768px) {
      margin-top: 30px;
    }
  }
  &__figure-first {
    display: flex;
    max-height: 580px;
  }
  &__figure-second {
    display: flex;
    max-height: 660px;
  }
  &__images {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    max-width: 515px;

    @include media-max(768px) {
      flex-direction: row;
      max-width: none;
    }
    @include media-max(576px) {
      flex-direction: column;
      margin-top: 40px;
    }
  }
  &__image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    @include media-max(768px) {
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
      font-size: 35px;
      margin-top: 15px;
    }
  }
  &__subtitle {
    @include subtitle;
    @include media-max(1200px) {
      font-size: 32px;
    }
    @include media-max(992px) {
      font-size: 28px;
    }
    @include media-max(576px) {
      font-size: 25px;
    }
  }
  &__text {
    @include text;
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
    }
  }
  &__important {
    @include important;
    margin-top: 40px;
    @include media-max(1200px) {
      font-size: 24px;
    }
    @include media-max(768px) {
      font-size: 20px;
    }
  }

  &__important-strong {
    font-weight: 400;
  }
  &__action {
    @include media-max(768px) {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70px;
    }
  }
  &__button {
    margin-top: 80px;
    @include media-max(576px) {
      margin-top: 0px;
    }
  }
}
</style>

<script setup></script>
