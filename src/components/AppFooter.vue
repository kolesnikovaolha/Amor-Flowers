<template>
  <footer class="footer" id="footer">
    <div class="footer__container container">
      <h2 class="footer__title">Amor Flowers</h2>
      <h3 class="footer__subtitle">Services</h3>
      <ul class="footer__list">
        <li class="footer__item">
          <router-link
            class="footer__link"
            :to="{ path: $route.path, hash: '#wedding' }"
          >
            Weddings
          </router-link>
        </li>
        <li class="footer__item">
          <router-link
            class="footer__link"
            :to="{ path: $route.path, hash: '#events' }"
          >
            Events
          </router-link>
        </li>
        <li class="footer__item">
          <router-link
            class="footer__link"
            :to="{ path: $route.path, hash: '#home' }"
          >
            Home, Concierge & Corporate Services
          </router-link>
        </li>
        <li class="footer__item">
          <router-link
            class="footer__link"
            :to="{ path: $route.path, hash: '#yacht' }"
          >
            Yachts & Cruising
          </router-link>
        </li>

        <li class="footer__item">
          <router-link
            class="footer__link"
            :to="{ path: $route.path, hash: '#floral' }"
          >
            Floral Subscription
          </router-link>
        </li>
        <li class="footer__item">
          <router-link
            class="footer__link"
            :to="{ path: $route.path, hash: '#bloom' }"
          >
            Bloom & Create
          </router-link>
        </li>
        <li class="footer__item">
          <router-link to="/delivery" class="footer__link">
            Delivery Policy
          </router-link>
        </li>
        <li class="footer__item">
          <router-link to="/taxes" class="footer__link">
            Taxes & Fees
          </router-link>
        </li>
        <li class="footer__item">
          <router-link to="/privacy-policy" class="footer__link">
            Privacy Policy
          </router-link>
        </li>
        <li class="footer__item">
          <router-link to="/terms-conditions" class="footer__link">
            Terms Conditions
          </router-link>
        </li>
        <li class="footer__item">
          <router-link to="/refund" class="footer__link">
            Refund & Return Policy
          </router-link>
        </li>
      </ul>
      <div class="footer__social-media">
        <a
          class="footer__social-link"
          href="https://www.facebook.com/amor.flowers.2025"
          target="_blank"
          rel="noopener"
        >
          <svg class="footer__social-icon">
            <use xlink:href="#facebook"></use>
          </svg>
        </a>
        <a
          class="footer__social-link"
          href="https://www.instagram.com/amor.flowers_fl"
          target="_blank"
          rel="noopener"
        >
          <svg class="footer__social-icon">
            <use xlink:href="#facebook"></use>
          </svg>
        </a>
        <a
          class="footer__social-link"
          href="https://wa.me/15613594911"
          target="_blank"
          rel="noopener"
        >
          <svg class="footer__social-icon">
            <use xlink:href="#whatsapp"></use>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  flex: 0 0 auto;
  padding: 50px 0;
  background-image: url('@/assets/img/footer-removebg-preview.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 100% 0;
  @include media-max(768px) {
    background-size: cover;
  }

  &__title {
    margin-bottom: 15px;
    font-size: 32px;
    color: $primary-text-color;
    font-weight: 300;

    @include media-max(1200px) {
      font-size: 26px;
    }
  }

  &__subtitle {
    margin-bottom: 15px;
    font-size: 24px;
    color: $primary-text-color;
    font-weight: 400;
    @include media-max(1200px) {
      font-size: 22px;
    }
  }

  &__link {
    font-size: 20px;
    color: $primary-text-color;
    font-weight: 300;
    transition: all 0.3s ease;
    @include media-max(1200px) {
      font-size: 18px;
    }

    &:hover {
      color: darken($primary-text-color, 10%);
    }
  }

  &__list {
    margin-bottom: 15px;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &__social-media {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__social-link {
    display: flex;
  }

  &__social-icon {
    display: flex;
    width: 30px;
    height: 30px;
  }
}
</style>
