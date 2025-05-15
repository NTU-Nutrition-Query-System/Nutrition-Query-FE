import { createRouter, createWebHistory } from "vue-router";
import { staticRoutes } from "./staticRoutes";

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRoutes],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, left: 0 };
  }
});

export default router;
