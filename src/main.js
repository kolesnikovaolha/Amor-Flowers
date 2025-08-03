import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/styles.scss';
import App from './App.vue';
import router from './router';
import { persistPlugin } from '@/core/plugins/persistPlugin';
import Toast from 'vue-toastification';

createApp(App)
  .use(createPinia().use(persistPlugin))
  .use(router)
  .use(Toast)
  .mount('#app');
