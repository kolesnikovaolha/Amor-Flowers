<template>
  <section class="refund">
    <div class="refund__container container">
      <h2 class="refund__title">Refund & Return Policy</h2>
      <p class="refund__text">
        At Amor Flowers LLC, we take pride in creating floral arrangements of
        the highest quality. Because flowers are perishable and custom-designed,
        our refund and return policies are specific to ensure fairness and
        clarity.
      </p>
      <h3 class="refund__subtitle">Order Cancellations</h3>
      <ul class="refund__list">
        <li class="refund__item">
          Orders may be canceled up to 24 hours before the scheduled delivery or
          pickup time for a full refund.
        </li>
        <li class="refund__item">
          Cancellations made within 24 hours of delivery may be subject to a 50%
          charge to cover product and labor costs.
        </li>
        <li class="refund__item">
          Same-day orders cannot be canceled once they are in preparation.
        </li>
      </ul>
      <h3 class="refund__subtitle">Refunds & Replacements</h3>
      <ul class="refund__list">
        <li class="refund__item">
          Due to the perishable nature of flowers, refunds are not available
          once the order has been delivered, except in the cases below:
        </li>
        <li class="refund__item">The arrangement arrives damaged.</li>
        <li class="refund__item">
          The arrangement is significantly different from what was ordered
          (excluding substitutions of equal or greater value, which may be
          necessary due to seasonal availability).
        </li>
        <li class="refund__item">
          If you are unsatisfied with your order, please contact us within 24
          hours of delivery at
          <a class="refund__link" href="mailto:amorflowersfl@gmail.com">
            amorflowersfl@gmail.com
          </a>
          with your order number and photos of the arrangement.
        </li>
        <li class="refund__item">
          Upon review, we may offer a replacement arrangement or a partial
          refund, depending on the situation.
        </li>
      </ul>
      <h3 class="refund__subtitle">Substitutions</h3>
      <p class="refund__text">
        Occasionally, certain flowers or products may be unavailable. In such
        cases, we reserve the right to make substitutions of equal or greater
        value while maintaining the overall style and theme of the arrangement.
      </p>
      <h3 class="refund__subtitle">Non-Returnable Items</h3>
      <ul class="refund__list">
        <li class="refund__item">
          Floral arrangements, plants, and custom event décor are non-returnable
          once delivered or installed.
        </li>
        <li class="refund__item">
          Gift items (such as vases or accessories) may only be returned if they
          are unused and in their original packaging within 7 days of purchase.
        </li>
      </ul>
      <h3 class="refund__subtitle">Contact</h3>
      <p class="refund__text">
        For any questions or refund requests, please contact us at:
      </p>
      <p class="refund__address">
        Amor Flowers LLC 9800 Grand Verde Way, Apt 412 Boca Raton, FL 33428
        United States
        <a class="refund__link" href="mailto:amorflowersfl@gmail.com">
          amorflowersfl@gmail.com
        </a>
      </p>
      <h3 class="refund__subtitle">Last updated:09/26/2025</h3>
    </div>
  </section>
</template>

<style lang="scss">
.refund {
  &__title {
    @include subtitle;
    margin-top: 40px;
    text-align: center;
  }
  &__subtitle {
    font-size: 22px;
    color: $primary-text-color;
    font-weight: 400;
    margin-top: 25px;
  }
  &__text {
    font-size: 18px;
    color: $secondary-text-color;
    font-weight: 300;
    margin-top: 20px;
  }
  &__item {
    font-size: 18px;
    color: $secondary-text-color;
    font-weight: 300;
    margin-top: 10px;
    line-height: 25px;
  }
  &__list {
    list-style-type: disc;
    padding-left: 20px;
    margin-top: 20px;
  }
  &__link {
    color: #5b2333;
    font-weight: 500;
  }
  &__address {
    font-size: 20px;
    color: $secondary-text-color;
    font-weight: 400;
    margin-top: 10px;
  }
}
</style>
