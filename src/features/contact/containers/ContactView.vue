<template>
  <section class="contact" id="contact">
    <div class="contact__container container">
      <h2 class="contact__title">CONTACT FORM</h2>
      <div class="contact__body">
        <form class="contact__form">
          <div class="contact__form-group">
            <label class="contact__form-label" for="name">Name</label>
            <input
              id="name"
              type="text"
              class="contact__form-input"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="contact__form-group">
            <label class="contact__form-label" for="phone">Phone</label>
            <input
              id="phone"
              type="phone"
              class="contact__form-input"
              placeholder="Enter your phone"
              required
            />
          </div>
          <div class="contact__form-group">
            <label class="contact__form-label" for="email">E-mail</label>
            <input
              id="email"
              type="email"
              class="contact__form-input"
              placeholder="Enter your e-mail"
              required
            />
          </div>
          <div class="contact__form-group">
            <label class="contact__form-label" for="Comment">Comment</label>
            <textarea
              id="Comment"
              class="contact__form-textarea"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button type="submit" class="contact__form-button">SEND</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.contact {
  background-image: url('@/assets/img/flower-form.png');
  background-repeat: no-repeat;
  background-size: auto;
  background-position: 100% 0;
  &__title {
    font-size: 48px;
    color: $primary-text-color;
    font-weight: 300;
    text-align: center;
    margin-top: 120px;
    @include media-max(1200px) {
      font-size: 55px;
    }
    @include media-max(992px) {
      font-size: 40px;
      margin-top: 70px;
    }
    @include media-max(576px) {
      font-size: 35px;
    }
  }
  &__text {
    font-size: 24px;
    color: $primary-text-color;
    font-weight: 300;
    margin-bottom: 20px;
    line-height: 33px;
  }
  &__form-input {
    font-size: 20px;
    color: #787272;
    font-weight: 300;
    padding: 16px 16px;
    background-color: #fff;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 25px;
    width: 100%;
    @include media-max(1200px) {
      font-size: 18px;
    }
    @include media-max(992px) {
      font-size: 16px;
      line-height: 30px;
    }
    @include media-max(576px) {
      font-size: 15px;
      padding: 12px 20px;
    }
  }
  &__form-label {
    margin-top: 10px;
    display: flex;
    font-size: 20px;
    font-weight: 300;
    color: $primary-text-color;
    @include media-max(1200px) {
      font-size: 18px;
    }
    @include media-max(992px) {
      font-size: 16px;
      line-height: 30px;
    }
    @include media-max(576px) {
      font-size: 15px;
    }
  }
  &__form {
    max-width: 875px;
    width: 100%;
    margin-top: 50px;
  }

  &__body {
    display: flex;
    justify-content: center;
  }
  &__form-textarea {
    max-height: 255px;
    width: 100%;
    background-color: #fff;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    font-size: 20px;
    color: #787272;
    font-weight: 300;
    margin-bottom: 65px;
    padding: 16px 16px;
    resize: none;
    @include media-max(576px) {
      font-size: 15px;
    }
  }

  &__form-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5b2333;
    color: $button-text-color;
    font-size: 24px;
    font-weight: 500;
    padding: 16px 33px;
    width: 235px;
    margin: 0 auto;
    margin-bottom: 100px;

    &:hover {
      background-color: darken(#5b2333, 10%);
    }
  }
}
</style>
