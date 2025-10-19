<template>
  <div class="dashboard">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<style lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main {
  margin-bottom: 50px;
  flex: 1 0 auto;
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
