<template>
  <section class="bloom" id="bloom">
    <div class="container">
      <header class="bloom__header">
        <h2 class="bloom__title">
          BLOOM & CREATE - FLORAL WORKSHOPS FOR ALL AGES
        </h2>
      </header>
      <div class="bloom__body">
        <div class="bloom__content">
          <h3 class="bloom__subtitle">
            Looking to add a unique, hands-on experience to your next event?
            Bloom & Create offers creative floral design workshops that bring
            beauty and fun to any occasion - from birthday parties and bridal
            showers to corporate events and family celebrations.
          </h3>
          <p class="bloom__text">
            Led by a professional florist, each workshop is tailored to your
            audience - whether it’s a playful session for kids or a relaxing
            creative break for adults. Guests will learn how to craft their own
            bouquet or floral arrangement and take home a piece of natural art.
          </p>
          <p class="bloom__text bloom__text-list">Workshop Highlights:</p>
          <ul class="bloom__list">
            <li class="bloom__item">Available for kids & adults</li>
            <li class="bloom__item">
              Perfect for holidays, celebrations, or team- building
            </li>
            <li class="bloom__item">All materials included</li>
            <li class="bloom__item">Custom themes & group sizes</li>
          </ul>

          <p class="bloom__important">
            1.5-hour workshops available for groups of 10 or more.
          </p>
          <p class="bloom__important">
            Make your event bloom. Contact us today to book your workshop!
          </p>

          <div class="bloom__action bloom__action--desktop">
            <router-link
              class="bloom__button button bloom__button--desktop"
              :to="{ path: $route.path, hash: '#contact' }"
            >
              CONTACT
            </router-link>
          </div>
        </div>
        <figure class="bloom__figure">
          <img
            src="@/assets/img/bloom-pic.jpeg"
            alt="Bloom creating"
            class="bloom__image"
          />
        </figure>
        <div class="bloom__action bloom__action--mobile">
          <router-link
            class="bloom__button button bloom__button--mobile"
            :to="{ path: $route.path, hash: '#contact' }"
          >
            CONTACT
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.bloom {
  &__body {
    display: flex;
    margin-top: 45px;
    column-gap: 60px;
    @include media-max(1200px) {
      column-gap: 30px;
    }
    @include media-max(768px) {
      flex-direction: column;
      margin-top: 70px;
    }
    @include media-max(576px) {
      margin-top: 45px;
    }
  }
  &__content {
    width: 100%;

    @include media-max(768px) {
      margin-top: 30px;
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
  &__subtitle {
    font-size: 25px;
    color: $primary-text-color;
    font-weight: 400;

    @include media-max(1200px) {
      font-size: 22px;
    }
    @include media-max(992px) {
      font-size: 20px;
    }
    @include media-max(768px) {
      font-size: 18px;
    }
    @include media-max(576px) {
      font-size: 16px;
    }
  }
  &__text {
    font-size: 22px;
    color: $primary-text-color;
    font-weight: 300;
    line-height: 33px;
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
    font-size: 23px;
    color: $primary-text-color;
    font-weight: 400;
    @include media-max(1200px) {
      font-size: 19px;
    }
    @include media-max(992px) {
      font-size: 17px;
    }
    @include media-max(768px) {
      font-size: 15px;
    }
  }
  &__important-strong {
    font-weight: 400;
  }
  &__text-list {
    margin-bottom: 20px;
  }
  &__item {
    font-size: 21px;
    color: $primary-text-color;
    font-weight: 300;
    margin-bottom: 15px;
    line-height: 33px;
    @include media-max(1200px) {
      font-size: 19px;
    }
    @include media-max(992px) {
      font-size: 17px;
    }
  }
  &__list {
    list-style-type: disc;
    margin-left: 20px;
  }
  &__figure {
    display: flex;
    @include media-max(992px) {
      width: 100%;
    }
    @include media-max(768px) {
      width: 100%;
    }
  }
  &__image {
    display: block;
    width: 100%;
    max-width: 900px;
    height: auto;
    object-fit: cover;
    @include media-max(992px) {
      width: 100%;
    }
    @include media-max(768px) {
      height: 100%;
    }
  }
  &__button {
    margin-top: 80px;

    &--desktop {
      @include media-max(768px) {
        display: none;
      }
    }
  }
  &__action {
    &--mobile {
      display: none;
      @include media-max(768px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
