import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'store',
        name: 'store',
        component: () => import('@/features/store/containers/StoreView.vue'),
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () =>
          import('@/features/product/containers/ProductView.vue'),
      },
      {
        path: 'basket',
        name: 'basket',
        component: () => import('@/features/basket/containers/BasketView.vue'),
      },
      {
        path: 'delivery',
        name: 'delivery',
        component: () =>
          import('@/features/delivery/containers/DeliveryView.vue'),
      },
    ],
  },
  {
    path: '/checkout/success',
    name: 'checkout-success',
    component: () =>
      import('@/features/checkout-success/containers/CheckoutSuccessView.vue'),
  },
  // {
  //   path: '/checkout/cancel',
  //   component: () => import('@/views/CheckoutCancel.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 50,
      };
    }
    return { top: 0 };
  },
});

export default router;
