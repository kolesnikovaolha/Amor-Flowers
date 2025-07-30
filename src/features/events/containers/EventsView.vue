<template>
  <section class="events" id="events">
    <div class="events__container container">
      <div class="events__content">
        <h2 class="events__title">EVENTS</h2>
        <h3 class="events__subtitle">
          Every celebration deserves to bloom beautifully
        </h3>
        <p class="events__text">
          Whether you’re planning an intimate birthday dinner, a lavish holiday
          party, or an unforgettable milestone event, our expert floral
          designers transform your vision into breathtaking reality.
        </p>
        <p class="events__text">
          From exquisite centerpieces and elegant corsages to dramatic table
          runners and custom installations - no detail is too small, no event
          too grand. Let us craft the floral story that makes your next
          celebration truly unforgettable
        </p>
        <a
          href="#contact"
          class="events__button button events__button--desktop"
        >
          CONTACT
        </a>
      </div>
      <div class="events__images">
        <figure class="events__figure-first">
          <img
            src="@/assets/img/events-arch.jpg"
            alt="Events arch"
            class="events__image events__image--arch"
          />
        </figure>
        <figure class="events__figure-second">
          <img
            src="@/assets/img/events-pic-pregnat.jpg"
            alt="Events arch"
            class="events__image events__image--arch"
          />
        </figure>
      </div>
      <div class="events__action events__action--mobile">
        <a href="#contact" class="events__button button">CONTACT</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.events {
  &__container {
    display: flex;
    margin-top: 80px;
    @include media-max(992px) {
      margin-top: 50px;
    }
    @include media-max(768px) {
      flex-direction: column;
      margin-top: 30px;
    }
    @include media-max(576px) {
      margin-top: 15px;
    }
  }
  &__title {
    @include title;
    @include media-max(1200px) {
      font-size: 55px;
    }
    @include media-max(992px) {
      font-size: 45px;
    }
    @include media-max(576px) {
      font-size: 35px;
    }
  }
  &__subtitle {
    @include subtitle;
    margin-top: 40px;
    @include media-max(1200px) {
      font-size: 32px;
    }
    @include media-max(992px) {
      font-size: 26px;
    }
    @include media-max(576px) {
      font-size: 24px;
    }
    @include media-max(576px) {
      margin-top: 40px;
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

  &__images {
    display: flex;
    width: 100%;
    height: auto;
    gap: 40px;
    flex-direction: column;

    @include media-max(768px) {
      display: flex;
      gap: 20px;
      flex-direction: row;
      max-width: none;
    }
    @include media-max(576px) {
      flex-direction: column;
    }
  }
  &__image--arch {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  &__image--sofa {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  &__figure-first {
    width: 100%;
    max-width: 480px;
    @include media-max(768px) {
      margin-top: 15px;
    }
  }
  &__figure-second {
    width: 100%;
    max-width: 480px;
    @include media-max(768px) {
    }
  }
  &__content {
    width: 100%;
    max-width: 665px;
    margin-right: 70px;
    @include media-max(1200px) {
    }
    @include media-max(992px) {
      padding: 0;
    }
  }
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
</style>
