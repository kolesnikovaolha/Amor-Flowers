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
    ],
  },
  // {
  //   path: "/about",
  //   name: "about",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
