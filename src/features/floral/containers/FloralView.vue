<template>
  <section class="floral" id="floral">
    <div class="floral__container container">
      <header class="floral__header">
        <h2 class="floral__title">FLORAL SUBSCRIPTION</h2>
      </header>
      <div class="floral__body">
        <figure class="floral__figure">
          <img
            src="@/assets/img/floral-subscription.jpg"
            alt="Floral subscription"
            class="floral__image"
          />
        </figure>
        <div class="floral__content">
          <div class="floral__description">
            <h3 class="floral__subtitle">A Gift That Blooms Again and Again</h3>
            <p class="floral__text">
              Whether you’re looking to brighten a lobby, surprise a loved one,
              or simply enjoy the beauty of fresh flowers year-round - our
              floral subscription service is the perfect choice.
            </p>
            <p class="floral__text">
              Curated by our expert designers, each arrangement is thoughtfully
              crafted and delivered exactly when you need it.
            </p>
            <p class="floral__text">
              Flexible and tailored to your lifestyle, our subscriptions are
              available weekly, biweekly or monthly. Elegant, effortless, and
              always on time - think of us as your personal floral concierge
            </p>
            <p class="floral__important">
              <strong class="floral__important-strong">
                Subscribe today and let timeless beauty arrive at your door -
                again and again.
              </strong>
            </p>
          </div>
          <div class="floral__action">
            <router-link
              class="floral__button button floral__button--mobile"
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
.floral {
  &__body {
    display: flex;
    margin-top: 80px;
    column-gap: 60px;
    @include media-max(1200px) {
      column-gap: 30px;
    }
    @include media-max(768px) {
      flex-direction: column;
      margin-top: 70px;
    }
    @include media-max(576px) {
      margin-top: 80px;
    }
  }
  &__container {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 115px;
      background-image: url('@/assets/icons/venzel.svg');
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
  &__content {
    width: 100%;
    max-width: 625px;
    @include media-max(768px) {
      margin-top: 30px;
    }
  }
  &__description {
    background-color: rgba(#f9d3d8, 0.5);
    border-radius: 16px;
    padding: 20px 15px;
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
    @include subtitle;
    @include media-max(1200px) {
      font-size: 32px;
    }
    @include media-max(992px) {
      font-size: 28px;
      margin-top: 30px;
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
  &__figure {
    display: flex;
    max-height: 710px;
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
    height: auto;
    object-fit: cover;
    @include media-max(768px) {
      height: 100%;
    }
  }
  &__button {
    margin-top: 50px;
    border-radius: 3px;
  }
  &__action {
    @include media-max(768px) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
