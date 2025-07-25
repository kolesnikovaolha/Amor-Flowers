<template>
  <div class="home">
    <IntroView />
    <AboutUsView />
    <ShopView />
    <WeddingView />
    <EventsView />
    <HomeServicesView />
    <YachtView />
    <FloralView />
    <BloomView />
    <ContactView />
  </div>
</template>

<script setup>
import IntroView from '@/features/intro/containers/IntroView.vue';
import AboutUsView from '@/features/about-us/containers/AboutUsView.vue';
import ShopView from '@/features/shop/containers/ShopView.vue';
import WeddingView from '@/features/wedding/containers/WeddingView.vue';
import EventsView from '@/features/events/containers/EventsView.vue';
import HomeServicesView from '@/features/home-services/containers/HomeServicesView.vue';
import YachtView from '@/features/yacht/containers/YachtView.vue';
import FloralView from '@/features/floral/containers/FloralView.vue';
import BloomView from '@/features/bloom/containers/BloomView.vue';
import ContactView from '@/features/contact/containers/ContactView.vue';
</script>
