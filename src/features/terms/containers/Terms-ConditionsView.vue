<template>
  <section class="terms">
    <div class="terms__container container">
      <h2 class="terms__title">Terms & Conditions</h2>
      <p class="terms__text">
        Welcome to
        <a class="terms__link" href="amorflowers.com">amorflowers.com</a>
        (“Site”, “we”, “us”, “our”). These Terms & Conditions (“Terms”) govern
        your use of our website and services. By accessing or using our Site,
        you agree to be bound by these Terms. Please read them carefully before
        using our services.
      </p>
      <h3 class="terms__subtitle">1.General Information</h3>
      <p class="terms__text">
        This website is owned and operated by Amor Flowers LLC, located at:
      </p>
      <p class="terms__address">
        9800 Grand Verde Way, Apt 412 Boca Raton, FL 33428 United States
      </p>
      <h3 class="terms__subtitle">
        If you have any questions regarding these Terms, please contact us at:
        <a class="terms__link" href="mailto:amorflowersfl@gmail.com">
          amorflowersfl@gmail.com
        </a>
      </h3>
      <h3 class="terms__subtitle">2.Eligibility</h3>
      <p class="terms__text">
        By using this Site, you represent that you are at least 18 years of age
        or accessing the Site under the supervision of a parent or legal
        guardian.
      </p>
      <h3 class="terms__subtitle">3. Products & Services</h3>
      <ul class="terms__list">
        <li class="terms__item">
          We specialize in floral arrangements, event décor, and related
          products.
        </li>
        <li class="terms__item">
          All products are subject to availability, and we reserve the right to
          substitute flowers or materials of equal or greater value if the
          original selection is unavailable.
        </li>
        <li class="terms__item">
          Product images on the Site are for illustrative purposes only; actual
          arrangements may vary.
        </li>
      </ul>
      <h3 class="terms__subtitle">4.Pricing & Payments</h3>
      <ul class="terms__list">
        <li class="terms__item">
          All prices are listed in U.S. Dollars (USD).
        </li>
        <li class="terms__item">
          Prices do not include applicable sales tax. Florida Sales Tax will be
          added at checkout based on the delivery or pickup address.
        </li>
        <li class="terms__item">
          Payments are processed securely through Stripe. By placing an order,
          you agree to Stripe’s terms of service and privacy policy
          <a class="terms__link" href="https://stripe.com/privacy">
            https://stripe.com/privacy
          </a>
        </li>
      </ul>
      <h3 class="terms__subtitle">5.Delivery & Shipping</h3>
      <ul class="terms__list">
        <li class="terms__item">
          We offer delivery within our service area (Palm Beach County and
          surrounding areas). Delivery fees will be calculated at checkout.
        </li>
        <li class="terms__item">
          It is your responsibility to provide accurate delivery information. We
          are not liable for delays or failed deliveries due to incorrect or
          incomplete addresses.
        </li>
        <li class="terms__item">
          Same-day delivery may be available for orders placed before the
          cut-off time specified on the Site.
        </li>
      </ul>
      <h3 class="terms__subtitle">6. Cancellations & Refunds</h3>
      <ul class="terms__list">
        <li class="terms__item">
          Orders may be canceled up to 24 hours before the scheduled delivery
          for a full refund.
        </li>
        <li class="terms__item">
          For cancellations within 24 hours of delivery, we may charge up to 50%
          of the order total to cover costs.
        </li>
        <li class="terms__item">
          Due to the perishable nature of flowers, refunds are not available
          after delivery unless the product arrives damaged or not as described.
        </li>
        <li class="terms__item">
          To request a cancellation or refund, please contact us at
          <a class="terms__link" href="amorflowers.com">amorflowers.com</a>
          with your order details.
        </li>
      </ul>
      <h3 class="terms__subtitle">7.Intellectual Property</h3>
      <p class="terms__address">
        All content on this Site, including text, images, graphics, logos, and
        design, is the property of Amor Flowers LLC and is protected by
        copyright, trademark, and other intellectual property laws. You may not
        use, reproduce, or distribute any content without our prior written
        consent.
      </p>
      <h3 class="terms__subtitle">8.Limitation of Liability</h3>
      <p class="terms__address">
        To the maximum extent permitted by law, Amor Flowers LLC shall not be
        held liable for any damages arising from the use of our Site or
        products, including but not limited to indirect, incidental, punitive,
        or consequential damages.
      </p>
      <h3 class="terms__subtitle">9.Privacy Policy</h3>
      <p class="terms__address">
        Your use of the Site is also governed by our Privacy Policy, which
        outlines how we collect, use, and protect your personal information.
      </p>
      <h3 class="terms__subtitle">10.Changes to Terms</h3>
      <p class="terms__address">
        We reserve the right to update or modify these Terms at any time.
        Changes will be posted on this page with the “Last updated” date.
        Continued use of the Site after changes constitutes acceptance of the
        revised Terms.
      </p>
      <h3 class="terms__subtitle">Last updated:09/26/2025</h3>
    </div>
  </section>
</template>

<style lang="scss">
.terms {
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
