<template>
  <aside class="sidebar" :class="{ 'is-active': props.isOpen }">
    <nav class="sidebar__nav">
      <ul class="sidebar__list">
        <li class="sidebar__item">
          <router-link
            class="sidebar__link"
            :to="{ path: '/home', hash: '#about' }"
          >
            ABOUT US
          </router-link>
        </li>
        <li class="sidebar__item">
          <router-link to="/store" class="sidebar__link" @click="closeSidebar">
            SHOP
          </router-link>
        </li>

        <li class="sidebar__item">
          <button class="sidebar__button" @click="onToggleSubmenu">
            SERVICES
            <svg class="sidebar__button-icon">
              <use xlink:href="#arrow-right"></use>
            </svg>
          </button>

          <div
            class="sidebar-submenu"
            :class="{ 'is-active': isSubmenuActive }"
          >
            <button class="sidebar-submenu__button" @click="onToggleSubmenu">
              <svg class="sidebar-submenu__button-icon">
                <use xlink:href="#caret-left"></use>
              </svg>
              SERVICES
            </button>
            <ul class="sidebar-submenu__list">
              <li class="sidebar-submenu__item">
                <router-link
                  :to="{ path: '/', hash: '#wedding' }"
                  class="sidebar__link"
                  @click="closeSidebar"
                >
                  Wedding
                </router-link>
              </li>
              <li class="sidebar-submenu__item">
                <a
                  href="#events"
                  class="sidebar-submenu__link"
                  @click="closeSidebar"
                >
                  Events
                </a>
              </li>
              <li class="sidebar-submenu__item">
                <a
                  href="#home"
                  class="sidebar-submenu__link"
                  @click="closeSidebar"
                >
                  Home Services
                </a>
              </li>
              <li class="sidebar-submenu__item">
                <a href="#yacht" class="sidebar__link" @click="closeSidebar">
                  Yacht & Cruising
                </a>
              </li>
              <li class="sidebar-submenu__item">
                <a
                  href="#floral"
                  class="sidebar-submenu__link"
                  @click="closeSidebar"
                >
                  Floral Subscription
                </a>
              </li>
              <li class="sidebar-submenu__item">
                <a
                  href="#bloom"
                  class="sidebar-submenu__link"
                  @click="closeSidebar"
                >
                  Floral Workshop
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="sidebar__item">
          <a class="sidebar__link" @click.prevent="scrollToSection('contact')">
            CONTACT
          </a>
        </li>
      </ul>
    </nav>
    <div class="sidebar__social">
      <a
        class="sidebar__social-link"
        href="https://www.instagram.com/amor.flowers_fl?igsh=ZG45dTVxOHY3d2o3&utm_source=qrА"
      >
        <svg class="sidebar__social-link-icon">
          <use xlink:href="#instagram"></use>
        </svg>
      </a>
      <a
        class="sidebar__social-link-icon"
        href="https://www.facebook.com/share/1LjPdJfg4h/?mibextid=wwXIfr"
      >
        <svg class="sidebar__social-link-icon">
          <use xlink:href="#facebook"></use>
        </svg>
      </a>
      <a class="sidebar__social-link" href="#">
        <svg class="sidebar__social-link-icon">
          <use xlink:href="#whatsapp"></use>
        </svg>
      </a>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 250;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: calc(100vh - 105px);
  background-color: $primary-background-color;
  transform: translate(-100%);
  visibility: hidden;
  will-change: transform;
  transition: all 0.25s ease-in-out;

  &.is-active {
    transform: translate(0);
    visibility: visible;
  }

  &__nav {
    // padding: 20px;
    flex: 1;
  }

  &__link,
  &__button {
    font-size: 22px;
    font-weight: 400;
    color: #55575e;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.25s ease-in-out;

    &:hover {
      color: #000;
      font-weight: 500;
    }
  }

  &__link-icon,
  &__button-icon {
    width: 15px;
    height: 15px;
  }

  &__item {
    padding: 15px;
    transition: all 0.25s ease-in-out;

    &:hover {
      // background-color: #fbe9e8;
      background-color: #f0e3e1;
    }
  }

  &__social {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px;
    // margin-top: 200px;
    // margin-left: 35px;
  }

  &__social-link {
    display: flex;
    width: 30px;
    height: 30px;
  }

  &__social-link-icon {
    width: 30px;
    height: 30px;
  }
}

.sidebar-submenu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $primary-background-color;
  transform: translate(100%);
  visibility: hidden;
  transition: all 0.25s ease-in-out;
  will-change: transform;

  &.is-active {
    transform: translate(0);
    visibility: visible;
  }

  &__button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    font-size: 18px;
    transition: all 0.25s ease-in-out;

    &:hover {
      background-color: #f0e3e1;
    }
  }

  &__button-icon {
    width: 20px;
    height: 20px;
  }

  &__item {
    padding: 15px;
    transition: all 0.25s ease-in-out;

    &:hover {
      // background-color: #fbe9e8;
      background-color: #f0e3e1;
    }
  }

  &__link {
    font-size: 22px;
    font-weight: 400;
    color: #55575e;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.25s ease-in-out;

    &:hover {
      color: #000;
      font-weight: 500;
    }
  }
}
</style>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  defineProps,
  defineEmits,
  watch,
} from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['close']);

// Следим за изменением isOpen
watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      isSubmenuActive.value = false;
    }
  }
);

const isSubmenuActive = ref(false);
const onToggleSubmenu = () => {
  isSubmenuActive.value = !isSubmenuActive.value;
};

function closeSidebar() {
  // sidebarOpen.value = false;
  emit('close');
}

const isOpen = ref(false);
const dropdown = ref(null);

// function toggleDropdown(event) {
//   console.log(event);
//   isOpen.value = !isOpen.value;
// }

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
