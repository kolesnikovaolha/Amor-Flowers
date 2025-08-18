<template>
  <section class="intro" id="intro">
    <div class="container intro__container">
      <h1 class="intro__title">
        Whatever you dream of, we'll make it a reality
      </h1>
      <div class="postcard">
        <h2 class="postcard__title">with love</h2>
        <h2 class="postcard__title postcard__title--spaced">Amor Flowers</h2>
      </div>
      <router-link to="/store" class="intro__button">SHOP</router-link>
    </div>
  </section>
</template>

<style lang="scss">
.intro {
  padding: 120px 0 265px 0;
  background-image: url('@/assets/img/intro.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  @include media-max(768px) {
    padding: 20px 0 140px 0;
  }

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-family: 'Ephesis', sans-serif;
    color: $secondary-text-color;
    font-size: 96px;
    max-width: 970px;
    text-align: center;
    @include media-max(1200px) {
      font-size: 90px;
    }
    @include media-max(992px) {
      font-size: 70px;
    }
    @include media-max(768px) {
      font-size: 65px;
    }
    @include media-max(576px) {
      font-size: 56px;
    }
  }

  &__button {
    display: block;
    padding: 15px 70px;
    background: linear-gradient(135deg, #ffffff 30%, #c2a7aa 90%);
    opacity: 0.8;
    border: #5b2333 1px solid;
    font-size: 28px;
    font-weight: 300;
    color: $primary-text-color;
    border-radius: 3px;
    &:hover {
      color: $secondary-text-color;
      font-weight: 400;
      background: linear-gradient(135deg, #ffffff 30%, #ce8d93 90%);
      opacity: 0.8;
    }
    @include media-max(768px) {
      padding: 10px 60px;
    }
  }

  .postcard {
    margin-bottom: 245px;
    align-self: flex-end;
    &__title {
      font-size: 32px;
      color: $primary-text-color;
      font-weight: 400;
      @include media-max(1200px) {
        font-size: 30px;
      }
      @include media-max(992px) {
        font-size: 28px;
      }
      @include media-max(768px) {
        font-size: 25px;
      }
      @include media-max(576px) {
        font-size: 20px;
      }

      &--spaced {
        padding-left: 35px;
      }
    }
  }
  &__button {
    margin-right: 175px;
    align-self: flex-end;
    @include media-max(768px) {
      margin-right: 125px;
    }
    @include media-max(576px) {
      margin-right: 70px;
    }
  }
}
</style>
