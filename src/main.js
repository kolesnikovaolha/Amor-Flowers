import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './styles/styles.scss';
import App from './App.vue';
import router from './router';
import { persistPlugin } from '@/core/plugins/persistPlugin';
import Toast from 'vue-toastification';

import sprite from '@/assets/sprites/sprite-fd8b7d9a.svg?raw';
document.body.insertAdjacentHTML(
  'beforeend',
  sprite.replace('<svg', '<svg style="display:none"')
);

createApp(App)
  .use(createPinia().use(persistPlugin))
  .use(router)
  .use(Toast, {
    position: 'top-right',
    timeout: 4_000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: false,
    icon: false,
    rtl: false,
    maxToasts: 5,
    newestOnTop: true,
  })
  .mount('#app');
