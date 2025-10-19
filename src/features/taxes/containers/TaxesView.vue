<template>
  <section class="taxes" id="taxes">
    <div class="taxes__container container">
      <h2 class="taxes__title">Taxes & Fees</h2>
      <h3 class="taxes__subtitle">
        At Amor Flowers LLC, all prices listed on our website are exclusive of
        sales tax.
      </h3>
      <ul class="taxes__list">
        <li class="taxes__item">
          Applicable Florida Sales Tax will be automatically calculated and
          added at checkout based on the delivery or pickup address.
        </li>
        <li class="taxes__item">
          Orders shipped outside of Florida are not subject to Florida sales
          tax.
        </li>
        <li class="taxes__item">
          Business customers with a valid Florida Resale Certificate may contact
          us to place tax-exempt orders.
        </li>
      </ul>
      <h3 class="taxes__subtitle">
        We are a registered business with the Florida Department of Revenue and
        fully comply with state and local tax regulations.
      </h3>
    </div>
  </section>
</template>

<style lang="scss">
.taxes {
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
}
</style>
