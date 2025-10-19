import { createRouter, createWebHashHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import HomeView from '../views/HomeView.vue';
import StoreView from '../features/store/containers/StoreView.vue';
import ProductView from '../features/product/containers/ProductView.vue';
import BasketView from '../features/basket/containers/BasketView.vue';
import DeliveryView from '../features/delivery/containers/DeliveryView.vue';

const routes = [
  {
    path: '/',
    name: 'dasboard',
    component: DashboardView,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'store',
        name: 'store',
        component: StoreView,
      },
      {
        path: 'product/:id',
        name: 'product',
        component: ProductView,
      },
      {
        path: 'basket',
        name: 'basket',
        component: BasketView,
      },
      {
        path: 'delivery',
        name: 'delivery',
        component: DeliveryView,
      },
      {
        path: 'taxes',
        name: 'taxes',
        component: () => import('@/features/taxes/containers/TaxesView.vue'),
      },
      {
        path: 'privacy-policy',
        name: 'privacy-policy',
        component: () =>
          import('@/features/privacy-policy/containers/Privacy-PolicyView.vue'),
      },
      {
        path: 'terms-conditions',
        name: 'terms-conditions',
        component: () =>
          import('@/features/terms/containers/Terms-ConditionsView.vue'),
      },
      {
        path: 'refund',
        name: 'refund',
        component: () =>
          import('@/features/refund/containers/Refund-ReturnView.vue'),
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
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
