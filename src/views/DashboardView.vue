<template>
  <div class="dashboard">
    <AppHeader />
    <main class="main">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss">
.main {
  margin-bottom: 50px;
}
</style>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { onMounted } from 'vue';
import { useCatalogStore } from '@/store/catalog';

const catalogStore = useCatalogStore();

onMounted(() => {
  catalogStore.loadAllFlowers();
});
</script>
