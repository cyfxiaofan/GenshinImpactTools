import { createRouter, createWebHistory, Router } from 'vue-router';
import RouterWatching from "./routerWatching";

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '控制台',
      component: () => import('@/views/Dashboard/index.vue')
    },

    {
      path: '/GetLink',
      name: '提取链接',
      component: () => import('@/views/GetLink/index.vue')
    },

  ],
});

new RouterWatching(router);

export default router;