<template>
  <section class="privacy">
    <div class="privacy__container container">
      <h2 class="privacy__title">Privacy Policy</h2>
      <p class="privacy__text">
        This Privacy Policy describes how amorflowers.com (the “Site” or “we”)
        collects, uses, and discloses your Personal Information when you visit
        or make a purchase from the Site.
      </p>
      <h3 class="privacy__subtitle">Contact</h3>
      <p class="privacy__text">
        After reviewing this policy, if you have additional questions, want more
        information about our privacy practices, or would like to make a
        complaint, please contact us by e-mail at
        <a class="privacy__link" href="mailto:amorflowersfl@gmail.com">
          amorflowersfl@gmail.com
        </a>
        or by mail using the details provided below:
      </p>
      <p class="privacy__address">
        Amor Flowers LLC 9800 Grand Verde Way, Apt 412 Boca Raton, FL 33428
        United States
      </p>
      <h3 class="privacy__subtitle">Collecting Personal Information</h3>
      <p class="privacy__text">
        When you visit the Site, we collect certain information about your
        device, your interaction with the Site, and information necessary to
        process your purchases. We may also collect additional information if
        you contact us for customer support. In this Privacy Policy, we refer to
        any information about an identifiable individual (including the
        information below) as “Personal Information.” See the list below for
        more information about what Personal Information we collect and why.
      </p>
      <ul class="privacy__list">
        <li class="privacy__item">Device Information</li>
        <li class="privacy__item">
          Purpose of collection: to load the Site accurately for you, and to
          perform analytics on Site usage to optimize our Site.
        </li>
        <li class="privacy__item">
          Source of collection: collected automatically when you access our Site
          using cookies, log files, web beacons, tags, or pixels.
        </li>
        <li class="privacy__item">
          Disclosure for a business purpose: shared with our processor Stripe.
        </li>
        <li class="privacy__item">
          Personal Information collected: version of web browser, IP address,
          time zone, cookie information, what sites or products you view, search
          terms, and how you interact with the Site.
        </li>
        <li class="privacy__item">Order Information</li>
        <li class="privacy__item">
          Purpose of collection: to provide products or services to you to
          fulfill our contract, to process your payment information, arrange for
          shipping, and provide you with invoices and/or order confirmations,
          communicate with you, screen our orders for potential risk or fraud,
          and when in line with the preferences you have shared with us, provide
          you with information or advertising relating to our products or
          services.
        </li>
        <li class="privacy__item">Source of collection: collected from you.</li>
        <li class="privacy__item">
          Disclosure for a business purpose: shared with our processor Stripe.
        </li>
        <li class="privacy__item">
          Personal Information collected: name, billing address, shipping
          address, payment information (including credit card numbers), email
          address, and phone number.
        </li>
      </ul>
      <h3 class="privacy__subtitle">Sharing Personal Information</h3>
      <p class="privacy__text">
        We share your Personal Information with service providers to help us
        provide our services and fulfill our contracts with you, as described
        above. For example:
      </p>
      <ul class="privacy__list">
        <li class="privacy__item">
          We use Stripe to power our online store and process payments. You can
          read more about how Stripe uses your Personal Information here:
          <a class="privacy__link" href="https://stripe.com/privacy">
            https://stripe.com/privacy
          </a>
        </li>
        <li class="privacy__item">
          We may share your Personal Information to comply with applicable laws
          and regulations, to respond to a subpoena, search warrant, or other
          lawful request for information we receive, or to otherwise protect our
          rights.
        </li>
      </ul>
      <h3 class="privacy__subtitle">Using Personal Information</h3>
      <p class="privacy__text">
        We use your Personal Information to provide our services to you, which
        includes: offering products for sale, processing payments, shipping and
        fulfillment of your order, and keeping you up to date on new products,
        services, and offers.
      </p>
      <h3 class="privacy__subtitle">SMS</h3>
      <p class="privacy__text">
        We value your privacy and the information you consent to share in
        relation to our SMS marketing service. We use this information to send
        you text notifications (for your order, including abandoned checkout
        reminders), text marketing offers, and transactional texts, including
        requests for reviews from us.
      </p>
      <p class="privacy__text">
        Our website uses cookies to keep track of items you put into your
        shopping cart, including when you have abandoned your checkout. This
        information is used to determine when to send cart reminder messages via
        SMS.
      </p>
      <h3 class="privacy__subtitle">Changes</h3>
      <p class="privacy__text">
        We may update this Privacy Policy from time to time in order to reflect,
        for example, changes to our practices or for other operational, legal,
        or regulatory reasons.
      </p>
      <h3 class="privacy__subtitle">Complaints</h3>
      <p class="privacy__text">
        As noted above, if you would like to make a complaint, please contact us
        by e-mail or by mail using the details provided under “Contact” above.
      </p>
      <h3 class="privacy__subtitle">Last updated:09/26/2025</h3>
    </div>
  </section>
</template>

<style lang="scss">
.privacy {
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
