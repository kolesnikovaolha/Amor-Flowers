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
      </ul>
      <div class="footer__social-media">
        <a
          class="footer__social"
          href="https://www.facebook.com/share/1LjPdJfg4h/?mibextid=wwXIfr"
        >
          <svg class="footer__social-icon">
            <use xlink:href="#instagram"></use>
          </svg>
        </a>
        <a
          class="footer__social"
          href="https://www.instagram.com/amor.flowers_fl?igsh=ZG45dTVxOHY3d2o3&utm_source=qrА"
        >
          <svg class="footer__social-icon">
            <use xlink:href="#facebook"></use>
          </svg>
        </a>
        <a class="footer__social" href="#">
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
  padding: 50px 0;
  background-image: url('@/assets/img/footer-removebg-preview.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 100% 0;

  &__title {
    margin-bottom: 15px;
    font-size: 32px;
    color: $primary-text-color;
    font-weight: 300;

    @include media-max(1200px) {
      font-size: 20px;
    }
  }

  &__subtitle {
    margin-bottom: 15px;
    font-size: 24px;
    color: $primary-text-color;
    font-weight: 400;
  }

  &__link {
    font-size: 20px;
    color: $primary-text-color;
    font-weight: 300;
    transition: all 0.3s ease;

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

  &__social {
    display: flex;
    width: 30px;
    height: 30px;
  }
}
</style>
