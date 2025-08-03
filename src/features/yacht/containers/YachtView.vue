<template>
  <section class="yacht" id="yacht">
    <div class="yacht__container container">
      <header class="yacht__header">
        <h2 class="yacht__title">YACHT & CRUSING</h2>
      </header>
      <div class="yacht__body">
        <div class="yacht__content">
          <h3 class="yacht__subtitle">Luxury at Sea, Perfected in Blooms</h3>
          <p class="yacht__text">
            Our Yacht & Cruising Floral Services are designed for those who
            embrace the elegance of ocean living.
          </p>
          <p class="yacht__text">
            We offer bespoke floral packages tailored to your vessel’s style -
            from classic arrangements to seasonal themes - ensuring your onboard
            ambiance remains as refined and unique as your journey.
          </p>
          <p class="yacht__text">
            Fresh, elegant, and meticulously curated, our flowers elevate every
            moment at sea.
          </p>
          <p class="yacht__important">
            <strong class="yacht__important-strong">
              Contact us today to discover how our floral artistry can add a
              signature touch of luxury to your yacht or cruise experience.
            </strong>
          </p>
          <router-link
            class="yacht__button button yacht__button--desktop"
            :to="{ path: $route.path, hash: '#contact' }"
          >
            CONTACT
          </router-link>
        </div>
        <div class="yacht__images">
          <figure class="yacht__figure-first">
            <img
              src="@/assets/img/yacht-bouquet.jpeg"
              alt="Yacht bouquet"
              class="yacht__image"
            />
          </figure>
          <figure class="yacht__figure-second">
            <img
              src="@/assets/img/yacht-plates.jpg"
              alt="Yacht plates"
              class="yacht__image yacht__image--plates"
            />
          </figure>
        </div>
        <div class="yacht__action yacht__action--mobile">
          <router-link
            class="yacht__button button yacht__button--mobile"
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
.yacht {
  &__body {
    display: flex;
    margin-top: 80px;
    column-gap: 90px;
    @include media-max(1200px) {
      column-gap: 30px;
    }
    @include media-max(768px) {
      flex-direction: column;
      margin-top: 70px;
    }
    @include media-max(576px) {
      margin-top: 50px;
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
        margin-top: 70px;
      }
      @include media-max(576px) {
        margin-top: 15px;
      }
    }
  }
  &__content {
    width: 100%;
    max-width: 625px;
    @include media-max(768px) {
      margin-top: 30px;
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
      margin-top: 70px;
    }
    @include media-max(576px) {
      font-size: 35px;
      margin-top: 40px;
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
  &__figure-first {
    display: flex;
    max-height: 575px;
    @include media-max(768px) {
      width: 100%;
    }
  }

  &__figure-second {
    display: flex;
    max-height: 575px;
    @include media-max(768px) {
      width: 100%;
    }
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
      margin-top: 40px;
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
