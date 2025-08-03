<template>
  <header class="header">
    <div class="header__container container">
      <button
        class="hamburger hamburger--spring js-hamburgerBtn"
        :class="{ 'is-active': sidebarOpen }"
        @click="toggleSidebar"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
      <div class="sidebar js-sidebar" :class="{ 'is-open': sidebarOpen }">
        <nav class="sidebar__nav">
          <ul class="sidebar__list">
            <li class="sidebar__item">
              <a
                href="#about"
                class="sidebar__link"
                @click="closeSidebar"
                @click.prevent="scrollToSection('about')"
              >
                ABOUT US
              </a>
            </li>
            <li class="sidebar__item">
              <router-link
                to="/store"
                class="sidebar__link"
                @click="closeSidebar"
              >
                SHOP
              </router-link>
            </li>
            <li class="sidebar__item">
              <div class="sidebar-submenu__content">
                <button class="sidebar__link" @click="onOpenSubmenu">
                  SERVICES
                  <svg
                    class="sidebar__link-icon"
                    width="800px"
                    height="800px"
                    viewBox="-4.5 0 20 20"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-305.000000, -6679.000000)"
                        fill="#000000"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M249.365851,6538.70769 L249.365851,6538.70769 C249.770764,6539.09744 250.426289,6539.09744 250.830166,6538.70769 L259.393407,6530.44413 C260.202198,6529.66364 260.202198,6528.39747 259.393407,6527.61699 L250.768031,6519.29246 C250.367261,6518.90671 249.720021,6518.90172 249.314072,6519.28247 L249.314072,6519.28247 C248.899839,6519.67121 248.894661,6520.31179 249.302681,6520.70653 L257.196934,6528.32352 C257.601847,6528.71426 257.601847,6529.34685 257.196934,6529.73759 L249.365851,6537.29462 C248.960938,6537.68437 248.960938,6538.31795 249.365851,6538.70769"
                            id="arrow_right-[#336]"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </button>
                <ul
                  class="sidebar-submenu"
                  :class="{ 'is-active': isSubmenuActive }"
                >
                  <li class="sidebar-submenu__item">
                    <a
                      href="#wedding"
                      class="sidebar-submenu__link"
                      @click="closeSidebar"
                      @click.prevent="scrollToSection('wedding')"
                    >
                      Wedding
                    </a>
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
                    <a
                      href="#yacht"
                      class="sidebar__link"
                      @click="closeSidebar"
                    >
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
              <a
                class="sidebar__link"
                @click.prevent="scrollToSection('contact')"
              >
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
        <div class="sidebar__social-media">
          <a class="sidebar__social sidebar__instagram" href="#">
            <svg
              width="44"
              height="41"
              viewBox="0 0 44 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.4488 11.3125C20.4871 11.3125 18.5695 11.8513 16.9384 12.8609C15.3074 13.8704 14.0361 15.3053 13.2854 16.9841C12.5347 18.6629 12.3383 20.5102 12.721 22.2924C13.1037 24.0746 14.0483 25.7116 15.4354 26.9965C16.8225 28.2814 18.5898 29.1565 20.5138 29.511C22.4378 29.8655 24.432 29.6835 26.2444 28.9881C28.0567 28.2928 29.6058 27.1152 30.6956 25.6043C31.7854 24.0934 32.3672 22.3171 32.3672 20.5C32.3644 18.0641 31.3186 15.7287 29.4591 14.0063C27.5996 12.2838 25.0785 11.315 22.4488 11.3125ZM22.4488 26.625C21.141 26.625 19.8626 26.2658 18.7752 25.5928C17.6878 24.9197 16.8403 23.9631 16.3399 22.8439C15.8394 21.7247 15.7085 20.4932 15.9636 19.3051C16.2187 18.1169 16.8485 17.0256 17.7732 16.169C18.698 15.3124 19.8761 14.729 21.1588 14.4927C22.4414 14.2564 23.7709 14.3777 24.9792 14.8412C26.1874 15.3048 27.2201 16.0899 27.9467 17.0971C28.6732 18.1044 29.061 19.2886 29.061 20.5C29.061 22.1245 28.3644 23.6824 27.1243 24.831C25.8843 25.9797 24.2025 26.625 22.4488 26.625ZM32.3672 0.59375H12.5304C9.46249 0.59679 6.52116 1.72706 4.3518 3.73656C2.18245 5.74605 0.962266 8.47064 0.958984 11.3125V29.6875C0.962266 32.5294 2.18245 35.2539 4.3518 37.2634C6.52116 39.2729 9.46249 40.4032 12.5304 40.4062H32.3672C35.4351 40.4032 38.3764 39.2729 40.5458 37.2634C42.7151 35.2539 43.9353 32.5294 43.9386 29.6875V11.3125C43.9353 8.47064 42.7151 5.74605 40.5458 3.73656C38.3764 1.72706 35.4351 0.59679 32.3672 0.59375ZM40.6325 29.6875C40.6325 31.7181 39.7617 33.6655 38.2116 35.1013C36.6616 36.5371 34.5592 37.3438 32.3672 37.3438H12.5304C10.3383 37.3438 8.23601 36.5371 6.68596 35.1013C5.13591 33.6655 4.26511 31.7181 4.26511 29.6875V11.3125C4.26511 9.28194 5.13591 7.33454 6.68596 5.89871C8.23601 4.46289 10.3383 3.65625 12.5304 3.65625H32.3672C34.5592 3.65625 36.6616 4.46289 38.2116 5.89871C39.7617 7.33454 40.6325 9.28194 40.6325 11.3125V29.6875ZM35.6733 10.5469C35.6733 11.0012 35.5278 11.4452 35.2554 11.8229C34.9829 12.2007 34.5957 12.4951 34.1426 12.6689C33.6895 12.8428 33.1909 12.8882 32.7099 12.7996C32.2289 12.711 31.7871 12.4922 31.4403 12.171C31.0936 11.8498 30.8574 11.4405 30.7617 10.995C30.6661 10.5494 30.7152 10.0876 30.9028 9.6679C31.0905 9.2482 31.4083 8.88948 31.8161 8.63709C32.2239 8.38471 32.7033 8.25 33.1937 8.25C33.8513 8.25 34.482 8.49199 34.947 8.92274C35.412 9.35349 35.6733 9.93771 35.6733 10.5469Z"
                fill="black"
              />
            </svg>
          </a>
          <a class="sidebar__social sidebar__faceebook" href="#">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0.5C16.1433 0.5 12.3731 1.64366 9.16639 3.78634C5.95963 5.92903 3.46027 8.97451 1.98436 12.5377C0.508449 16.1008 0.122284 20.0216 0.874696 23.8043C1.62711 27.5869 3.4843 31.0615 6.21143 33.7886C8.93855 36.5157 12.4131 38.3729 16.1957 39.1253C19.9784 39.8777 23.8992 39.4916 27.4623 38.0156C31.0255 36.5397 34.071 34.0404 36.2137 30.8336C38.3564 27.6269 39.5 23.8567 39.5 20C39.4945 14.83 37.4383 9.87322 33.7826 6.21745C30.1268 2.56167 25.1701 0.50546 20 0.5ZM21.5 36.4306V24.5H26C26.3978 24.5 26.7794 24.342 27.0607 24.0607C27.342 23.7794 27.5 23.3978 27.5 23C27.5 22.6022 27.342 22.2206 27.0607 21.9393C26.7794 21.658 26.3978 21.5 26 21.5H21.5V17C21.5 16.2044 21.8161 15.4413 22.3787 14.8787C22.9413 14.3161 23.7044 14 24.5 14H27.5C27.8978 14 28.2794 13.842 28.5607 13.5607C28.842 13.2794 29 12.8978 29 12.5C29 12.1022 28.842 11.7206 28.5607 11.4393C28.2794 11.158 27.8978 11 27.5 11H24.5C22.9087 11 21.3826 11.6321 20.2574 12.7574C19.1322 13.8826 18.5 15.4087 18.5 17V21.5H14C13.6022 21.5 13.2207 21.658 12.9393 21.9393C12.658 22.2206 12.5 22.6022 12.5 23C12.5 23.3978 12.658 23.7794 12.9393 24.0607C13.2207 24.342 13.6022 24.5 14 24.5H18.5V36.4306C14.2715 36.0446 10.3546 34.0433 7.56395 30.8431C4.77334 27.6428 3.32389 23.4899 3.5171 19.2482C3.7103 15.0065 5.53129 11.0025 8.60128 8.0692C11.6713 5.13586 15.7539 3.49895 20 3.49895C24.2461 3.49895 28.3288 5.13586 31.3987 8.0692C34.4687 11.0025 36.2897 15.0065 36.4829 19.2482C36.6761 23.4899 35.2267 27.6428 32.4361 30.8431C29.6455 34.0433 25.7285 36.0446 21.5 36.4306Z"
                fill="black"
              />
            </svg>
          </a>
          <a class="sidebar__social sidebar__watsapp" href="#">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.1711 23.1575L25.1711 20.1575C24.9349 20.0398 24.6719 19.9865 24.4085 20.003C24.1452 20.0194 23.8908 20.1051 23.6711 20.2512L20.9167 22.0887C19.6523 21.3937 18.6118 20.3531 17.9167 19.0887L19.7542 16.3344C19.9004 16.1147 19.9861 15.8603 20.0025 15.597C20.019 15.3336 19.9657 15.0706 19.848 14.8344L16.848 8.83438C16.7236 8.58326 16.5314 8.37199 16.2932 8.22452C16.0549 8.07705 15.7801 7.99927 15.4999 8C13.5107 8 11.6031 8.79018 10.1966 10.1967C8.79004 11.6032 7.99986 13.5109 7.99986 15.5C8.00482 19.8745 9.74481 24.0685 12.8381 27.1618C15.9314 30.2551 20.1253 31.995 24.4999 32C25.4848 32 26.46 31.806 27.37 31.4291C28.2799 31.0522 29.1067 30.4997 29.8032 29.8033C30.4996 29.1069 31.0521 28.2801 31.429 27.3701C31.8059 26.4602 31.9999 25.4849 31.9999 24.5C32.0001 24.2213 31.9226 23.9481 31.7762 23.711C31.6299 23.4739 31.4203 23.2822 31.1711 23.1575ZM24.4999 29C20.9207 28.996 17.4892 27.5724 14.9583 25.0416C12.4274 22.5107 11.0038 19.0792 10.9999 15.5C10.9996 14.4596 11.3598 13.4512 12.0192 12.6465C12.6787 11.8418 13.5966 11.2904 14.6167 11.0863L16.7692 15.3987L14.9374 18.125C14.8005 18.3303 14.7164 18.5663 14.6925 18.8119C14.6686 19.0575 14.7057 19.3053 14.8005 19.5331C15.8737 22.0838 17.9029 24.113 20.4536 25.1863C20.6822 25.2852 20.9318 25.3258 21.1799 25.3042C21.428 25.2826 21.6669 25.1995 21.8749 25.0625L24.6142 23.2362L28.9267 25.3888C28.721 26.4101 28.1672 27.3284 27.3599 27.987C26.5526 28.6456 25.5417 29.0036 24.4999 29ZM19.9999 0.5C16.6332 0.499266 13.3238 1.37017 10.3936 3.02793C7.4634 4.68569 5.01233 7.07385 3.27893 9.95994C1.54554 12.846 0.58889 16.1317 0.502089 19.4972C0.415289 22.8627 1.2013 26.1934 2.78361 29.165L0.655487 35.5494C0.479208 36.078 0.453626 36.6452 0.581608 37.1875C0.70959 37.7298 0.986078 38.2258 1.38008 38.6198C1.77409 39.0138 2.27004 39.2903 2.81235 39.4183C3.35466 39.5462 3.9219 39.5207 4.45049 39.3444L10.8349 37.2163C13.4501 38.6072 16.3478 39.3841 19.308 39.488C22.2683 39.5919 25.2134 39.02 27.9196 37.8157C30.6259 36.6115 33.0222 34.8065 34.9268 32.5379C36.8313 30.2693 38.194 27.5965 38.9113 24.7226C39.6287 21.8487 39.682 18.8491 39.067 15.9516C38.452 13.054 37.185 10.3346 35.3622 7.99984C33.5393 5.66506 31.2085 3.77623 28.5467 2.47673C25.8849 1.17723 22.962 0.501215 19.9999 0.5ZM19.9999 36.5C17.0992 36.502 14.2494 35.7381 11.7386 34.2856C11.5548 34.179 11.3504 34.1127 11.139 34.091C10.9276 34.0694 10.714 34.0929 10.5124 34.16L3.49986 36.5L5.83799 29.4875C5.90539 29.286 5.92921 29.0725 5.90787 28.8611C5.88654 28.6497 5.82054 28.4452 5.71424 28.2612C3.89543 25.1167 3.16519 21.4598 3.63679 17.8579C4.10839 14.256 5.75547 10.9104 8.32253 8.34011C10.8896 5.76981 14.2331 4.11851 17.8344 3.64236C21.4357 3.1662 25.0935 3.89183 28.2404 5.70666C31.3872 7.52149 33.8472 10.3241 35.2387 13.6797C36.6301 17.0352 36.8754 20.7562 35.9363 24.2654C34.9972 27.7746 32.9263 30.8758 30.0449 33.0879C27.1634 35.3 23.6325 36.4994 19.9999 36.5Z"
                fill="black"
              />
            </svg>
          </a>
        </div>
      </div>
      <nav class="header__nav">
        <ul class="header__list">
          <li class="header__item header__item--tablet">
            <a
              href="#about"
              @click.prevent="scrollToSection('about')"
              class="header__link header__link--words"
            >
              ABOUT US
            </a>
          </li>
          <li class="header__item header__item--tablet">
            <a
              class="header__link header__link--words"
              href="#shop"
              @click.prevent="scrollToSection('shop')"
            >
              SHOP
            </a>
          </li>
          <li class="header__item">
            <router-link to="/" class="header__link">
              <img
                src="@/assets/img/logo.amor.svg"
                alt="Logo"
                class="header__logo"
              />
            </router-link>
          </li>
          <li class="header__item header__item--tablet">
            <div class="dropdown" @click="toggleDropdown" ref="dropdown">
              <button
                class="dropdown-toggle header__link header__link--words header__link--services js-linkServices"
              >
                SERVICES
                <svg
                  class="header__link-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  viewBox="0 0 512 266.77"
                >
                  <path
                    fill-rule="nonzero"
                    d="M493.12 3.22c4.3-4.27 11.3-4.3 15.62-.04a10.85 10.85 0 0 1 .05 15.46L263.83 263.55c-4.3 4.28-11.3 4.3-15.63.05L3.21 18.64a10.85 10.85 0 0 1 .05-15.46c4.32-4.26 11.32-4.23 15.62.04L255.99 240.3 493.12 3.22z"
                  />
                </svg>
              </button>
              <ul class="header__dropdown js-dropdown" v-show="isOpen">
                <li class="header__dropdown-item">
                  <a
                    href="#wedding"
                    @click.prevent="scrollToSection('wedding')"
                    class="header__dropdown-link"
                  >
                    Wedding
                  </a>
                </li>
                <li class="header__dropdown-item">
                  <a
                    href="#events"
                    @click.prevent="scrollToSection('events')"
                    class="header__dropdown-link"
                  >
                    Events
                  </a>
                </li>
                <li class="header__dropdown-item">
                  <a
                    href="#home"
                    @click.prevent="scrollToSection('home')"
                    class="header__dropdown-link"
                  >
                    Home Services
                  </a>
                </li>
                <li class="header__dropdown-item">
                  <a
                    href="#yacht"
                    @click.prevent="scrollToSection('yacht')"
                    class="header__dropdown-link"
                  >
                    Yacht & Cruising
                  </a>
                </li>
                <li class="header__dropdown-item">
                  <a
                    href="#floral"
                    @click.prevent="scrollToSection('floral')"
                    class="header__dropdown-link"
                  >
                    Floral Subscription
                  </a>
                </li>
                <li class="header__dropdown-item">
                  <a
                    href="#bloom"
                    @click.prevent="scrollToSection('bloom')"
                    class="header__dropdown-link"
                  >
                    Floral Workshop
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="header__item header__item--tablet">
            <a
              class="header__link header__link--words"
              href="#contact"
              @click.prevent="scrollToSection('contact')"
            >
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
      <router-link to="/basket" class="header__button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path
            d="M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm36.84-.8-5.6,56A8,8,0,0,0,174.4,184a7.32,7.32,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.32,7.32,0,0,0,.81,0,8,8,0,0,0,7.16-8.76ZM239.93,89.06,224.86,202.12A16.06,16.06,0,0,1,209,216H47a16.06,16.06,0,0,1-15.86-13.88L16.07,89.06A8,8,0,0,1,24,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H232a8,8,0,0,1,7.93,9.06ZM89.63,80h76.74L128,36.15ZM222.86,96H33.14L47,200H209Z"
          ></path>
        </svg>
        <template v-if="cartTotalCount">
          <span>{{ cartTotalCount }}</span>
        </template>
      </router-link>
    </div>
  </header>
</template>

<script></script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #e0c0c3;
  position: relative;
  background-color: #f3eeeb;

  &__container {
    display: flex;

    @include media-max(768px) {
      align-items: center;
    }
  }

  &__nav {
    margin-bottom: 20px;
    width: 100%;
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
      padding-top: 52px;
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
}

.hamburger-box {
  display: none;
  @include media-max(768px) {
    display: block;
  }
}

.sidebar {
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  width: 90%;
  height: 100vh;
  z-index: 100;
  overflow: hidden;
  background-color: $primary-background-color;

  &.is-open {
    display: block;
  }

  &__nav {
    padding: 20px 20px;
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

  &__link-icon {
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
  &__social-media {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 200px;
    margin-left: 35px;
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useCartStore } from '@/store/cart';

const cartStore = useCartStore();

const cartTotalCount = computed(() => cartStore.totalCount);

const isSubmenuActive = ref(false);
const onOpenSubmenu = () => {
  isSubmenuActive.value = !isSubmenuActive.value;
};

const sidebarOpen = ref(false);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
function closeSidebar() {
  sidebarOpen.value = false;
}

const isOpen = ref(false);
const dropdown = ref(null);

function toggleDropdown(event) {
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
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
