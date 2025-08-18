<template>
  <section class="about" id="about">
    <div class="about__container container">
      <div class="about__body">
        <div class="about__content">
          <h2 class="about__title">ABOUT US</h2>
          <h3 class="about__subtitle">
            Amor Flowers - Where Elegance Blooms into Art
          </h3>
          <p class="about__text">
            At Amor Flowers, we believe flowers are more than a gesture - they
            are emotion, memory, and beauty captured in bloom. Founded by a team
            with deep roots in the art world, our boutique brings a curated,
            artistic eye to floral design.
          </p>
          <p class="about__text">
            Every arrangement is thoughtfully composed like a painting, crafted
            to leave a lasting impression.
          </p>
          <p class="about__text">
            We specialize in high-end floral décor for weddings, private events,
            and bespoke gifting - offering everything from timeless classics to
            bold, modern compositions. Our extensive experience in event
            planning ensures seamless service and timely delivery, no matter the
            scale or vision.
          </p>
          <p class="about__text">
            With access to the finest seasonal blooms and the ability to
            customize every detail. Amor Flowers is your destination for flowers
            that speak louder than words.
          </p>
          <p class="about__important">
            <strong class="about__important-strong">
              Luxury is in the details. Let us tell your story in petals.
            </strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.about {
  &__body {
    display: flex;
    background-image: url('@/assets/img/about-pic.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center right;
  }
  &__content {
    position: relative;
    z-index: 200;
    max-width: 725px;
    position: relative;
    background-color: rgba(239, 226, 225, 0.7);
    padding: 20px 25px;
  }
  &__title {
    @include title;
    @include media-max(1200px) {
      font-size: 55px;
    }
    @include media-max(992px) {
      font-size: 45px;
    }
    @include media-max(768px) {
      margin-top: 30px;
    }
    @include media-max(576px) {
      font-size: 35px;
    }
  }
  &__subtitle {
    @include subtitle;
    margin-top: 30px;
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
      font-weight: 400;
      margin-top: 25px;
    }
    @include media-max(576px) {
      font-size: 15px;
      font-weight: 400;
      margin-top: 15px;
    }
  }
  &__important {
    @include important;
    max-width: 530px;
    margin-top: 40px;
    @include media-max(1200px) {
      font-size: 24px;
    }
    @include media-max(768px) {
      font-size: 20px;
      margin-top: 10px;
    }
  }
  &__important-strong {
    font-weight: 400;
  }
  &__figure {
    width: 910px;
    height: 1300px;
  }
  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
