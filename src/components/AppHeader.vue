<template>
  <header class="header">
    <div class="header__container container">
      <button
        class="hamburger hamburger--spring"
        :class="{ 'is-active': sidebarOpen }"
        @click="toggleSidebar"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>

      <AppSidebar :isOpen="sidebarOpen" @close="toggleSidebar" />

      <nav class="header__nav">
        <ul class="header__list">
          <li class="header__item header__item--tablet">
            <router-link
              class="header__link header__link--words"
              :to="{ path: '/', hash: '#about' }"
            >
              About us
            </router-link>
          </li>
          <li class="header__item header__item--tablet">
            <router-link
              class="header__link header__link--words"
              :to="{ path: '/', hash: '#shop' }"
            >
              Shop
            </router-link>
          </li>
          <li class="header__item">
            <router-link to="/" class="header__link">
              <img
                src="@/assets/img/logo-amor-flowers.png"
                alt="Logo"
                class="header__logo"
              />
            </router-link>
          </li>
          <li class="header__item header__item--tablet">
            <div class="dropdown" @click="toggleDropdown" ref="dropdown">
              <button
                class="dropdown-toggle header__link header__link--words header__link--services"
              >
                Services

                <svg class="header__link-icon">
                  <use xlink:href="#arrow-thin-chevron-bottom-icon"></use>
                </svg>
              </button>
              <ul class="header__dropdown" v-show="isOpen">
                <li class="header__dropdown-item">
                  <router-link
                    class="header__dropdown-link"
                    :to="{ path: '/', hash: '#wedding' }"
                  >
                    Wedding
                  </router-link>
                </li>
                <li class="header__dropdown-item">
                  <router-link
                    class="header__dropdown-link"
                    :to="{ path: '/', hash: '#events' }"
                  >
                    Events
                  </router-link>
                </li>
                <li class="header__dropdown-item">
                  <router-link
                    class="header__dropdown-link"
                    :to="{ path: '/', hash: '#home' }"
                  >
                    Home Services
                  </router-link>
                </li>
                <li class="header__dropdown-item">
                  <router-link
                    class="header__dropdown-link"
                    :to="{ path: '/', hash: '#yacht' }"
                  >
                    Yacht & Cruising
                  </router-link>
                </li>
                <li class="header__dropdown-item">
                  <router-link
                    class="header__dropdown-link"
                    :to="{ path: '/', hash: '#floral' }"
                  >
                    Floral Subscription
                  </router-link>
                </li>
                <li class="header__dropdown-item">
                  <router-link
                    class="header__dropdown-link"
                    :to="{ path: '/', hash: '#bloom' }"
                  >
                    Floral Workshop
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="header__item header__item--tablet">
            <router-link
              class="header__link header__link--words"
              :to="{ path: '/', hash: '#contact' }"
            >
              Contact
            </router-link>
          </li>
        </ul>
      </nav>
      <router-link to="/basket" class="header__button">
        <svg class="header__button-icon">
          <use xlink:href="#basket"></use>
        </svg>
        <template v-if="cartTotalCount">
          <span class="header__cart-count">{{ cartTotalCount }}</span>
        </template>
      </router-link>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: relative;
  background-color: #f3eeeb;
  border-bottom: 1px solid #e0c0c3;

  &__container {
    display: flex;

    @include media-max(768px) {
      align-items: center;
    }
  }

  &__nav {
    margin-bottom: 10px;
    width: 100%;
  }

  &__cart-count {
    display: inline-block;
    min-width: 22px;
    height: 22px;
    background: #e2aab0;
    color: #000;
    font-size: 16px;
    border-radius: 50%;
    text-align: center;
    line-height: 22px;
    margin-left: 2px;
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &__item {
    position: relative;

    &--tablet {
      @include media-max(768px) {
        display: none;
      }
    }
  }

  &__link {
    display: flex;
    font-size: 22px;
    font-weight: 400;
    color: $primary-text-color;
    text-transform: uppercase;
    @include media-max(1200px) {
      font-size: 20px;
    }
    @include media-max(992px) {
      font-size: 18px;
    }
    @include media-max(576px) {
      font-size: 15px;
    }
    &:hover {
      color: #000;
      font-weight: 500;
    }
    &--words {
      margin-top: 52px;
      transition: all 0.3s ease-in-out;
      &:hover {
        + .header__dropdown {
          opacity: 1;
        }
      }
    }
  }

  &__link--services {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__link-icon {
    width: 15px;
    height: 15px;
  }

  &__dropdown {
    top: 100%;
    background-color: #f7f2ee;
    position: absolute;
    padding: 24px 24px;
    width: 250px;
    border: 1px solid rgba(#000, 0.2);
    transform: translateY(10px);
    &.is-active {
      display: block;
    }
  }

  &__dropdown-link {
    display: flex;
    font-size: 20px;
    font-weight: 400;
    color: $primary-text-color;
    padding: 10px 0;
    &:hover {
      color: #000;
    }
  }

  &__logo {
    display: block;
    width: 185px;
    height: 95px;
  }

  &__button {
    display: flex;
    padding-top: 55px;

    @include media-max(768px) {
      padding-top: 0;
    }
  }

  &__button-icon {
    width: 32px;
    height: 32px;
  }
}

.hamburger-box {
  display: none;
  @include media-max(768px) {
    display: block;
  }
}
</style>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useCartStore } from '@/store/cart';

const cartStore = useCartStore();

const cartTotalCount = computed(() => cartStore.selectTotalCount);

// const isSubmenuActive = ref(false);
// const onOpenSubmenu = () => {
//   isSubmenuActive.value = !isSubmenuActive.value;
// };

const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
// function closeSidebar() {
//   sidebarOpen.value = false;
// }

const isOpen = ref(false);
const dropdown = ref(null);

function toggleDropdown(event) {
  console.log(event);
  isOpen.value = !isOpen.value;
}

function handleClickOutside(event) {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
